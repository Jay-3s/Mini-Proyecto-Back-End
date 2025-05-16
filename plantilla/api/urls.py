from django.urls import path
from .views import *
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('productos/', productosListCreateView.as_view(), name='productos-list-create'),
    path('productos/<int:pk>/', productosDetailView.as_view(), name='productos-detail'),
    path('inventario/', inventarioListCreateView.as_view(), name='inventario-list-create'),
    path('inventario/<int:pk>/', inventarioDetailView.as_view(), name='inventario-detail'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)