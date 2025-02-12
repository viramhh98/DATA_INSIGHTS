from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import JsonResponse
from rest_framework import status
from .serializers import SignupsSerializers,StateSerializers,DistrictSerializers,TalukaSerializers,SchoolSerializer,StudentdataSerializer,DropoutStudentdataSerializer
from .models import signup,state,district,taluka,school,Studentdata,DropoutStudentdata


class SignupView(APIView):
   
    def post(self, request):
        data = request.data
        serializer = SignupsSerializers(data=data)

        if serializer.is_valid():
            serializer.save()
            return JsonResponse({"message": "User created successfully"}, status=status.HTTP_201_CREATED)
        
        return JsonResponse({"errors": serializer.errors, "message": "Failed to create User"}, status=status.HTTP_400_BAD_REQUEST, safe=False)


    def get(self, request):
        email_or_username=request.GET.get('email_or_username')
        if email_or_username:
            user = signup.objects.filter(user_email=email_or_username).first()
            
            if not user:
                user = signup.objects.filter(user_username=email_or_username).first()
            
            if not user:
                return JsonResponse({"error": "User not found"}, status=404)
            
            serializer = SignupsSerializers(user)
            return JsonResponse(serializer.data, safe=False, status=200)
        else:
            data=signup.objects.all()
            serializer=SignupsSerializers(data,many=True)
            return Response(serializer.data)

    
   
     
class StateView(APIView):
   
    def post(self, request):
        data = request.data
        serializer = StateSerializers(data=data)

        if serializer.is_valid():
            serializer.save()
            return JsonResponse({"message": "state created successfully"}, status=status.HTTP_201_CREATED)
        
        return JsonResponse({"errors": serializer.errors, "message": "Failed to create state"}, status=status.HTTP_400_BAD_REQUEST, safe=False)


    def get(self, request):
        ipstate=request.GET.get('ipstate')

        if ipstate:
            user = state.objects.filter(state=ipstate).first()
        
            if not user:
                return JsonResponse({"error": "state not found"}, status=404)
            
            serializer = StateSerializers(user)
            return JsonResponse(serializer.data, safe=False, status=200)
        else:
            data=state.objects.all()
            serializer=StateSerializers(data,many=True)
            return Response(serializer.data)
        



