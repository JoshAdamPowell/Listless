from django.db import models

# Create your models here.

from django.contrib.auth.models import User


class Patient(models.Model):
    hosp_number = models.CharField(max_length=20)
    surname = models.CharField(max_length=50)
    medical_history = models.TextField()
    version_number = models.IntegerField(default=1)


class PatientProblems(models.Model):
    patient = models.ForeignKey(Patient, on_delete=models.PROTECT)
    problem = models.CharField(max_length=255)
    version_number = models.IntegerField(default=1)



class JobStatus(models.Model):
    job_status_description = models.CharField(max_length=255)


class Job(models.Model):
    patient = models.ForeignKey(Patient, on_delete=models.PROTECT)
    job = models.CharField(max_length=255)
    job_status = models.ForeignKey(JobStatus, on_delete=models.PROTECT)
    version_number = models.IntegerField(default=1)
