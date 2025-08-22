Vaagdevi Exchange Platform
Welcome to the Vaagdevi Exchange Platform! This is a full-stack web application built from the ground up to create a peer-to-peer rental marketplace exclusively for college students.

Think of it like a community closet for our campus. Instead of buying a drafter for a single semester or a camera for a weekend trip, students can rent one from a fellow student. It’s all about making college life more affordable and sustainable by letting students earn money from their unused items and save money by renting what they need.

Live Demo
Frontend (Vercel): https://vaagexchangeapp.vercel.app/

Features
User Authentication: Secure user registration and login system using JWT (JSON Web Tokens).

Product Management: Users can post, view, update, and delete their own product listings.

Dynamic Categories: Browse products across multiple categories including Laptops, Bikes, Cameras, Drafters, and GATE Books.

Search Functionality: Filter products within each category by name.

Rental System: A complete workflow for users to request rentals and for owners to approve or reject them.

Notifications: Users receive notifications for new rental requests and status updates on their rentals.

Responsive Design: A clean, mobile-first user interface that is fully responsive and works on all devices.

Technology Stack
This project is built with a modern and robust technology stack:

Frontend: React.js (Class Components)

Backend: Node.js, Express.js

Database: MySQL with Sequelize ORM

Authentication: JWT (JSON Web Tokens)

Image Handling: Multer for file uploads

Styling: Styled-Components and CSS

How It's Built: The User Journey
Let's walk through the main feature: renting a bike. This shows how the frontend and backend collaborate.

A student logs in. The React app sends the email and password to the /api/auth/login endpoint on the backend. The backend checks the database, and if the credentials are correct, it sends back a JWT, which the React app saves in the browser's cookies.

They browse the "Bikes" page. The React app navigates to the /bikes page. It then makes a GET request to the backend at /api/products/bikes. The backend queries the database for all bikes and sends back a list of bike data as JSON. The React app then uses this data to display all the available bikes in a clean, card-based layout.

The student decides to rent a bike. They click a "Rent" button on a specific bike. This triggers a POST request to the /api/rentals endpoint, sending along the bike's ID and the rental dates. Crucially, it also sends the user's JWT to prove who they are.

The bike's owner gets notified. The backend receives the rental request. It creates a new "pending" rental in the database and also creates a notification for the bike's owner.

The owner approves the request. The owner logs in and goes to their "My Listings" page, which fetches all their pending requests from /api/rentals/my-listings. They see the new request and click "Approve." This sends a PATCH request to /api/rentals/:id/status, telling the backend to change the rental's status to "active."

The renter is notified. The backend updates the rental status and creates a new notification for the original renter, letting them know their request was approved. The next time the renter visits their "My Rentals" page, they'll see the updated status.

This end-to-end flow is the core of the application and demonstrates how the frontend and backend work in tandem to create a complete and interactive experience.

Setup and Running Locally
Backend Setup (/vaagdeviBackend)
Navigate to the backend directory:

Bash

cd vaagdeviBackend
Install dependencies:

Bash

npm install
Set up your environment variables:

Create a .env file in the backend root.

Add your database credentials and JWT secret:

DB_HOST=your_db_host
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=your_db_name
JWT_SECRET=your_super_secret_key
Run the server:

Bash

npm start
Frontend Setup (/vaagfrontend)
Navigate to the frontend directory:

Bash

cd vaagfrontend/myapp
Install dependencies:

Bash

npm install
Start the development server:

Bash

npm start
The application will open automatically at http://localhost:3000.
