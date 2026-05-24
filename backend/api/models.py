"""
Modèles de données TESSIPI Foundation.
Portage du schéma MySQL d'origine (database/schema.sql) vers l'ORM Django.
Les noms de tables d'origine sont conservés via Meta.db_table.
"""

from django.db import models


class Contact(models.Model):
    class Status(models.TextChoices):
        NEW = 'new', 'Nouveau'
        READ = 'read', 'Lu'
        REPLIED = 'replied', 'Répondu'
        ARCHIVED = 'archived', 'Archivé'

    name = models.CharField(max_length=100)
    email = models.EmailField(max_length=100)
    subject = models.CharField(max_length=200)
    message = models.TextField()
    status = models.CharField(max_length=10, choices=Status.choices, default=Status.NEW)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'contacts'
        ordering = ['-created_at']

    def __str__(self):
        return f'{self.name} — {self.subject}'


class NewsletterSubscriber(models.Model):
    class Status(models.TextChoices):
        ACTIVE = 'active', 'Actif'
        UNSUBSCRIBED = 'unsubscribed', 'Désinscrit'
        BOUNCED = 'bounced', 'Rejeté'

    email = models.EmailField(max_length=100, unique=True)
    status = models.CharField(max_length=12, choices=Status.choices, default=Status.ACTIVE)
    subscribed_at = models.DateTimeField(auto_now_add=True)
    unsubscribed_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        db_table = 'newsletter_subscribers'
        ordering = ['-subscribed_at']

    def __str__(self):
        return self.email


