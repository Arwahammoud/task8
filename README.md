Library Management System API
​A comprehensive backend system for managing a library, built with Node.js, Express, and MongoDB. This system streamlines library operations, including book management, member tracking, lending processes, reservations, and reviews.
​🚀 Key Features
​Material Management: CRUD operations for books and library materials.
​Member Management: Secure member registration and role assignment.
​Loan System: Automated lending process with real-time stock updates and overdue fine calculations.
​Reservation System: Automated queue-based reservation system to prioritize members.
​Reviews: Member-driven rating and comment system for library materials.
​🛠 Tech Stack
​Backend: Node.js, Express.js
​Database: MongoDB, Mongoose (ODM)
​Architecture: MVC (Model-View-Controller) pattern
​📋 Database Schema Relationship
​⚡️ API Endpoints Summary
​1. Loans (Lending)
​GET /api/v1/loans: Retrieve all loan records.
​POST /api/v1/loans: Create a new loan (automatically decrements material stock).
​PATCH /api/v1/loans/:id/return: Return material (automatically updates stock and calculates fines if overdue).
​2. Reservations
​POST /api/v1/reservations: Create a reservation (auto-assigns queuePriority).
​PATCH /api/v1/reservations/:id/cancel: Cancel a reservation and log the cancellation date.
​3. Reviews
​POST /api/v1/reviews: Add a rating and comment to a specific material
