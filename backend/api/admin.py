from django.contrib import admin
from .models import signup,state,district,taluka,school,Studentdata,DropoutStudentdata
admin.site.register(signup)

@admin.register(state)
class StateAdmin(admin.ModelAdmin):
    list_display = ('state',)  # Fields to display in the list view
    search_fields = ('state',)  # Fields to include in the search functionality

@admin.register(district)
class DistrictAdmin(admin.ModelAdmin):
    list_display = ('district', 'state')  # Fields to display in the list view
    search_fields = ('district', 'state__state')  # Fields to include in the search functionality
    list_filter = ('state',)


@admin.register(taluka)
class TalukaAdmin(admin.ModelAdmin):
    list_display = ('taluka', 'district', 'state')
    search_fields = ['state__state', 'district__district', 'taluka']
    list_filter = ['state', 'district']
    autocomplete_fields = ['state', 'district']




# Register the school model
@admin.register(school)
class SchoolAdmin(admin.ModelAdmin):
    list_display = ('id', 'state', 'district', 'taluka', 'schoolName', 'schoolType', 'schoolMedium')
    search_fields = ('schoolName', 'schoolType', 'schoolMedium')
    list_filter = ('state', 'district', 'taluka', 'schoolType', 'schoolMedium')

@admin.register(Studentdata)
class StudentdataAdmin(admin.ModelAdmin):
    list_display = (
        'studentName', 'gender', 'state', 'district', 'taluka',
        'City_type', 'School_name', 'School_medium', 'School_std',
        'ParentOccupation', 'ParentMaritalStatus', 'Family_income',
        'Cast', 'Disabled'
    )
    search_fields = (
        'studentName', 'gender', 'state__state', 'district__district',
        'taluka__taluka', 'City_type', 'School_name', 'School_medium',
        'School_std', 'ParentOccupation', 'ParentMaritalStatus',
        'Family_income', 'Cast', 'Disabled'
    )
    list_filter = ('state', 'district', 'taluka', 'gender', 'City_type')



@admin.register(DropoutStudentdata)
class DropoutStudentdataAdmin(admin.ModelAdmin):
    list_display = (
        'studentName', 'gender', 'state', 'district', 'taluka',
        'City_type', 'School_name', 'School_medium', 'School_std',
        'ParentOccupation', 'ParentMaritalStatus', 'Family_income',
        'Cast', 'Disabled','reason'
    )
    search_fields = (
        'studentName', 'gender', 'state__state', 'district__district',
        'taluka__taluka', 'City_type', 'School_name', 'School_medium',
        'School_std', 'ParentOccupation', 'ParentMaritalStatus',
        'Family_income', 'Cast', 'Disabled','reason'
    )
    list_filter = ('state', 'district', 'taluka', 'gender', 'City_type','reason')