from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth import get_user_model
from .models import Decency

# Register your models here.
UserModel = get_user_model()
admin.site.register(UserModel, UserAdmin)
admin.site.register(Decency)
