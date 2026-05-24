"""
Serializers DRF — validation des entrées et sérialisation des sorties.
Les règles de validation reprennent celles de l'ancien backend PHP.
"""

from decimal import Decimal

from rest_framework import serializers

from .models import (
    Contact,
    Donation,
    Member,
    News,
    NewsletterSubscriber,
    Partner,
    Volunteer,
)


class ContactSerializer(serializers.ModelSerializer):
    name = serializers.CharField(min_length=2, max_length=100, trim_whitespace=True)
    subject = serializers.CharField(min_length=3, max_length=200, trim_whitespace=True)
    message = serializers.CharField(min_length=10, trim_whitespace=True)

    class Meta:
        model = Contact
        fields = ['id', 'name', 'email', 'subject', 'message']
        read_only_fields = ['id']


class NewsletterSerializer(serializers.ModelSerializer):
    # Champ déclaré sans UniqueValidator auto, pour gérer nous-mêmes le 409
    email = serializers.EmailField(max_length=100, validators=[])

    class Meta:
        model = NewsletterSubscriber
        fields = ['id', 'email']
        read_only_fields = ['id']

    def validate_email(self, value):
        if NewsletterSubscriber.objects.filter(email__iexact=value).exists():
            # code 'conflict' -> traduit en HTTP 409 dans la vue
            raise serializers.ValidationError('Cet email est déjà inscrit à la newsletter', code='conflict')
        return value


class DonationSerializer(serializers.ModelSerializer):
    amount = serializers.DecimalField(max_digits=10, decimal_places=2, min_value=Decimal('1'))
    firstname = serializers.CharField(min_length=2, max_length=50, trim_whitespace=True)
    lastname = serializers.CharField(min_length=2, max_length=50, trim_whitespace=True)

    class Meta:
        model = Donation
        fields = [
            'id', 'amount', 'type', 'email', 'firstname', 'lastname',
            'address', 'city', 'postal_code', 'country', 'message',
        ]
        read_only_fields = ['id']


class PartnerSerializer(serializers.ModelSerializer):
    organization = serializers.CharField(min_length=2, max_length=100, trim_whitespace=True)

    class Meta:
        model = Partner
        fields = ['id', 'organization', 'email', 'phone', 'partnership_type', 'message']
        read_only_fields = ['id']


class VolunteerSerializer(serializers.ModelSerializer):
    name = serializers.CharField(min_length=2, max_length=100, trim_whitespace=True)

    class Meta:
        model = Volunteer
        fields = [
            'id', 'name', 'email', 'phone', 'expertise',
            'experience', 'availability', 'message',
        ]
        read_only_fields = ['id']


class MemberSerializer(serializers.ModelSerializer):
    name = serializers.CharField(min_length=2, max_length=100, trim_whitespace=True)
    phone = serializers.CharField(max_length=20, trim_whitespace=True)
    # Champ déclaré sans UniqueValidator auto, pour gérer nous-mêmes le 409
    email = serializers.EmailField(max_length=100, validators=[])

    class Meta:
        model = Member
        fields = [
            'id', 'name', 'email', 'phone',
            'address', 'city', 'postal_code', 'motivation',
        ]
        read_only_fields = ['id']

    def validate_email(self, value):
        if Member.objects.filter(email__iexact=value).exists():
            raise serializers.ValidationError('Cet email est déjà associé à un compte membre', code='conflict')
        return value


class NewsSerializer(serializers.ModelSerializer):
    # Date formatée "10 Feb 2026" comme l'ancien date('d M Y', ...)
    published_at = serializers.DateTimeField(format='%d %b %Y')

    class Meta:
        model = News
        fields = [
            'id', 'title', 'excerpt', 'content', 'category',
            'image', 'author', 'published_at', 'created_at',
        ]
