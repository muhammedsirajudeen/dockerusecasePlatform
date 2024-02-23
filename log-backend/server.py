from flask import Flask, render_template, request,jsonify
import os
from flask_cors import CORS
import jwt
import pandas as pd
app = Flask(__name__)
CORS(app)
secretKey="sirajudeen"

# Set the path where uploaded files will be stored
UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER


@app.route('/filenames',methods=['POST'])
def file_names():
    data=request.get_json()
    token=data['token']['token']
    print(token)
    decoded_token=jwt.decode(token,secretKey,algorithms=['HS256'])
    username=decoded_token['email']
    print(username)
    directory_path = os.path.join(os.path.join(app.config['UPLOAD_FOLDER']),username)
    filenames = [filename for filename in os.listdir(directory_path) if os.path.isfile(os.path.join(directory_path, filename))]
    print(file_names)
    filearray=[]
    for filename in filenames:
        print(filename)
        filearray.append(filename)
    #access the names of all the files here
    return {'message':'success','filenames':filearray}

@app.route('/upload', methods=['POST'])
def upload_file():
    #get the  token
    token=request.form.get('token')
    secretKey="sirajudeen"
    decoded_token=jwt.decode(token,secretKey,algorithms=['HS256'])
    username=decoded_token['email']
    print(username)
    if 'files' not in request.files:
        return 'No file part'
    file = request.files['files']
    if file.filename == '':
        return 'No selected file'
    if file:
        new_directory_path = os.path.join(os.path.join(app.config['UPLOAD_FOLDER']),username)
        if not os.path.exists(new_directory_path):
            os.makedirs(new_directory_path)
            print("Created")
        else:
            print("does not exist")
        file.save(os.path.join(new_directory_path, file.filename))
        return 'File uploaded successfully'


@app.route('/summary',methods=['POST'])
def summary():
    data=request.get_json()
    filename=data['filename']
    token=data['token']
    print(token)
    decoded_token=jwt.decode(token,secretKey,algorithms=['HS256'])
    username=decoded_token['email']
    print(username)
    data=pd.read_csv("./uploads/"+username+"/"+filename)
    print(data)
    threat_count = data['threat_or_not'].value_counts()
    threat_type_count = data['threat_type'].value_counts()

    # Convert the analysis results to arrays
    threat_count_array = threat_count.values.tolist()
    threat_count_labels = threat_count.index.tolist()

    threat_type_count_array = threat_type_count.values.tolist()
    threat_type_count_labels = threat_type_count.index.tolist()

    # Example of how you can send these arrays back to be displayed using charts in JavaScript
    # For simplicity, let's just print them here
    print("Threat Count:")
    print(threat_count_array)
    print(threat_count_labels)
    print("Threat Type Count:")
    print(threat_type_count_array)
    print(threat_type_count_labels)
    return jsonify({'message':'success','threat_count_array':threat_count_array,
                    'threat_count_labels':threat_count_labels,
                    'threat_type_count_array':threat_type_count_array,
                    'threat_type_count_labels':threat_type_count_labels
                    })


if __name__ == '__main__':
    app.run(debug=True)
