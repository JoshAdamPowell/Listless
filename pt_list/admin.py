from django.contrib import admin

# Register your models here.

from .models import Patient, PatientProblem, Job, JobStatus

admin.site.register(Patient)
admin.site.register(PatientProblem)
admin.site.register(Job)
admin.site.register(JobStatus)