from pymongo import MongoClient
from datetime import datetime
import mimetypes
import bcrypt
from flask_bcrypt import Bcrypt
from flask import Flask, jsonify, request, redirect, send_file
from werkzeug.security import generate_password_hash, check_password_hash
from werkzeug.utils import secure_filename
from flask_cors import CORS
import jwt
from flask_jwt_extended import create_access_token, set_access_cookies, set_refresh_cookies, create_refresh_token, jwt_required, unset_jwt_cookies
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import JWTManager
import os
import json
from io import BytesIO
from models import User, Folder, File
from datetime import timedelta

from PyPDF2 import PdfReader, PdfWriter
import qrcode
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
import tempfile
from PIL import Image


UPLOAD_FOLDER = "/uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
ALLOWED_EXTENSIONS = {"png", "jpg", "pdf", "txt", "zip", "xls", "xlsx", "doc", "docx", "jpeg"}

app = Flask(__name__)
cors = CORS(app, supports_credentials=True, origins='*')
bcrypt = Bcrypt(app)

app.config["JWT_SECRET_KEY"]= "secrete-key-to-be-changed"
app.config["JWT_TOKEN_LOCATION"] = ["cookies"]
app.config["JWT_ACCESS_COOKIE_NAME"] = "access_token"
app.config['PROPAGATE_EXCEPTIONS'] = True
app.config["JWT_REFRESH_COOKIE_NAME"] = "refresh_token"
app.config["JWT_COOKIE_SECURE"] = False  # Set to True in production
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(minutes=30)
app.config["JWT_REFRESH_TOKEN_EXPIRES"] = timedelta(days=7)
app.config["JWT_COOKIE_CSRF_PROTECT"] = False
app.config['UPLOAD_FOLDER'] = 'uploads' 

jwt = JWTManager(app)

@app.route('/api/dashboard', methods=['GET'])
@jwt_required(refresh=True)
def dashboard():
    user_id = get_jwt_identity()
    user = User.objects(id=user_id).first()
    
    if not user:
        return jsonify({"error": "User not found"}), 404
    
    return jsonify({
        "id": str(user.id),
        "first_name": user.first_name,
        "last_name": user.last_name,
        "initials": user.initials,
        "email": user.email,
        "role": user.role
    }), 200


@app.route('/logout', methods=['GET'])
@jwt_required()
def logout():
    response = jsonify({"message": "Logged out"})
    unset_jwt_cookies(response)
    return response, 200


@app.route("/api/login", methods=['POST'])
def login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    user = User.objects(email=email).first()
    print(email)
    if user and bcrypt.check_password_hash(user.password, password):
        access_token = create_access_token(identity=str(user.id))
        refresh_token = create_refresh_token(identity=str(user.id))

        user_data = {
            "id": str(user.id),
            "first_name": user.first_name,
            "last_name": user.last_name,
            "initials": user.initials,
            "email": user.email,
            "role": user.role
        }

        response = jsonify({"message": "Login successful",
                            "user": user_data})
        
        set_access_cookies(response, access_token)
        set_refresh_cookies(response, refresh_token)

        return response, 200
    
    return jsonify({"error": "Invalid credentials"}), 401


@app.route('/api/register', methods=['POST'])
def register():
    email = request.json.get("email", None)
    first_name = str(request.json.get("firstName", None)).capitalize()
    last_name = str(request.json.get("lastName", None)).capitalize()
    password = request.json.get("password", None)
    initials = f"{first_name[:1]}{last_name[:2]}".upper()
    hashedpass = bcrypt.generate_password_hash(password=password)
    user = User(email=email, first_name = first_name, initials=initials, password= hashedpass, last_name=last_name)

    try:
        user.save()
        return jsonify({'message': 'user registered succefully'}), 201
    
    except:
        return jsonify({"error": "Email already exists"}), 400


