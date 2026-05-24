"""Données initiales (stats + actualités), reprises de database/schema.sql."""

from django.db import migrations
from django.utils import timezone


STATS = [
    ('beneficiaries', 147000, 'Bénéficiaires', 'Nombre total de personnes aidées'),
    ('countries', 12, 'Pays', "Nombre de pays d'intervention"),
    ('clinics', 89, 'Cliniques', 'Nombre de centres de santé'),
    ('water_points', 234, "Points d'eau", 'Forages et pompes installés'),
    ('schools', 45, 'Écoles', 'Établissements scolaires soutenus'),
    ('year_founded', 2008, 'Année de création', "Année de fondation de l'organisation"),
]

NEWS = [
    {
        'title': "Inauguration d'une nouvelle clinique en Afrique de l'Est",
        'excerpt': 'TESSIPI Foundation inaugure une nouvelle clinique pédiatrique qui permettra de soigner plus de 5 000 enfants par an.',
        'content': "Contenu complet de l'article sur l'inauguration...",
        'category': 'nouveau_projet',
        'image': 'images/news/clinic.jpg',
        'author': 'Équipe TESSIPI',
        'status': 'published',
        'published_at': '2026-02-10 10:00:00',
    },
    {
        'title': 'Formation internationale des agents de santé communautaire',
        'excerpt': 'Rejoignez notre programme de formation virtuel pour devenir agent de santé communautaire certifié TESSIPI.',
        'content': 'Contenu complet de l\'article sur la formation...',
        'category': 'evenement',
        'image': 'images/news/training.jpg',
        'author': 'Équipe TESSIPI',
        'status': 'published',
        'published_at': '2026-03-04 14:00:00',
    },
    {
        'title': 'Comment un dépistage a sauvé une année scolaire',
        'excerpt': "L'histoire de Amina, une jeune fille dont la vie a été transformée grâce à un simple dépistage de vue.",
        'content': 'Contenu complet du témoignage...',
        'category': 'temoignage',
        'image': 'images/news/testimony.jpg',
        'author': 'Équipe TESSIPI',
        'status': 'published',
        'published_at': '2026-01-22 09:00:00',
    },
]


def seed(apps, schema_editor):
    Stat = apps.get_model('api', 'Stat')
    News = apps.get_model('api', 'News')

    for key, value, label, description in STATS:
        Stat.objects.get_or_create(
            stat_key=key,
            defaults={'stat_value': value, 'stat_label': label, 'description': description},
        )

    for item in NEWS:
        published = timezone.make_aware(
            timezone.datetime.strptime(item['published_at'], '%Y-%m-%d %H:%M:%S')
        )
        News.objects.get_or_create(
            title=item['title'],
            defaults={**item, 'published_at': published},
        )


def unseed(apps, schema_editor):
    Stat = apps.get_model('api', 'Stat')
    News = apps.get_model('api', 'News')
    Stat.objects.filter(stat_key__in=[s[0] for s in STATS]).delete()
    News.objects.filter(title__in=[n['title'] for n in NEWS]).delete()


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.RunPython(seed, unseed),
    ]
