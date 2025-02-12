from django.db import models

# Create your models here.
class signup(models.Model):
    role=[
        ('admin','admin'),
        ('volunteer','volunteer'),
        ('user','user')
    ]
    user_id=models.AutoField(primary_key=True)
    user_name=models.CharField(max_length=100)
    user_email=models.EmailField(unique=True)
    user_username=models.CharField(max_length=100,unique=True)
    user_password=models.CharField(max_length=100)
    role=models.CharField(max_length=100,choices=role,default="user")
    def __str__(self):
        return self.user_name




class state(models.Model):
    state=models.CharField(max_length=100,unique=True)
    def __str__(self):
        return self.state

class district(models.Model):
    state = models.ForeignKey(state, on_delete=models.DO_NOTHING)
    district = models.CharField(max_length=100)
    def __str__(self):
        return self.district
    
class taluka(models.Model):
    state = models.ForeignKey(state, on_delete=models.DO_NOTHING)
    district = models.ForeignKey(district, on_delete=models.DO_NOTHING)
    taluka = models.CharField(max_length=100)
    def __str__(self):
        return self.taluka
    

# uttarpradesh added remove it first


class school(models.Model):
    state = models.ForeignKey(state, on_delete=models.DO_NOTHING)
    district = models.ForeignKey(district, on_delete=models.DO_NOTHING)
    taluka = models.ForeignKey(taluka, on_delete=models.DO_NOTHING)
    schoolName = models.CharField(max_length=100)
    schoolType = models.CharField(max_length=100)
    schoolMedium = models.CharField(max_length=100)

    def __str__(self):
        return self.schoolName




class Studentdata(models.Model):
    studentName=models.CharField(max_length=100)
    gender=models.CharField(max_length=100)
    state = models.ForeignKey(state, on_delete=models.DO_NOTHING)
    district = models.ForeignKey(district, on_delete=models.DO_NOTHING)
    taluka = models.ForeignKey(taluka, on_delete=models.DO_NOTHING)
    City_type=models.CharField(max_length=100)
    School_name=models.CharField(max_length=100)
    School_medium=models.CharField(max_length=100)
    School_std=models.CharField(max_length=100)
    ParentOccupation=models.CharField(max_length=100)
    ParentMaritalStatus=models.CharField(max_length=100)
    Family_income=models.CharField(max_length=100)
    Cast=models.CharField(max_length=100)
    Disabled=models.CharField(max_length=100)

    def __str__(self):
        return self.studentName
    

class DropoutStudentdata(models.Model):
    REASON_CHOICES = [
        ('Academic Challenges', 'Academic Challenges'),
        ('Financial Issues', 'Financial Issues'),
        ('Family Issues', 'Family Issues'),
        ('Health Problems', 'Health Problems'),
        ('Lack of Interest', 'Lack of Interest'),
        ('Poor School Environment', 'Poor School Environment'),
        ('Employment', 'Employment'),
        ('Educational Opportunities', 'Educational Opportunities'),
        ('Transportation Issues', 'Transportation Issues'),
        ('Personal Issues', 'Personal Issues'),
        ('Relocation', 'Relocation'),
        ('Bullying', 'Bullying'),
        ('Inadequate Infrastructure', 'Inadequate Infrastructure'),
        ('Cultural or Religious Reasons', 'Cultural or Religious Reasons'),
        ('Language Barriers', 'Language Barriers'),
        ('Legal Issues', 'Legal Issues'),
        ('Substance Abuse', 'Substance Abuse'),
        ('Safety Concerns', 'Safety Concerns'),
        ('Academic Performance Pressure', 'Academic Performance Pressure'),
        ('Lack of Parental Support', 'Lack of Parental Support'),
        ('School Fees', 'School Fees'),
        ('None','None')
    ]
    studentName=models.CharField(max_length=100)
    gender=models.CharField(max_length=100)
    state = models.ForeignKey(state, on_delete=models.DO_NOTHING)
    district = models.ForeignKey(district, on_delete=models.DO_NOTHING)
    taluka = models.ForeignKey(taluka, on_delete=models.DO_NOTHING)
    City_type=models.CharField(max_length=100)
    School_name=models.CharField(max_length=100)
    School_medium=models.CharField(max_length=100)
    School_std=models.CharField(max_length=100)
    ParentOccupation=models.CharField(max_length=100)
    ParentMaritalStatus=models.CharField(max_length=100)
    Family_income=models.CharField(max_length=100)
    Cast=models.CharField(max_length=100)
    Disabled=models.CharField(max_length=100)
    reason=models.CharField(max_length=100,choices=REASON_CHOICES)

    def __str__(self):
        return self.studentName





