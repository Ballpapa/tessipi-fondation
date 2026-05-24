"""Routes de l'API — équivalent des anciens fichiers backend/api/*.php."""

from django.urls import path

from . import views

urlpatterns = [
    path('contact/', views.ContactView.as_view(), name='contact'),
    path('newsletter/', views.NewsletterView.as_view(), name='newsletter'),
    path('donation/', views.DonationView.as_view(), name='donation'),
    path('partners/', views.PartnerView.as_view(), name='partners'),
    path('volunteers/', views.VolunteerView.as_view(), name='volunteers'),
    path('members/', views.MemberView.as_view(), name='members'),
    path('news/', views.NewsListView.as_view(), name='news'),
]
