python -m venv myenv
myenv\Scripts\activate
pip install django
pip install Pillow
pip install djangorestframework
pip install django-cors-headers


Create dir 'media' in apps 
in Events 'media/events_img'
in LoginSystem 'media/profile_img'

and paste 'default.png' in 'media' in 'LoginSystem'

then 

python manage.py makemigrations
python manage.py migrate
python manage.py runserver