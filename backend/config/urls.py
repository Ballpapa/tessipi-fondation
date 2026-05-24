"""
Configuration des URLs du projet TESSIPI Foundation.
- /admin/ : back-office Django
- /api/   : endpoints de l'API (cf. api/urls.py)
"""

from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
]
