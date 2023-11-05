from flask import Flask, request, jsonify
import fitz
from werkzeug.utils import secure_filename
import os
import docx2pdf
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r'/*': {'origins': 'http://localhost:3000'}})

def allowed_file(filename, allowed_extensions):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in allowed_extensions

@app.route('/api/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'})

    file = request.files['file']

    if file.filename == '':
        return jsonify({'error': 'No selected file'})

    if file and allowed_file(file.filename, {'txt', 'pdf', 'docx'}):
        filename = secure_filename(file.filename)
        filepath = os.path.join("./uploaded_files", filename)
        file.save(filepath)

        print(f"saved file to {filepath}")

        if filepath.endswith('docx'):
            docx2pdf.convert(filepath, f'{filepath}.pdf')
            print(f"removing :) file: {filepath}")
            os.remove(filepath)
            filepath = f'{filepath}.pdf'
            
        syllabus = fitz.open(filepath)

        print(f"removing :( file: {filepath}")
        os.remove(filepath)

        out = ""
        for page in syllabus:
            text = page.get_text()
            out += text

        response = jsonify({'syllabus_text': out})
        response.status_code = 200

        return response
    else:
        return jsonify({'Error': 'File type not allowed'})

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=8000, debug=True)