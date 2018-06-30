from django.db import models

# Create your models here.

from django.contrib.auth.models import User


class Patient(models.Model):
    hosp_number = models.CharField(max_length=20)
    surname = models.CharField(max_length=50)


class PatientProblems(models.Model):
    patient = models.ForeignKey(Patient, on_delete=models.PROTECT)


class MedicalHistory(models.Model):
    patient = models.ForeignKey(Patient, on_delete=models.PROTECT)
