from mongoengine import *
from dotenv import load_dotenv
import os

load_dotenv()


client = connect(host=os.getenv("MONGODB_URI"))
# client = connect(host="mongodb://192.168.1.62:27017/docforge")


class User(Document):
    email = EmailField(required=True)
    first_name = StringField(max_length=50)
    last_name = StringField(max_length=50)
    password = StringField(required=True, min_length=6)


# class File(Document):