class DistrictView(APIView):
   
    def post(self, request):
        data = request.data
        serializer = DistrictSerializers(data=data)

        if serializer.is_valid():
            serializer.save()
            return JsonResponse({"message": "district created successfully"}, status=status.HTTP_201_CREATED)
        
        return JsonResponse({"errors": serializer.errors, "message": "Failed to create district"}, status=status.HTTP_400_BAD_REQUEST, safe=False)


    def get(self, request):
        state_name = request.GET.get('state') or None
        district_name = request.GET.get('district') or None

        if state_name and district_name:
            districts = district.objects.filter(state__state__icontains=state_name, district__icontains=district_name)
        elif state_name:
            districts = district.objects.filter(state__state__icontains=state_name)
        elif district_name:
            districts = district.objects.filter(district__icontains=district_name)
        else:
            districts = district.objects.all()

        if not districts.exists():
            return JsonResponse({"message": "No district found"}, status=status.HTTP_404_NOT_FOUND)

        # Serialize the filtered queryset
        serializer = DistrictSerializers(districts, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    


class TalukaView(APIView):
   
    def post(self, request):
        data = request.data
        serializer = TalukaSerializers(data=data)

        if serializer.is_valid():
            serializer.save()
            return JsonResponse({"message": "taluka created successfully"}, status=status.HTTP_201_CREATED)
        
        return JsonResponse({"errors": serializer.errors, "message": "Failed to create taluka"}, status=status.HTTP_400_BAD_REQUEST, safe=False)


    def get(self, request):
        state_name = request.GET.get('state') or None
        district_name = request.GET.get('district') or None
        taluka_name = request.GET.get('taluka') or None

        if state_name and district_name and taluka_name:
            talukas = taluka.objects.filter(state__state__icontains=state_name, district__district__icontains=district_name,taluka__icontains=taluka_name)
        elif state_name and district_name:
            talukas = taluka.objects.filter(state__state__icontains=state_name,district__district__icontains=district_name)
        elif taluka_name:
            talukas = taluka.objects.filter(taluka__icontains=taluka_name)
        else:
            talukas = taluka.objects.all()

        if not talukas.exists():
            return JsonResponse({"message": "No district found"}, status=status.HTTP_404_NOT_FOUND)

        # Serialize the filtered queryset
        serializer = TalukaSerializers(talukas, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    

def dashboard_view(request):
    total_states = state.objects.count()
    total_districts = district.objects.count()
    total_talukas = taluka.objects.count()
    total_female_students = Studentdata.objects.filter(gender='Female').count()
    total_male_students = Studentdata.objects.filter(gender='Male').count()
    total_other_students = Studentdata.objects.filter(gender='other').count()   
    total_active_students = Studentdata.objects.count()
    total_inactive_students = DropoutStudentdata.objects.count()
    total_students = total_active_students+total_inactive_students
    dropout_without_reason =DropoutStudentdata.objects.filter(reason='None').count()
    dropout_with_reason = DropoutStudentdata.objects.count()-dropout_without_reason
    total_schools = school.objects.count()

    context = {
        'total_states': total_states,
        'total_districts': total_districts,
        'total_talukas': total_talukas,
        'total_students': total_students,
        'total_female_students': total_female_students,
        'total_male_students': total_male_students,
        'total_other_students': total_other_students,
        'total_active_students': total_active_students,
        'total_inactive_students': total_inactive_students,
        'dropout_without_reason': dropout_without_reason,
        'dropout_with_reason': dropout_with_reason,
        'total_schools': total_schools,
    }

    return JsonResponse(context)




class SchoolCreateView(APIView):
    def post(self, request):
            serializer = SchoolSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        
        
    def get(self, request):
        state_id = request.GET.get('state') or None
        district_id = request.GET.get('district') or None
        taluka_id = request.GET.get('taluka') or None

        filters = {}
        if state_id:
            filters['state_id'] = state_id  # Filter by the 'state' ForeignKey using the ID
        if district_id:
            filters['district_id'] = district_id  # Filter by the 'district' ForeignKey using the ID
        if taluka_id:
            filters['taluka_id'] = taluka_id  # Filter by the 'taluka' ForeignKey using the ID

        school_data = school.objects.filter(**filters) 
        serializer = SchoolSerializer(school_data, many=True)
        return Response(serializer.data)



class StudentdataView(APIView):
    
    def post(self, request):
        serializer = StudentdataSerializer(data=request.data)
        
        if serializer.is_valid():
            serializer.save()
            return JsonResponse({"message": "Student data created successfully"}, status=status.HTTP_201_CREATED)
        
        return JsonResponse({"errors": serializer.errors, "message": "Failed to create student data"}, status=status.HTTP_400_BAD_REQUEST, safe=False)

    def get(self, request):
        studentName = request.GET.get('studentName')
        gender = request.GET.get('gender')
        state = request.GET.get('state')
        district = request.GET.get('district')
        taluka = request.GET.get('taluka')
        City_type = request.GET.get('City_type')
        School_name = request.GET.get('School_name')
        School_medium = request.GET.get('School_medium')
        School_std = request.GET.get('School_std')
        ParentOccupation = request.GET.get('ParentOccupation')
        ParentMaritalStatus = request.GET.get('ParentMaritalStatus')
        Family_income = request.GET.get('Family_income')
        Cast = request.GET.get('Cast')
        Disabled = request.GET.get('Disabled')

        filters = {}
        if studentName:
            filters['studentName__icontains'] = studentName
        if gender:
            filters['gender__icontains'] = gender
        if state:
            filters['state__state__icontains'] = state
        if district:
            filters['district__district__icontains'] = district
        if taluka:
            filters['taluka__taluka__icontains'] = taluka
        if City_type:
            filters['City_type__icontains'] = City_type
        if School_name:
            filters['School_name__icontains'] = School_name
        if School_medium:
            filters['School_medium__icontains'] = School_medium
        if School_std:
            filters['School_std__icontains'] = School_std
        if ParentOccupation:
            filters['ParentOccupation__icontains'] = ParentOccupation
        if ParentMaritalStatus:
            filters['ParentMaritalStatus__icontains'] = ParentMaritalStatus
        if Family_income:
            filters['Family_income__icontains'] = Family_income
        if Cast:
            filters['Cast__icontains'] = Cast
        if Disabled:
            filters['Disabled__icontains'] = Disabled

        students = Studentdata.objects.filter(**filters) if filters else Studentdata.objects.all()

        if not students.exists():
            return JsonResponse({"message": "No student data found"}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = StudentdataSerializer(students, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)





def get_state_district_taluka_data(request):
    total_states = state.objects.all()
    total_districts = district.objects.select_related('state').all()  # Fetch related state
    total_talukas = taluka.objects.select_related('state', 'district').all()  # Fetch related state and district

    # Serialize the data
    states_data = StateSerializers(total_states, many=True).data
    districts_data = DistrictSerializers(total_districts, many=True).data
    talukas_data = TalukaSerializers(total_talukas, many=True).data

    context = {
        'total_states': states_data,
        'total_districts': districts_data,
        'total_talukas': talukas_data,
    }
    return JsonResponse(context)



class DropoutStudentdataView(APIView):
    
    def post(self, request):
        serializer = DropoutStudentdataSerializer(data=request.data)
        
        if serializer.is_valid():
            serializer.save()
            return JsonResponse({"message": "Student data created successfully"}, status=status.HTTP_201_CREATED)
        
        return JsonResponse({"errors": serializer.errors, "message": "Failed to create student data"}, status=status.HTTP_400_BAD_REQUEST, safe=False)

    def get(self, request):
        studentName = request.GET.get('studentName')
        gender = request.GET.get('gender')
        state = request.GET.get('state')
        district = request.GET.get('district')
        taluka = request.GET.get('taluka')
        City_type = request.GET.get('City_type')
        School_name = request.GET.get('School_name')
        School_medium = request.GET.get('School_medium')
        School_std = request.GET.get('School_std')
        ParentOccupation = request.GET.get('ParentOccupation')
        ParentMaritalStatus = request.GET.get('ParentMaritalStatus')
        Family_income = request.GET.get('Family_income')
        Cast = request.GET.get('Cast')
        Disabled = request.GET.get('Disabled')
        reason=request.GET.get('reason')

        filters = {}
        if studentName:
            filters['studentName__icontains'] = studentName
        if gender:
            filters['gender__icontains'] = gender
        if state:
            filters['state__state__icontains'] = state
        if district:
            filters['district__district__icontains'] = district
        if taluka:
            filters['taluka__taluka__icontains'] = taluka
        if City_type:
            filters['City_type__icontains'] = City_type
        if School_name:
            filters['School_name__icontains'] = School_name
        if School_medium:
            filters['School_medium__icontains'] = School_medium
        if School_std:
            filters['School_std__icontains'] = School_std
        if ParentOccupation:
            filters['ParentOccupation__icontains'] = ParentOccupation
        if ParentMaritalStatus:
            filters['ParentMaritalStatus__icontains'] = ParentMaritalStatus
        if Family_income:
            filters['Family_income__icontains'] = Family_income
        if Cast:
            filters['Cast__icontains'] = Cast
        if Disabled:
            filters['Disabled__icontains'] = Disabled
        if reason:
            filters['reason__icontains'] = reason

        students = DropoutStudentdata.objects.filter(**filters) if filters else DropoutStudentdata.objects.all()

        # if not students.exists():
        #     return JsonResponse({"message": "No student data found"}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = DropoutStudentdataSerializer(students, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
