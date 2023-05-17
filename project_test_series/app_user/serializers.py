# serializers.py

from rest_framework import serializers
from app_user.models import CustomUser

import random
import string

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = CustomUser
        fields = ('email', 'password', 'first_name', 'mobile_number')

    def create(self, validated_data):
        # Split the first name and assign the first word as first_name
        name_parts = validated_data['first_name'].split()
        first_name = name_parts[0]
        last_name = ' '.join(name_parts[1:]) if len(name_parts) > 1 else ''

        # Generate a unique username
        username = self.generate_unique_username(first_name, last_name)

        user = CustomUser.objects.create_user(
            username=username,
            password=validated_data['password'],
            email=validated_data['email'],
            first_name=first_name,
            last_name=last_name,
            mobile_number=validated_data.get('mobile_number', '')
        )
        return user

    def generate_unique_username(self, first_name, last_name):
        # Convert first name and last name to lowercase
        first_name = first_name.lower()
        last_name = last_name.lower()

        # Remove spaces from first name and last name
        first_name = first_name.replace(' ', '')
        last_name = last_name.replace(' ', '')

        # Generate a random string of length 6
        random_string = ''.join(random.choices(string.ascii_lowercase, k=6))

        # Combine first name, last name, and random string to form the username
        username = first_name + last_name + random_string

        # Check if the username already exists in the database
        while CustomUser.objects.filter(username=username).exists():
            random_string = ''.join(random.choices(string.ascii_lowercase, k=6))
            username = first_name + last_name + random_string

        return username
