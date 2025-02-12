from rest_framework import serializers
from .models import signup,state,district,taluka,school,Studentdata,DropoutStudentdata

class SignupsSerializers(serializers.ModelSerializer):
    class Meta:
        model=signup
        fields=(
            'user_id',
            'user_name',
            'user_email',
            'user_username',
            'user_password',
            'role'
        )


class StateSerializers(serializers.ModelSerializer):
    class Meta:
        model = state
        fields = ('id', 'state')

class DistrictSerializers(serializers.ModelSerializer):
    state = StateSerializers()  # Nested serializer for related state

    class Meta:
        model = district
        fields = ('id', 'state', 'district')

class TalukaSerializers(serializers.ModelSerializer):
    state = StateSerializers()  # Nested serializer for related state
    district = DistrictSerializers()  # Nested serializer for related district

    class Meta:
        model = taluka
        fields = ('id', 'state', 'district', 'taluka')


class SchoolSerializer(serializers.ModelSerializer):

    class Meta:
        model = school
        fields = (
            'state',
            'district',
            'taluka',
            'schoolName',
            'schoolType',
            'schoolMedium'
        )



class StudentdataSerializer(serializers.ModelSerializer):
    state = serializers.PrimaryKeyRelatedField(queryset=state.objects.all())
    district = serializers.PrimaryKeyRelatedField(queryset=district.objects.all())
    taluka = serializers.PrimaryKeyRelatedField(queryset=taluka.objects.all())

    class Meta:
        model = Studentdata
        fields = [
            'studentName', 
            'gender', 
            'state', 
            'district', 
            'taluka', 
            'City_type', 
            'School_name', 
            'School_medium', 
            'School_std', 
            'ParentOccupation', 
            'ParentMaritalStatus', 
            'Family_income', 
            'Cast', 
            'Disabled'
        ]



class DropoutStudentdataSerializer(serializers.ModelSerializer):
    state = serializers.PrimaryKeyRelatedField(queryset=state.objects.all())
    district = serializers.PrimaryKeyRelatedField(queryset=district.objects.all())
    taluka = serializers.PrimaryKeyRelatedField(queryset=taluka.objects.all())

    class Meta:
        model = DropoutStudentdata
        fields = [
            'studentName', 
            'gender', 
            'state', 
            'district', 
            'taluka', 
            'City_type', 
            'School_name', 
            'School_medium', 
            'School_std', 
            'ParentOccupation', 
            'ParentMaritalStatus', 
            'Family_income', 
            'Cast', 
            'Disabled',
            'reason'
        ]
