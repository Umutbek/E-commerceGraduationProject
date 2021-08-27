from django.contrib import admin

# Register your models here.
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin

from django.utils.translation import gettext as _

from user import models


class UserAdmin(BaseUserAdmin):

    ordering = ['id']
    list_display = ( 'login', 'phone')

    fieldsets = (
        (None, {'fields': ('login', 'password')}),
        (_('Personal info'), {'fields': ('username', 'description')}),
        (_('Permissions'), {'fields': ('is_active', 'is_staff', 'is_superuser')}),

        (_('Important dates'), {'fields': ('last_login', )})

    )
    add_fieldsets = (
        (None, {
            'classes': ('wide', ),
            'fields': ('login', 'password1', 'password2')
        }),
    )

admin.site.register(models.User, UserAdmin)
admin.site.register(models.RegularAccount)
admin.site.register(models.Store)







