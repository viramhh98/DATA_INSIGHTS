from django.urls import path
from .views import SignupView,StateView,DistrictView,TalukaView,dashboard_view,SchoolCreateView,get_state_district_taluka_data,StudentdataView,DropoutStudentdataView
urlpatterns = [
    path('signup/', SignupView.as_view()),   
    path('state/', StateView.as_view()),  
    path('district/', DistrictView.as_view()),  
    path('taluka/', TalukaView.as_view()),  
    path('dashboard/', dashboard_view),
    path('addschool/', SchoolCreateView.as_view()),
    path('get_state_district_taluka_data/',get_state_district_taluka_data),
    path('addActiveStudent/',StudentdataView.as_view()),
    path('addInActiveStudent/',DropoutStudentdataView.as_view()),   
]
