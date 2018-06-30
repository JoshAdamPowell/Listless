from rest_framework import serializers
from .models import Patient

# class PatientSerializer(serializers.Serializer):
# 	HospitalNumber = serializers.CharField(required=True, allow_blank=False, max_length=20)
# 	LastName = serializers.CharField(required=True, allow_blank=False, max_length=50)
# 	DateOfBirth = serializers.DateField()
# 	MedicalHistory = serializers.CharField(required=True, allow_blank=False)
# 
# 	def create(self, validated_data):
# 		return Patient.objects.create(**validated_data)
# 		
# 	def update(self, instance, validated_data):
# 		instance.HospitalNumber = validated_data.get('HospitalNumber', instance.HospitalNumber)
# 		instance.LastName = validated_data.get('LastName', instance.LastName)
# 		instance.DateOfBirth = validated_data.get('DateOfBirth', instance.DateOfBirth)
# 		instance.MedicalHistory = validated_data.get('MedicalHistory', instance.MedicalHistory)
# 		instance.save()
# 		return instance

class PatientSerializer(serializers.ModelSerializer):
	Problems = serializers.StringRelatedField(many=True)
	class Meta:
		model = Patient
		exclude = ()