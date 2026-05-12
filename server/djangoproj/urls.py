"""djangoproj URL Configuration"""
from django.contrib import admin
from django.urls import path, re_path, include
from django.views.generic import TemplateView
from django.conf.urls.static import static
from django.conf import settings

# React app routes served by Django (build/index.html)
react_view = TemplateView.as_view(template_name="index.html")

urlpatterns = [
    path('admin/', admin.site.urls),
    path('djangoapp/', include('djangoapp.urls')),
    path('', TemplateView.as_view(template_name="Home.html")),
    path('about/', TemplateView.as_view(template_name="About.html")),
    path('contact/', TemplateView.as_view(template_name="Contact.html")),
    # React-rendered routes
    path('login', react_view),
    path('register', react_view),
    path('dealers', react_view),
    re_path(r'^dealer/\d+$', react_view),
    re_path(r'^postreview/\d+$', react_view),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