class Donation(models.Model):
    class Type(models.TextChoices):
        ONCE = 'once', 'Une fois'
        MONTHLY = 'monthly', 'Mensuel'

    class Status(models.TextChoices):
        PENDING = 'pending', 'En attente'
        COMPLETED = 'completed', 'Complété'
        FAILED = 'failed', 'Échoué'
        CANCELLED = 'cancelled', 'Annulé'
        REFUNDED = 'refunded', 'Remboursé'

    amount = models.DecimalField(max_digits=10, decimal_places=2)
    type = models.CharField(max_length=10, choices=Type.choices)
    email = models.EmailField(max_length=100)
    firstname = models.CharField(max_length=50)
    lastname = models.CharField(max_length=50)
    address = models.CharField(max_length=200, null=True, blank=True)
    city = models.CharField(max_length=100, null=True, blank=True)
    postal_code = models.CharField(max_length=20, null=True, blank=True)
    country = models.CharField(max_length=2, default='FR')
    message = models.TextField(null=True, blank=True)
    status = models.CharField(max_length=10, choices=Status.choices, default=Status.PENDING)
    payment_method = models.CharField(max_length=50, null=True, blank=True)
    payment_id = models.CharField(max_length=100, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'donations'
        ordering = ['-created_at']

    def __str__(self):
        return f'{self.amount}€ ({self.get_type_display()}) — {self.email}'


class Partner(models.Model):
    class PartnershipType(models.TextChoices):
        FINANCIER = 'financier', 'Financier'
        TECHNIQUE = 'technique', 'Technique'
        MEDIA = 'media', 'Média'
        AUTRE = 'autre', 'Autre'

    class Status(models.TextChoices):
        PENDING = 'pending', 'En attente'
        APPROVED = 'approved', 'Approuvé'
        REJECTED = 'rejected', 'Rejeté'
        ACTIVE = 'active', 'Actif'
        ENDED = 'ended', 'Terminé'

    organization = models.CharField(max_length=100)
    email = models.EmailField(max_length=100)
    phone = models.CharField(max_length=20, null=True, blank=True)
    partnership_type = models.CharField(max_length=10, choices=PartnershipType.choices)
    message = models.TextField(null=True, blank=True)
    status = models.CharField(max_length=10, choices=Status.choices, default=Status.PENDING)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'partners'
        ordering = ['-created_at']

    def __str__(self):
        return self.organization


class Volunteer(models.Model):
    class Expertise(models.TextChoices):
        SANTE = 'sante', 'Santé'
        EDUCATION = 'education', 'Éducation'
        ADMIN = 'admin', 'Administration'
        COMMUNICATION = 'communication', 'Communication'
        AUTRE = 'autre', 'Autre'

    class Status(models.TextChoices):
        PENDING = 'pending', 'En attente'
        APPROVED = 'approved', 'Approuvé'
        REJECTED = 'rejected', 'Rejeté'
        ACTIVE = 'active', 'Actif'
        INACTIVE = 'inactive', 'Inactif'

    name = models.CharField(max_length=100)
    email = models.EmailField(max_length=100)
    phone = models.CharField(max_length=20, null=True, blank=True)
    expertise = models.CharField(max_length=15, choices=Expertise.choices)
    experience = models.TextField(null=True, blank=True)
    availability = models.TextField(null=True, blank=True)
    message = models.TextField(null=True, blank=True)
    status = models.CharField(max_length=10, choices=Status.choices, default=Status.PENDING)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'volunteers'
        ordering = ['-created_at']

    def __str__(self):
        return f'{self.name} ({self.get_expertise_display()})'


class Member(models.Model):
    class Status(models.TextChoices):
        PENDING = 'pending', 'En attente'
        APPROVED = 'approved', 'Approuvé'
        REJECTED = 'rejected', 'Rejeté'
        ACTIVE = 'active', 'Actif'
        SUSPENDED = 'suspended', 'Suspendu'

    class MembershipType(models.TextChoices):
        INDIVIDUAL = 'individual', 'Individuel'
        FAMILY = 'family', 'Famille'
        STUDENT = 'student', 'Étudiant'
        SENIOR = 'senior', 'Senior'

    name = models.CharField(max_length=100)
    email = models.EmailField(max_length=100, unique=True)
    phone = models.CharField(max_length=20)
    address = models.CharField(max_length=200, null=True, blank=True)
    city = models.CharField(max_length=100, null=True, blank=True)
    postal_code = models.CharField(max_length=20, null=True, blank=True)
    motivation = models.TextField(null=True, blank=True)
    status = models.CharField(max_length=10, choices=Status.choices, default=Status.PENDING)
    membership_type = models.CharField(
        max_length=12, choices=MembershipType.choices, default=MembershipType.INDIVIDUAL
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'members'
        ordering = ['-created_at']

    def __str__(self):
        return self.name


class News(models.Model):
    class Category(models.TextChoices):
        NOUVEAU_PROJET = 'nouveau_projet', 'Nouveau projet'
        EVENEMENT = 'evenement', 'Événement'
        TEMOIGNAGE = 'temoignage', 'Témoignage'
        RAPPORT = 'rapport', 'Rapport'
        AUTRE = 'autre', 'Autre'

    class Status(models.TextChoices):
        DRAFT = 'draft', 'Brouillon'
        PUBLISHED = 'published', 'Publié'
        ARCHIVED = 'archived', 'Archivé'

    title = models.CharField(max_length=200)
    excerpt = models.TextField(null=True, blank=True)
    content = models.TextField(null=True, blank=True)
    category = models.CharField(max_length=15, choices=Category.choices, default=Category.AUTRE)
    image = models.CharField(max_length=255, null=True, blank=True)
    author = models.CharField(max_length=100, null=True, blank=True)
    status = models.CharField(max_length=10, choices=Status.choices, default=Status.DRAFT)
    published_at = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'news'
        verbose_name_plural = 'news'
        ordering = ['-published_at']

    def __str__(self):
        return self.title


class Stat(models.Model):
    stat_key = models.CharField(max_length=50, unique=True)
    stat_value = models.IntegerField(default=0)
    stat_label = models.CharField(max_length=100)
    description = models.TextField(null=True, blank=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'stats'

    def __str__(self):
        return f'{self.stat_label}: {self.stat_value}'
