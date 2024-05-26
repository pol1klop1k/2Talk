from django.contrib import admin

from .models import Category, Report
# Register your models here.
admin.site.register(Category)

@admin.register(Report)
class ReportAdmin(admin.ModelAdmin):
    list_display = ('id', 'text', 'user')
    actions = ['verdict']

    def verdict(self, request, queryset):
        q = queryset.select_related("user")
        for i in q:
            cur = i.user.user_decency
            if cur.current > 100:
                cur.current -= 100
                cur.save()
        q.delete()
        self.message_user(request, "Вынесен вердикт")