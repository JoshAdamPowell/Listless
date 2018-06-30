from django.contrib import admin

# Register your models here.

from .models import Patient, PatientProblem

admin.site.register(Patient)
admin.site.register(PatientProblem)