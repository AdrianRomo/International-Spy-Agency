from django.urls import path

from me.views import my_hits_view, my_profile, my_hitmen_view

urlpatterns = [
    path("me/profile", my_profile),
    path("me/hits", my_hits_view),
    path("me/hitmen", my_hitmen_view),
]
