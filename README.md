# 🏥 MedBuddy  
## Advanced Healthcare Service Through Web Application

MedBuddy is a full-stack healthcare web application built using **React, Node.js, MongoDB, and Flask**, integrating appointment management, prescription processing, medicine comparison, digital health records, and AI-based assistance into a centralized healthcare platform.

---

## 📌 Project Overview

Traditional healthcare systems face multiple inefficiencies:

- Long appointment queues  
- Paper-based prescriptions  
- Loss of medical records  
- Difficulty reading handwritten prescriptions  
- Irregular medicine intake  
- Lack of centralized digital access  

MedBuddy addresses these issues by providing a smart, scalable, and modular web-based healthcare management system.

### The platform integrates:

- Secure authentication  
- Appointment automation  
- Digital prescription storage  
- Medicine price comparison  
- Reminder system  
- AI-powered chatbot  

---

## 🏗 System Architecture

The application follows a **3-layer microservice architecture**:

### 🔹 1. Frontend Layer (Client)

- React.js (Vite)
- Component-based modular design
- Context API for authentication
- Responsive user interface
- REST API communication

---

### 🔹 2. Backend Layer (Node.js + Express)

- Google OAuth 2.0 authentication
- Google Calendar integration
- Gmail API for notifications
- MongoDB database
- File upload handling (Multer)
- Appointment management APIs
- Health record management
- Prescription storage
- Chatbot routing

---

### 🔹 3. Service Layer (Flask Microservice)

- Prescription parsing engine (`super_parse`)
- Google Vision API integration
- Medicine extraction logic
- Medicine search modules
- Alternative recommendation system
- LCS-based similarity accuracy calculation

#### Scraping Sources:

- Apollo  
- Medibuddy  
- 1mg  
- Flipkart  

---

## 🔄 High-Level Workflow

1. User logs in using Google OAuth  
2. User books appointment or uploads prescription  
3. Backend stores data in MongoDB  
4. For scanning:
   - Node forwards image to Flask microservice  
   - Flask processes image using parsing module  
   - Structured medicine data is returned  
5. User can compare medicine prices  
6. User can create reminder events in Google Calendar  
7. Notifications are received on smartphone  

---

## 🚀 Core Functionalities

### 🔐 Secure Authentication

- Google OAuth 2.0  
- Session-based login  
- Gmail and Calendar API scopes  

---

### 🩺 Doctor Appointment System

- View doctors by specialization  
- Book remote or physical appointment  
- Auto-create Google Calendar event  
- Email confirmation via Gmail API  
- Real-time smartphone notifications  

---

### 📄 Prescription Management

- Upload image-based prescriptions  
- Store prescription history  
- Scan prescription for structured data  
- Maintain digital archive  

---

### 💊 Medicine Search & Price Comparison

- Multi-source medicine scraping  
- Real-time price comparison  
- Accuracy matching using Longest Common Subsequence (LCS)  
- Alternative medicine recommendations  
- Direct pharmacy redirection  

---

### ⏰ Medicine Reminder System

- Add dosage schedule  
- Redirect to Google Event creation  
- Automated reminder notifications  
- Improves medication adherence  

---

### 📊 Health Record Module

- Store personal health details  
- Maintain medical history  
- Centralized patient record system  

---

### 🌸 Period Tracker

- Track menstrual cycles  
- Predict next cycle  
- Improve personal health awareness  

---

### 🤖 AI Chatbot

- LLaMA-based conversational assistant  
- Context-aware responses  
- Provides general healthcare guidance  
- Enhances user interaction  

---

## 🛠 Technology Stack

### Frontend

- React.js  
- Vite  
- Context API  
- CSS  

### Backend

- Node.js  
- Express.js  
- MongoDB  
- Passport.js (Google OAuth)  
- Multer  

### Microservice Layer

- Python Flask  
- Google Vision API  
- Custom parsing module  
- Scraping modules  

### AI Layer

- LLaMA-based language model  

### External APIs

- Google OAuth 2.0  
- Google Calendar API  
- Gmail API  

---

## 📂 Basic Project Structure

```bash
MedBuddy/
│
├── client/                # React Frontend (Vite)
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── container/     # Feature modules (Appointment, Chatbot, Prescription, etc.)
│   │   └── contexts/      # Authentication context
│   └── package.json
│
├── server/                # Node.js + Express Backend
│   ├── models/            # MongoDB schemas
│   ├── routes/            # REST API routes
│   ├── uploads/           # Prescription storage
│   └── index.js           # Backend entry point
│
├── flask_server/          # Flask Microservice
│   ├── scrape/            # Medicine scraping modules
│   ├── medextractor/      # Prescription parsing engine
│   └── app.py             # Flask entry point
│
└── README.md

```

---

## 🔐 Security Implementation

- OAuth-based authentication  
- Session management  
- Environment variable configuration  
- Structured API routing  
- Controlled file upload system  

---

## 📈 Advanced Functional Additions

- Microservice-based modular design  
- LCS similarity factor for medicine matching  
- Multi-source scraping engine  
- REST API communication between services  
- Google API integration  
- Scalable MongoDB schema  
- Modular component-based frontend  

---

## 🎯 Objective

To build a centralized, intelligent, and scalable digital healthcare platform that simplifies appointment booking, prescription handling, and medicine comparison while enhancing accessibility and automation.

---

## 🌍 Real-World Impact

- Reduces prescription misinterpretation  
- Improves medication adherence  
- Encourages cost-effective medicine selection  
- Digitizes healthcare records  
- Enhances accessibility for rural and underserved populations  

---

## 🔮 Future Scope

- Cloud deployment  
- Docker containerization  
- Role-based admin panel  
- AI-based predictive health analysis  
- Wearable device integration  
- Multi-language support  
- Mobile application version  

---

## 📄 Project Report

👉 View the complete B.Tech Final Year Project Report inside this repository.
[📥 Download Project Report (PDF)](./Presentation_Docs_BTech_Final_Year_Project_2025.pdf)

---

## 👨‍💻 Contributors

- Sayantan Pakhira  
- Diptanil Kisku  
- Mukunda Mondal  
- Sayan Das  

**Under the guidance of:**  
Dr. Sudakshina Das Gupta  
Department of IT  
Government College of Engineering & Textile Technology, Serampore  

---
