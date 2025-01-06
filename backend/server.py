from pymongo import MongoClient
from flask import Flask, jsonify, request, redirect
from flask_cors import CORS
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager
import os
import json
from models import User

app = Flask(__name__)
app.config['UPLOAD_PATH'] = "files"
app.config["JWT_SECRET_KEY"]= "secrete-key-to-be-changed"
jwt = JWTManager(app)
cors = CORS(app, origins='*')


@app.route("/api/user", methods=['GET'])
def users():
    return jsonify({
        "users": [
            'user1',
            'user2',
            'user3',
        ]
    })


@app.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    # Access the identity of the current user with get_jwt_identity
    current_user = get_jwt_identity()
    
    return jsonify(logged_in_as=current_user), 200


@app.route("/api/upload", methods=['POST'])
def upload_file():
    if request.method == 'POST':
        uploaded_file = request.files['file']
        print(upload_file)
        uploaded_file.save(os.path.join(app.config['UPLOAD_PATH'], uploaded_file.filename))
    else:
        return "only POST requests allowed."
    return "hello"


@app.route("/api/login")
def login():
    pass


@app.route('/api/register', methods=['POST'])
def register():
    email = request.json.get("email", None)
    first_name = request.json.get("first_name", None)
    last_name = request.json.get("last_name", None)
    password = request.json.get("password", None)
    User(email= email, first_name = first_name, password= password, last_name=last_name).save()
    return "User created correctly", 200
    # return redirect("http://localhost:5173/dashboard")

@app.route("/api/file")
def file():
    pass

@app.route("/token", methods=['POST'])
def login_test():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    if email != "test" or password != "test":
        return jsonify({"msg": "Wrong email or password"}), 401
    access_token = create_access_token(email)
    response = {"access_token": access_token}
    return jsonify(response)


if __name__ == "__main__":
    app.run(debug=True, port=5000)
