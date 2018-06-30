from django.db import models

# Create your models here.

from django.contrib.auth.models import User

class patient(models.Model):
	hosp_number = models.CharField(max_length=20)
	surname = models.CharField(max_length=50)

class patient_problems(models.Model):
	patient = models.ForeignKey(patient, on_delete=models.PROTECT)


class medical_history(models.Model):
	patient = models.ForeignKey(patient, on_delete=models.PROTECT)