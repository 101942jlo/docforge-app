from mongoengine import *
from dotenv import load_dotenv
from datetime import datetime
import os

load_dotenv()

client = connect(host=os.getenv("MONGODB_URI"))
# client = connect(host="mongodb://192.168.1.62:27017/docforge")


# User model
class User(Document):
    email = EmailField(required=True, unique=True)
    first_name = StringField(max_length=50, min_length=2)
    last_name = StringField(max_length=50, min_length=2)
    initials = StringField(max_length=3)
    password = StringField(required=True, min_length=6)
    role = StringField(default='user', choices=['admin', 'user'])


class Folder(Document):
    name = StringField(required=True)
    owner = ReferenceField(User, required=True, reverse_delete_rule=2)  # Delete folder if user is deleted
    created_at = DateTimeField(default=datetime.now())


# File model
class File(Document):
    user = ReferenceField(User)
    filename = StringField(required=True)
    filepath = StringField(required=True)
    folder = ReferenceField(Folder, required=True, reverse_delete_rule=2)
    owner = ReferenceField(User, required=True)
    uploaded_at = DateTimeField(default=datetime.now())

    def get_full_path(self):
        return os.path.join("uploads", self.filepath)
