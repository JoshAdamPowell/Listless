from rest_framework import serializers
from .models import Patient, PatientProblem, Job


class PatientProblemSerializer(serializers.ModelSerializer):
    class Meta:
        model = PatientProblem
        exclude = ()


class JobSerializer(serializers.ModelSerializer):
    class Meta:
        model = Job
        exclude = ()


class PatientSerializer(serializers.ModelSerializer):
    Problems = PatientProblemSerializer(many=True, read_only=True)
    Jobs = JobSerializer(many=True, read_only=True)

    class Meta:
        model = Patient
        exclude = ()
