from django.db import models

# Create your models here.

from django.contrib.auth.models import User


class Location(models.Model):
    Location = models.CharField(max_length=50)

class Patient(models.Model):
    HospitalNumber = models.CharField(max_length=20)
    LastName = models.CharField(max_length=50)
    DateOfBirth = models.DateField()
    MedicalHistory = models.TextField()
    


class PatientProblem(models.Model):
    Patient = models.ForeignKey(Patient, on_delete=models.PROTECT, related_name="Problems")
    Problem = models.CharField(max_length=255)
    Active = models.BooleanField(default=True)
    
    def __str__(self):
        return self.Problem

class JobStatus(models.Model):
    job_status_description = models.CharField(max_length=255)

class Job(models.Model):
    Patient = models.ForeignKey(Patient, on_delete=models.PROTECT)
    Job = models.CharField(max_length=255)
    JobStatus = models.ForeignKey(JobStatus, on_delete=models.PROTECT)
 