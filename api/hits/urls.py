from django.urls import path

from hits.views import hit_list_view, hit_detail_view

urlpatterns = [
    path('hits/', hit_list_view),
    path('hits/<int:pk>', hit_detail_view),
]
