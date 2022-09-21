### Clapingo Assignment

## How to run this project

1. Clone the repo, and install dependencies using `npm i `, start the server using `npm run dev`, Make sure to run mongodb server using `mongod` command, make sure the url in code matches

# ROUTES

> Below is the documentation to use API, use API client such as POSTMAN or PAW etc
> _students.json and teachers.json is dummy data that could be used, those files are present at root of the repo, use password as 123456_

1. **Signup Route**: `localhost:3000/auth/signup` , A user can signup on this route, Details are imp send them as body in JSON format, below are all required fields
   this route returns token as response and also as cookie
   `{ "name": "spandan", "email": "spandan@gmail.com", "phone": 9800000000, "password": "123456", "designation": "student", "college": "oxford" }`
   feel free to use your own values

2. **login route**: `localhost:3000/auth/login` , Registered User can login using this route, Below are the required fields to be sent as JSON body, this route return token as response and cookie
   `{ "email": "john@gmail.com", "password":"123456", "designation":"student" }`

3. **add favourite teacher**: `localhost:3000/feature/addfav?email=profr@gmail.com`, For this you need to set `Authorization` as `Bearer Token-Value` in request header or you need to have the cookie set which will atuomatically happen when you login or register,
   make sure that you are logged in or signed up as student only,
   request will return `success` status once ran successfully,
   note: as shown send `email` of teacher as query
4. **remove favourite teacher**: `localhost:3000/feature/removefav?email=james@gmail.com`, For this you need to set `Authorization` as `Bearer Token-Value` in request header or you need to have the cookie set which will atuomatically happen when you login or register,
   make sure that you are logged in or signed up as student only,
   request will return `success` status once ran successfully,
   send `email` of teacher as query
5. **get most favourite teacher**: `localhost:3000/feature/getfav`, This route will return most favourite teacher using aggregation,
