
 Atithi Devo Bhava
==========

Wanderlust is a full-stack web application built with Node.js, Express, Mongoose, EJS, Passport, and other technologies. This application allows users to create an account, create and edit listings, and leave reviews for those listings.

Features
--------

* User authentication with Passport
* Listing creation and editing
* Review submission and editing
* Error handling and flash messages

Technologies Used
----------------

* Node.js
* Express
* Mongoose
* EJS
* Passport
* connect-flash
* cookie-parser
* express-session
* method-override
* dotenv
* express-error-handler

Getting Started
---------------

1. Clone the repository:
```bash
git clone https://github.com/[username]/wanderlust.git
```
2. Install dependencies:
```bash
cd wanderlust
npm install
```
3. Create a .env file in the root directory with the following content:
```makefile
MONGO_URL=mongodb://127.0.0.1:27017/wanderlust
SECRET=mysupersecretcode
```
4. Run the application:
```bash
npm start
```
Routes
------

| Method | Path | Description |
| --- | --- | --- |
| GET | /home | Homepage |
| GET | /home/feeds | Listing feed |
| GET, POST, PUT, DELETE | /listings | Listing management |
| GET, POST, PUT, DELETE | /listings/:id/reviews | Review management |
| GET, POST | /users | User management |

Contributing
------------

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

License
-------

[MIT](https://choosealicense.com/licenses/mit/)

Contact
-------

[Your Name](mailto:you@example.com)

This README.md file includes information about the project, how to install and run it, the routes available, and how to contribute. It also includes a list of technologies used and the project's license. You can customize this template to fit the specific needs of your project. 

Note: The above code block is a Node.js application, it cannot be executed as a Markdown file. It should be used as a reference for the application code and not as a standalone file.
