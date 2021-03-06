# Task 2

We are a small startup company which offers the precise and concise news and weather information
to our users. We are not news or weather agency that collects data. We filter the responses from
various sources and show it on our mobile app. We need a backend application which fetches data
from various sources and sends to our user’s phone.

Although we provide weather informations without any authentication but we need authentication
to access news api.
So we implement /signup, /login , logout functionality. You are free to manage user session however
you want

For registration we need user’s email, password and name.

More details refer TA_BackendDeveloperTask-190521.pdf in root folder.

### Step to run Unit Test

> npx jest

### Step to start the service

> node server.js

### Postman Spec Document

> https://documenter.getpostman.com/view/5358526/U16ewTrJ

### Hosted on Cloud (Heroku)

> https://ta-interview.herokuapp.com/v1/health

### Tech Stacks Used

- Node.js (Runtime)
- JavaScript (Programming Language)
- Postgres (Database - for storing Auth Tokens)
- Supabase Auth (Authentication)
- Express.js (Framework)
- Jest (Unit Testing)
- ESLint (Linting)