@app.route('/folders', methods=['POST'])
@jwt_required()
def create_folder():
    user_id = get_jwt_identity()
    data = request.json
    folder_name = data.get("name")

    user = User.objects(id=user_id).first()
    if not user:
        return jsonify({"error": "User not found"}), 404

    if not folder_name:
        return jsonify({"error": "Folder name is required"}), 400

    existing_folder = Folder.objects(owner=user, name=folder_name).first()
    if existing_folder:
        return jsonify({"error": "Folder already exists"}), 400

    folder = Folder(name=folder_name, owner=user)
    folder.save()

    return jsonify({"message": "Folder created", "folder_id": str(folder.id)}), 201


@app.route("/folders", methods=["GET"])
@jwt_required()
def get_folders():
    user_id = get_jwt_identity()
    user = User.objects(id=user_id).first()
    folders = Folder.objects(owner=user)
    return jsonify([{"id": str(folder.id), "name": folder.name} for folder in folders])


@app.route("/folders/<folder_id>", methods=['DELETE'])
@jwt_required()
def delete_folder(folder_id):
    user_id = get_jwt_identity()
    
    folder = Folder.objects(id=folder_id, owner=user_id).first()
    if not folder:
        return jsonify({"error": "Folder not found or unauthorized"}), 404

    folder.delete()
    return jsonify({"message": "Folder and its files deleted successfully"}), 200


def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route("/upload/<folder_id>", methods=["POST"])
@jwt_required()
def upload_file(folder_id):
    user_id = get_jwt_identity()
    user = User.objects(id=user_id).first()
    folder = Folder.objects(id=folder_id, owner=user).first()

    if not folder:
        return jsonify({"error": "Folder not found"}), 404

    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files["file"]
    
    if file.filename == "":
        return jsonify({"error": "No selected file"}), 400

    if not allowed_file(file.filename):
        return jsonify({"error": "Invalid file type"}), 400

    filename = secure_filename(file.filename)
    folder_path = os.path.normpath(os.path.join(UPLOAD_FOLDER, str(user.id), folder.name))
    os.makedirs(folder_path, exist_ok=True)
    file_path = os.path.normpath(os.path.join(folder_path, filename))

    existing_file = File.objects(filename=filename, folder=folder, owner=user).first()
    if existing_file:
        existing_file.filepath = f"{user.id}/{folder.name}/{filename}"
        existing_file.save()
    else:
        file.save(file_path)
        file_entry = File(
            filename=filename,
            filepath=f"{user.id}/{folder.name}/{filename}",
            folder=folder,
            owner=user,
        )
        file_entry.save()

    # Check if the file is a PDF and add a QR code
    if filename.lower().endswith('.pdf'):
        add_qr_to_pdf(file_path, str(file_entry.id))

    return jsonify({"message": "File uploaded or updated", "file_id": str(existing_file.id if existing_file else file_entry.id)}), 201

# Files
@app.route("/files/<folder_id>", methods=["GET"])
@jwt_required()
def get_files(folder_id):
    user_id = get_jwt_identity()
    folder = Folder.objects(id=folder_id, owner=user_id).first()
    if not folder:
        return jsonify({"error": "Folder not found"}), 404

    files = File.objects(folder=folder)
    return jsonify([{"id": str(file.id), "filename": file.filename, "filepath": file.filepath} for file in files])


@app.route("/files/<file_id>", methods=['DELETE'])
@jwt_required()
def delete_file(file_id):
    user_id = get_jwt_identity()
    
    file = File.objects(id=file_id, owner=user_id).first()
    if not file:
        return jsonify({"error": "File not found or unauthorized"}), 404

    # Delete file from storage
    file_path = os.path.join(UPLOAD_FOLDER, file.filepath)  # Ensure correct path
    if os.path.exists(file_path):
        os.remove(file_path)

    file.delete()
    return jsonify({"message": "File deleted successfully"}), 200

