
# Full Stack Blog Application (React & Laravel)

This is a full-stack blog application built with **React** for the frontend and **Laravel** for the backend. It allows users to create, read, update, and delete blog posts. The application features **JWT authentication** for secure login and management of user sessions.

## Features:
- **User Authentication**: 
  - Users can sign up and log in using **JWT authentication** with **HttpOnly cookies**.
  - Automatic refresh of JWT token when it expires.
  
- **CRUD Operations**: 
  - Create, update, and delete blog posts.
  
- **Infinite Scrolling**:
  - The homepage supports infinite scrolling to load posts dynamically as the user scrolls down.
  
- **Image Upload**:
  - Support for uploading images along with posts.
  
- **Responsive Design**:
  - The app is designed to be responsive and mobile-friendly.

## Tech Stack:
- **Frontend**:
  - React, React Router, React Hook Form, Axios
- **Backend**:
  - Laravel (API), JWT Authentication
- **Database**:
  - MySQL (for storing user and post data)
- **Styling**:
  - Custom CSS for UI components

## Installation:

### Prerequisites:
- **Node.js** and **npm** installed (for the frontend).
- **PHP** and **Composer** installed (for the backend).
- **MySQL** or any relational database of choice (for the backend).

### Backend Setup (Laravel):
1. Clone the backend repository:
   ```bash
   git clone https://github.com/your-repo-name/backend.git
   ```
   
2. Navigate to the backend directory and install dependencies:
   ```bash
   cd backend
   composer install
   ```
   
3. Set up your `.env` file:
   - Copy `.env.example` to `.env`:
     ```bash
     cp .env.example .env
     ```
   - Generate the application key:
     ```bash
     php artisan key:generate
     ```
   
4. Set up the database and run migrations:
   - Edit `.env` to configure your database settings.
   - Run the database migrations:
     ```bash
     php artisan migrate
     ```
   
5. Start the Laravel development server:
   ```bash
   php artisan serve
   ```

### Frontend Setup (React):
1. Clone the frontend repository:
   ```bash
   git clone https://github.com/your-repo-name/frontend.git
   ```
   
2. Navigate to the frontend directory and install dependencies:
   ```bash
   cd frontend
   npm install
   ```

3. Start the React development server:
   ```bash
   npm start
   ```

### Running the Application:
- The backend will run on `http://127.0.0.1:8000`.
- The frontend will run on `http://localhost:3000`.
- Open the app in your browser by navigating to `http://localhost:3000`.

## Contributing:
- Feel free to fork the repository, submit issues, and create pull requests.
- Contributions are welcome!

## License:
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## **LinkedIn Post:**

**🚀 Excited to Share My Full-Stack Blog Application Project! 🌟**

I’m thrilled to share a project I’ve been working on: A **Full-Stack Blog Application** using **React** for the frontend and **Laravel** for the backend. This app allows users to sign up, log in, and create, update, or delete posts.

🔐 **Features** include:
- JWT authentication with **HttpOnly cookies** for secure login
- **CRUD operations** for managing blog posts
- Infinite scrolling for seamless user experience
- Image upload support for posts
- **Auto token refresh** to keep the user logged in without interruptions

This project is a great example of building modern web applications with robust **frontend** and **backend** integrations, using cutting-edge technologies like React and Laravel.

## 🔧 **Tech Stack**:
- Frontend: **React**, **React Router**, **React Hook Form**, **Axios**
- Backend: **Laravel**, **JWT Authentication**
- Database: **MySQL**

### Why This Project Matters:
This app is perfect for understanding how to integrate **frontend** and **backend** with a secure authentication system, along with features like infinite scrolling and image handling. It's a step forward in my journey to mastering **full-stack development**!

Feel free to check it out, and let me know if you have any feedback or questions. 🚀

#ReactJS #Laravel #FullStackDevelopment #WebDevelopment #JWT #Authentication #TechProject #LearningByBuilding
