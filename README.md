EduLab



Description:

This project is an online learning platform, where instructors can create and publish courses, and students can enroll and learn at their own pace. The platform integrates AWS services and the Stripe API for payment processing.
The backend is implemented in Node.js, and a NoSQL database is used to store and manage data.


- Instructors: Can create, edit, and publish courses.

- Students: Can browse courses, enroll, and track their progress.

- AWS Integration:
S3 Bucket: Used to store and serve course-related files, such as videos, images, and resources.

-Payment Processing:
Stripe API: Integrated for secure and seamless payment transactions, and it split's the price of the course where 70% goes for the instructor and 30% goes to the platform.

- NoSQL Database:
Database: Utilizes a NoSQL database for flexible and scalable data storage, Mongoose and MongoDB was used.

- Node.js Backend:
Express.js: Framework used for building the server.
Technologies Used
Node.js
Express.js
AWS (S3, IAM)
Stripe API
MongoDB

-Installation
Clone the repository:

----------------------------------



Install dependencies:

npm install
----------------------------------



Configuration
Set up AWS credentials:
Create an AWS account.
Set up an S3 bucket and obtain access key and secret key.

Configure Stripe:
Create a Stripe account.
Obtain API keys for development and production.



- Start the server:
npm start
----------------------------------


Open the application in your browser:
http://localhost:3000
----------------------------------

Contributions:
**Ahmad Mashal:** Frontend, Backend, API integration, System Analyis, System Design, Database Integration.