@app.route("/download/<file_id>", methods=["GET"])
@jwt_required()
def download_file(file_id):
    user_id = get_jwt_identity()
    file = File.objects(id=file_id, owner=user_id).first()

    if not file:
        return jsonify({"error": "File not found or unauthorized"}), 404

    file_path = os.path.join(UPLOAD_FOLDER, file.filepath)

    if not os.path.exists(file_path):
        return jsonify({"error": "File not found on server"}), 404

    # Guess MIME type based on filename
    mimetype, _ = mimetypes.guess_type(file.filename)
    if mimetype is None:
        mimetype = "application/octet-stream"  # Default binary type

    response = send_file(
        file_path,
        as_attachment=True,
        mimetype=mimetype,
        download_name=file.filename  # Flask 2.0+ uses download_name
    )

    # Manually set Content-Disposition header
    response.headers["Content-Disposition"] = f'attachment; filename="{file.filename}"'
    response.headers["Access-Control-Expose-Headers"] = "Content-Disposition"  # Required for frontend to access it

    return response

@app.route("/files/check/<file_id>", methods=["GET"])
def check_file(file_id):
    # Retrieve the file from the database
    file = File.objects(id=file_id).first()

    if not file:
        return jsonify({"error": "File not found"}), 404

    # Get the current time from the frontend or server side (e.g., assume this is passed from the frontend)
    current_time = request.args.get('current_time', type=str)

    if current_time:
        try:
            current_time = datetime.fromisoformat(current_time)
        except ValueError:
            return jsonify({"error": "Invalid current time format. Please use ISO format."}), 400
    else:
        return jsonify({"error": "Current time is required to check if the file is the latest."}), 400

    # Compare the uploaded_at time with the current time
    if file.uploaded_at > current_time:
        return jsonify({
            "message": "The file is up-to-date",
            "file_id": str(file.id),
            "uploaded_at": file.uploaded_at.isoformat(),
        })
    else:
        return jsonify({
            "message": "Your file is outdated",
            "file_id": str(file.id),
            "uploaded_at": file.uploaded_at.isoformat(),
        })


#### QR CODE LOGIC ##########

def generate_qr_code(file_id):
    url = f"http://localhost:5173/check/file/{file_id}_{datetime.now().strftime('%Y%m%d%H%M%S')}"
    
    # Create a QR code
    qr = qrcode.make(url)
    
    # Save QR code to a BytesIO buffer
    qr_buffer = BytesIO()
    qr.save(qr_buffer, format="PNG")
    qr_buffer.seek(0)  # Reset the buffer's pointer to the start
    
    return qr_buffer

# Function to add QR code to PDF
def add_qr_to_pdf(pdf_path, file_id):
    # Generate the QR code for the file
    qr_buffer = generate_qr_code(file_id)

    # Create a temporary file to store the QR code image
    with tempfile.NamedTemporaryFile(delete=False, suffix=".png") as tmp_qr_file:
        tmp_qr_file_path = tmp_qr_file.name
        # Save the QR code to the temporary file (after converting the buffer to an actual image)
        with open(tmp_qr_file_path, 'wb') as tmp_file:
            tmp_file.write(qr_buffer.read())  # Write the buffer's content to the temporary file
        
        # Read the existing PDF
        reader = PdfReader(pdf_path)
        writer = PdfWriter()

        # Extract the first page (we'll add the QR code here)
        page = reader.pages[0]
        writer.add_page(page)

        # Create a new PDF with the QR code
        packet = BytesIO()
        c = canvas.Canvas(packet, pagesize=letter)
        c.drawImage(tmp_qr_file_path, 450, 750, 100, 100)  # Position and size of the QR code
        c.save()

        # Merge the QR code page with the original PDF
        packet.seek(0)
        qr_reader = PdfReader(packet)
        qr_page = qr_reader.pages[0]
        page.merge_page(qr_page)

        # Write the new PDF with the QR code
        with open(pdf_path, "wb") as f:
            writer.write(f)

        # Clean up the temporary QR code image file
        os.remove(tmp_qr_file_path)


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
