from django.db import models
from django.conf import settings


class Hit(models.Model):
    HIT_STATES = (
        ('in_progress', "in_progress"),
        ('completed', "completed"),
        ('failed', "failed"),
    )

    hitman = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='hits', on_delete=models.CASCADE)
    state = models.CharField(choices=HIT_STATES, default='in_progress', max_length=50)
    target_name = models.CharField(max_length=100, null=False)
    description = models.CharField(max_length=200, null=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['created_at', 'updated_at']

    def __str__(self):
        return f'{self.target_name} - {self.description}'

    def __repr__(self):
        return f'<Hit {self.target_name} - {self.description}>'
