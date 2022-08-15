from django.db import models
from django.contrib.auth.base_user import AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin
from django.conf import settings

from hitmen.managers import UserManager


class User(AbstractBaseUser, PermissionsMixin):
    HITMAN_TYPES = (
        ('boss', "boss"),
        ('manager', "manager"),
        ('hitman', "hitman"),
    )

    email = models.EmailField(max_length=255, null=False, unique=True)
    first_name = models.CharField(max_length=255, null=False)
    last_name = models.CharField(max_length=255, null=False)
    hitman_type = models.CharField(choices=HITMAN_TYPES, default="hitman", max_length=50, null=False)
    manager = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='hitmen', on_delete=models.CASCADE,
                                default=1, null=True)
    is_active = models.BooleanField(default=True)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']

    def get_full_name(self):
        full_name = '%s %s' % (self.first_name, self.last_name)
        return full_name.strip()

    def get_short_name(self):
        return self.first_name

    def __str__(self):
        return self.email
