
Event Management System

The project is event management system that allows users to easily organize, view and participate in various types of events. Whether you're an organizer or an attendee, site provides tools that make planning and attending events easier.
Users can register in the system by creating their accounts. After logging in, they have access to the full functionality of the platform.


## Features

- Register and login
- Add new events
- Like / participate / save events
- Edit profile and own events
- Search for event



## 🛠 Built With
- TypeScript
- Angular
- Bootstrap
- Django
- Rest Framework
- JWT



## Installation

1. Clone the repo
```bash
git clone https://github.com/janmark101/EventManagementSystem.git
```

2. Create virtual environment

```bash
python -m venv <name-of-your-enviroment> 
```

* Activate the virtual environment:
Windows
```bash
.\name-of-your-enviroment\Scripts\activate
```
macOS/Linux
```bash
source name-of-your-enviroment/bin/activate
```

3. Next install all necesary libraries with this command :

```bash
pip install -r requirements.txt
```

4. Prepare the database : 
```bash
python manage.py migrate
```

5. Start the server :
```bash
python manage.py runserver
```
6. Start server for angular app : 
```bash
ng serve
```

Navigate to `http://localhost:4200/`.