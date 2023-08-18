from django.db import models
from django.contrib.auth.models import AbstractBaseUser,BaseUserManager
# Create your models here.

class UserManager(BaseUserManager):
    def create_user(self,firstname,lastname,email,password=None,staff=False,admin=False,active=True):
        if not email:
            raise ValueError("User must have an email address!")
        if not firstname:
            raise ValueError("User must have an firstname!")
        if not lastname:
            raise ValueError("User must have an lastname!")
        if not password:
            raise ValueError("User must have an password!")
        
        user_obj = self.model(
            email = self.normalize_email(email)
        )
        user_obj.set_password(password)
        user_obj.active = active
        user_obj.staff = staff
        user_obj.admin = admin
        user_obj.firstname = firstname
        user_obj.lastname = lastname
        user_obj.save(using=self._db)
        return user_obj
    
    def create_staffuser(self,firstname,lastname,email,password=None):
        staff_user = self.create_user(firstname=firstname,lastname=lastname,email=email,password=password,staff=True)
        return staff_user
    
    def create_superuser(self,firstname,lastname,email,password=None):
        super_user = self.create_user(firstname=firstname,lastname=lastname,email=email,password=password,staff=True,admin=True)
        return super_user
    

class User(AbstractBaseUser):
    email = models.EmailField(unique=True,null=False,max_length=100)
    firstname = models.CharField(null=False,max_length=250)
    lastname = models.CharField(null=False,max_length=250)
    admin = models.BooleanField(default=False)
    staff = models.BooleanField(default=False)
    active = models.BooleanField(default=True)
    description = models.TextField(null = True,max_length=1000)
    profile_img = models.ImageField(upload_to='LoginSystem/media/profile_img',default='LoginSystem/media/default.png')
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['firstname','lastname']
    
    objects = UserManager()
    
    def get_full_name(self):
        return self.firstname + " " + self.lastname 
    
    def get_email(self):
        return self.email
    
    def __str__(self):
        return self.firstname + " " + self.lastname + " " + self.email
    
    def has_perm(self,perm,obj=None):
        return True

    def has_module_perms(self,app_label):
        return True
    
    @property
    def is_active(self):
        return self.active
    
    @property
    def is_admin(self):
        return self.admin
    
    @property
    def is_staff(self):
        return self.staff