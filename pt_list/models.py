from django.db import models
from datetime import date, timedelta, datetime

# Create your models here.

from django.contrib.auth.models import User


class Location(models.Model):
    Location = models.CharField(max_length=50)


class Patient(models.Model):
    HospitalNumber = models.CharField(max_length=20)
    FirstName = models.CharField(max_length=50)
    Gender = models.CharField(max_length=2)
    LastName = models.CharField(max_length=50)
    DateOfBirth = models.DateField()
    MedicalHistory = models.TextField()
    LocationWard = models.CharField(max_length=30)
    LocationBay = models.IntegerField()
    LocationBed = models.IntegerField()
    
    priority_choices = (
        (1, "High"),
        (2, "Standard"),
        (3, "Medically fit for discharge"),
    )
    PatientActive = models.BooleanField(default=True)

    PatientPriority = models.IntegerField(choices=priority_choices, default=2)

    def __str__(self):
        return str(self.LocationBay) + "." + str(self.LocationBed) + " " + self.LastName + " - " + self.HospitalNumber



class PatientProblem(models.Model):
    Patient = models.ForeignKey(Patient, on_delete=models.PROTECT, related_name="Problems")
    Problem = models.CharField(max_length=255)
    Active = models.BooleanField(default=True)

    def __str__(self):
        return str(self.Patient.LastName) + " " + str(self.Patient.DateOfBirth) + " - " + self.Problem


class JobStatus(models.Model):
    job_status_description = models.CharField(max_length=255)

    def __str__(self):
        return self.job_status_description


class Job(models.Model):
    Patient = models.ForeignKey(Patient, on_delete=models.PROTECT, related_name="Jobs")
    Job = models.CharField(max_length=255)
    JobStatus = models.ForeignKey(JobStatus, on_delete=models.PROTECT)

    def __str__(self):
        return str(self.Patient) + " - " + str(self.Job) + " - " + str(self.JobStatus)
