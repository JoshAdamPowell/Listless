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
    def __str__(self):
        return self.LastName
    


class PatientProblem(models.Model):
    Patient = models.ForeignKey(Patient, on_delete=models.PROTECT, related_name="Problems")
    Problem = models.CharField(max_length=255)
    Active = models.BooleanField(default=True)
    
    def __str__(self):
        return self.Problem

class JobStatus(models.Model):
    job_status_description = models.CharField(max_length=255)
    def __str__(self):
        return self.job_status_description
    

class Job(models.Model):
    Patient = models.ForeignKey(Patient, on_delete=models.PROTECT, related_name="Jobs")
    Job = models.CharField(max_length=255)
    JobStatus = models.ForeignKey(JobStatus, on_delete=models.PROTECT)
    def __str__(self):
        return str(self.Patient)+" - "+str(self.Job)+" - "+str(self.JobStatus)
    
 