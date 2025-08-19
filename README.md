# 🔍 WhereIsIt - Lost & Found Platform

![App Screenshot](https://i.postimg.cc/HLx3JJfq/lost-found.png)

## 📋 Project Overview

WhereIsIt is a comprehensive Lost & Found web platform built with the MERN stack that connects people to recover their lost belongings. The application enables users to post lost or found items, search through community submissions, and track recovery processes through an intuitive and responsive interface.

## 🔗 Live Links

- **Live Website**: 
https://whereisitbro.netlify.app

## 💻 Technologies Used

**Frontend:** React.js, Tailwind CSS, Framer Motion, React Datepicker, Firebase Auth

**Backend:** Node.js, Express.js, MongoDB, JWT, Bcrypt

**Tools & Libraries:** Vite, Axios, React Hot Toast, SweetAlert2, Vercel

## ✨ Core Features

- 🔍 **Lost & Found Posting** - Users can report lost items or post found items with detailed information
- 🔐 **JWT Authentication** - Secure login/registration with Firebase Auth integration
- 🔎 **Advanced Search** - Filter posts by title, location, and category
- 📱 **Responsive Design** - Fully optimized for mobile, tablet, and desktop devices
- 🎯 **Recovery Tracking** - Track item recovery process with detailed logs
- 📅 **Date Management** - React Datepicker for accurate date selection
- 🎨 **Smooth Animations** - Framer Motion animations for enhanced UX
- 🔄 **Dynamic Layouts** - Toggle between card and table view layouts
- 📊 **Personal Dashboard** - Manage posted items and recovery history
- 🔔 **Real-time Notifications** - Toast alerts for all CRUD operations
- 🛡️ **Private Routes** - Protected pages for authenticated users only
- 404 **Error Handling** - Custom 404 page and error boundaries

## 📦 Key Dependencies

### Client Dependencies
```json
{
  "react": "^18.2.0",
  "react-router-dom": "^6.8.0",
  "axios": "^1.3.0",
  "firebase": "^9.17.0",
  "tailwindcss": "^3.2.0",
  "framer-motion": "^10.0.0",
  "react-datepicker": "^4.10.0",
  "react-hot-toast": "^2.4.0",
  "sweetalert2": "^11.7.0",
  "react-hook-form": "^7.43.0"
}
```



## 🚀 Local Setup Guide

### Prerequisites
- Node.js (v16+ recommended)
- MongoDB (local installation or Atlas account)
- Firebase project setup
- Git

### Client Setup

1. **Clone Repository**
   ```bash
   git clone 
https://github.com/jahidulislamzim/lost-client

   cd lost-client
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create `.env.local` file:
   ```env
   VITE_FIREBASE_API_KEY=your_firebase_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
   VITE_FIREBASE_APP_ID=your_firebase_app_id
   VITE_API_URL=http://localhost:5000
   ```






## 🔐 Authentication Flow

1. **Registration/Login** - Firebase Auth handles user authentication
2. **JWT Generation** - Server creates JWT token upon successful login
3. **Token Storage** - Client stores JWT in localStorage
4. **Route Protection** - Private routes verify JWT before access
5. **Auto Logout** - Token expiration triggers automatic logout

## 🎨 Key Features Implementation

### Search Functionality
- Real-time search by title and location
- Category-based filtering
- Responsive search interface

### Recovery System
- Modal-based recovery reporting
- Automatic status updates
- Recovery history tracking

### Layout Management
- Dynamic card/table view toggle
- Responsive grid systems
- Mobile-optimized layouts





## 🙏 Acknowledgments

- **Firebase** for authentication services
- **MongoDB Atlas** for cloud database hosting
- **Framer Motion** for smooth animations
- **Tailwind CSS** for utility-first styling
- **React Datepicker** for date selection functionality


---

<div align="center">
  <p><strong>WhereIsIt - Lost & Found Platform</strong></p>
  <p>Connecting Communities, Recovering Belongings</p>
  <p>Made with ❤️ by Jahidul Islam Zim</p>
</div>