from django.contrib.auth.models import AbstractUser
from django.core.validators import RegexValidator
from django.db import models

class CustomUser(AbstractUser):
    # Add any additional fields you want to include in your user model
    mobile_regex = RegexValidator(
        regex=r'^\+?1?\d{9,13}$',
        message="Mobile number must be entered in the format: '+999999999'. Up to 10 digits allowed."
    )
    mobile_number = models.CharField(validators=[mobile_regex], max_length=17, blank=True)
