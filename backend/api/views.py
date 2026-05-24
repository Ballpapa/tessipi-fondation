"""
Vues de l'API TESSIPI Foundation.

Le format de réponse reproduit celui de l'ancien backend PHP afin de rester
compatible avec le frontend :
  - succès POST : {success: true, message: "...", id: N}
  - erreurs de validation : 400 {success: false, errors: ["...", ...]}
  - conflit (doublon) : 409 {success: false, message: "..."}
  - liste news : {success: true, data: [...], pagination: {...}}
"""

import math

from rest_framework import status
from rest_framework.exceptions import ValidationError
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import News
from .serializers import (
    ContactSerializer,
    DonationSerializer,
    MemberSerializer,
    NewsSerializer,
    NewsletterSerializer,
    PartnerSerializer,
    VolunteerSerializer,
)


def flatten_errors(errors):
    """Transforme le dict d'erreurs DRF en liste plate de messages (façon PHP)."""
    messages = []
    if isinstance(errors, dict):
        for value in errors.values():
            messages.extend(flatten_errors(value))
    elif isinstance(errors, list):
        for item in errors:
            messages.extend(flatten_errors(item))
    else:
        messages.append(str(errors))
    return messages


def is_conflict(exc):
    """Renvoie le message si l'erreur porte le code 'conflict' (doublon email), sinon None."""
    detail = exc.detail
    if isinstance(detail, dict):
        for value in detail.values():
            items = value if isinstance(value, list) else [value]
            for item in items:
                if getattr(item, 'code', None) == 'conflict':
                    return str(item)
    return None


class BaseSubmitView(APIView):
    """Vue générique pour les formulaires (POST -> création + message de succès)."""

    serializer_class = None
    success_message = 'Enregistré avec succès.'

    def build_success(self, instance, serializer):
        return {'success': True, 'message': self.success_message, 'id': instance.id}

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        try:
            serializer.is_valid(raise_exception=True)
        except ValidationError as exc:
            conflict_message = is_conflict(exc)
            if conflict_message:
                return Response(
                    {'success': False, 'message': conflict_message},
                    status=status.HTTP_409_CONFLICT,
                )
            return Response(
                {'success': False, 'errors': flatten_errors(exc.detail)},
                status=status.HTTP_400_BAD_REQUEST,
            )

        instance = serializer.save()
        return Response(self.build_success(instance, serializer), status=status.HTTP_201_CREATED)


class ContactView(BaseSubmitView):
    serializer_class = ContactSerializer
    success_message = (
        'Votre message a été envoyé avec succès. '
        'Nous vous répondrons dans les plus brefs délais.'
    )


class NewsletterView(BaseSubmitView):
    serializer_class = NewsletterSerializer
    success_message = 'Vous êtes maintenant inscrit à notre newsletter !'


class DonationView(BaseSubmitView):
    serializer_class = DonationSerializer

    def build_success(self, instance, serializer):
        # Ici s'intégrerait la passerelle de paiement (Stripe, PayPal, etc.)
        return {
            'success': True,
            'message': 'Don enregistré. Redirection vers la page de paiement...',
            'donation_id': instance.id,
            'amount': str(instance.amount),
            'type': instance.type,
        }


class PartnerView(BaseSubmitView):
    serializer_class = PartnerSerializer
    success_message = (
        'Votre demande de partenariat a été envoyée. '
        'Nous vous contacterons prochainement.'
    )


class VolunteerView(BaseSubmitView):
    serializer_class = VolunteerSerializer
    success_message = (
        'Votre inscription en tant que bénévole a été enregistrée. '
        'Nous vous contacterons prochainement.'
    )


class MemberView(BaseSubmitView):
    serializer_class = MemberSerializer
    success_message = (
        "Votre demande d'adhésion a été enregistrée. "
        'Bienvenue dans la communauté TESSIPI !'
    )


class NewsListView(APIView):
    """GET : liste paginée des actualités publiées, avec filtre par catégorie."""

    def get(self, request):
        try:
            page = max(int(request.query_params.get('page', 1)), 1)
        except (TypeError, ValueError):
            page = 1
        try:
            limit = max(int(request.query_params.get('limit', 10)), 1)
        except (TypeError, ValueError):
            limit = 10

        category = request.query_params.get('category')

        queryset = News.objects.filter(status=News.Status.PUBLISHED)
        if category:
            queryset = queryset.filter(category=category)

        total = queryset.count()
        offset = (page - 1) * limit
        articles = queryset[offset:offset + limit]

        return Response({
            'success': True,
            'data': NewsSerializer(articles, many=True).data,
            'pagination': {
                'page': page,
                'limit': limit,
                'total': total,
                'pages': math.ceil(total / limit) if limit else 0,
            },
        })
