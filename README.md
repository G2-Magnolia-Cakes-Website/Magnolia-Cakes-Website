# Magnolia-Cakes-Website

A full-stack application for Magnolia Cakes and Cupcakes with the Frontend created with ReachJS, Backend created with django and a PostgreSQL database server. All of the mentioned components are currently hosted on Google Cloud.

## Developed by:

Kim Ta (s3840049)
Omer Yalavac (s3849677)
Quang Minh Duong (s3759757)
Ya-Tse Lu (s3933328)

## Release notes:

### For general users:

- Login/Signup with email verification
- Responsive home page with image sliders and business info, including a google map with business's location
- Access business's social media link with appropriate icon
- Access gallery page and able to filter out gallery category
- Access to online store and place order for different variants of cakes and cupcakes
- Access to workshop page to view exclusive contents or pay for each of the video if they haven't done so
- Access to About Us page with business's full detail
- Access to Frequently Asked Question page and able to filter out category to find their answer easier
- Access to Contact Us page to directly ask the admin about any general matters
- Direct chat to admin via Facebook Messenger plugin (not working locally)
- Access to Get a Quote page to make bulk order to admin
- Access to Flavours and Serving page to view the options that the business serve
- View cart and make suitable adjustment to the items
- Have a secure checkout session with Stripe
- Access to Profile page to edit their personal details and view their purchase history

### For admin:

- Manage users (create, edit, delete and promote a user to admin)
- Manage contents to be display on the homepage (About us, email, working hour, location, image slider, media link)
- Manage Terms and Conditions
- Manage Frequently Ask Questions
- Manage items to be put on gallery page
- Manage items to be put on online store
- Manage items to be put on workshop page
- Manage items to be put on flavours and serving page
- Receive quotes request from user and able to generate excel file to conduct business research
- Manage promotions code 
- Access user purchase history

## How to run?

### Backend

Optional: Activate virtual environment before starting

Prerequisite: Make sure you have the latest version of python and have Django installed

1. Navigate to 'backend' on your Terminal and run this command to install necessary package for the project:

### `pip install -r requirements.txt`

2. Navigate to 'backend' under that 'backend' folder on your own IDE and find 'settings.py', follow the comment in that file to make suitable adjustment to the url

3. On your Terminal, run the following commands to start the backend server:

### `python manage.py runserver`

### Frontend

Prerequisite: Make sure you have Node.js installed

1. Navigate to 'frontend' on your Terminal and run this command to install the neccessary node modules:

### `npm i`

2. Locate `axios.js` file on your IDE and follow the comment in that file to make suitable adjustment to the url

3. Run this command on your Terminal to start the frontend app:

### `npm start`

3. Enjoy

## Development Guide

- Follow django's documentation to make suitable adjustments to the backend application: `https://docs.djangoproject.com/`

- After you made any modification towards the `models.py` file, always remember to run the following commands before you start the application again so that your changes are reflected on the sql database:

### `python manage.py makemigrations`

### `python manage.py migrate`

- Follow React's documentation to make suitable adjustments to the frontend application `https://legacy.reactjs.org/docs/getting-started.html`

## Deployment Guide

- Follow this page to install gcloud CLI and configure your Google Developer account: `https://cloud.google.com/sdk/docs/install-sdk`

### To deploy backend

- Navigate to 'backend' on your Terminal and make suitable adjustment to backend.yaml file if you want to change your host settings

- Enter `gcloud app deploy backend.yaml` followed by `y` when the command ask you to confirm to deploy the backend application to cloud

### To deploy frontend

- Navigate to 'frontend' on your Terminal and make suitable adjustment to app.yaml file if you want to change your host settings

- Enter `npm run build` on your Terminal to create a production-ready build for your frontend application

- Enter `gcloud app deploy` followed by `y` when the command ask you to confirm to deploy the frontend application to cloud