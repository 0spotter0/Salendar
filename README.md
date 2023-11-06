# Salendar
Submitted to DandyHacks 2023 at the University of Rochester

## Add your class schedule to your Google Calendar in seconds!
Salendar makes setting up your class calendars a breeze. Simply upload your syllabus, and we'll send you a link to a Google Calendar that you can add to your existing Google Calendar.

Check out our [demo video on youtube](https://youtu.be/kbQPwoAoFJM?si=7iRUkgt-OREmYNH2).

## What's next for Salendar
- System to preview calendar and allow the user to review & tweak.
- More options to differentiate homework, projects, exams, etc.
- Integrating a database for syllabuses so that users can view existing calendars and syllabuses for classes uploaded by other students.
- Deployment!

## Run instructions
### Required config:
* Add `OPENAI_API_KEY="your key"` in `flask_server/.env`
* Google Cloud service account credentials JSON in `google_cloud_credentials.json`

### Launch Flask backend:
The Flask backend server is hosted at http://localhost:4000/ by default.
```console
pip install -r requirements.txt

python the_backend.py
```
### Launch NextJS server:
The NextJS server is hosted at http://localhost:3000/ by default.
```console
npm i

npm run dev
```
---
![Our mascot, Sal](public/salamander_thick.png)


---
Copyright ©️ 2023 Justin Lee & Sammy Potter. All Rights Reserved