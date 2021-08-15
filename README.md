# Storefront Backend Project


## SETUP

Firstly, we will need to install all the node packages that are required for the project using the comamnd:

    $ npm install


Now, we are ready to setup the databases required for the project. For the purpose, we will need to run and later, connect with the PostgreSQL daatbase running the command from terminal:

    $ psql postgres

Then, we will need to create a database for the application namly `storefront` and another for testing
namely `storefront_test` for the user `arefe` with the command provided:

    <!-- create the dataabses -->
    postgres=# CREATE DATABASE storefront;
    postgres=# CREATE DATABASE storefront_test;

    <!-- create an user -->
    postgres=# CREATE USER arefe WITH ENCRYPTED PASSWORD 'udacity';

    <!-- provide the user access for the databases -->
    postgres=# GRANT ALL PRIVILEGES ON DATABASE storefront TO arefe;
    postgres=# GRANT ALL PRIVILEGES ON DATABASE storefront_test TO arefe;

## DB MIGRATION

At the moment, we are ready for the databse migration and creating the tables. WE can do that using the
command provided:

    <!-- this command will create the tables in the develpment database -->
    $ yarn dev_up

In case, if we would like to drop these tables and start over, we can run the command:

    <!-- this will drop the tables in the primary database -->
    $ yarn dev_down

## TESTING

We can run the tests using the comamnd:

    $ yarn test

## START APPS

We can start the app using any of the command provided:

    $ yarn start 
    $ yarn watch

The above command will start the app at the port of 3000. A postman collection is provided named
StorefrontAPI.postman_collection.json that can be user for inspection of the app. The setup for the
authetication need to be accordingly.


## SETUP THE BEARER TOKEN 

![alt text](images/autheticated_product_creation.png)

![alt text](images/authentication_setup.png)


## TECHNOLOGIES

Your application must make use of the following libraries:

-   Postgres for the database
-   Node/Express for the application logic
-   dotenv from npm for managing environment variables
-   db-migrate from npm for migrations
-   jsonwebtoken from npm for working with JWTs
-   jasmine from npm for testing



## STEPS FOR COMPLETION

### 1. Plan to Meet Requirements

In this repo there is a `REQUIREMENTS.md` document which outlines what this API needs to supply for the frontend, as well as the agreed upon data shapes to be passed between front and backend. This is much like a document you might come across in real life when building or extending an API.

Your first task is to read the requirements and update the document with the following:

-   Determine the RESTful route for each endpoint listed. Add the RESTful route and HTTP verb to the document so that the frontend developer can begin to build their fetch requests.  
    **Example**: A SHOW route: 'blogs/:id' [GET]

-   Design the Postgres database tables based off the data shape requirements. Add to the requirements document the database tables and columns being sure to mark foreign keys.  
    **Example**: You can format this however you like but these types of information should be provided
    Table: Books (id:varchar, title:varchar, author:varchar, published_year:varchar, publisher_id:string[foreign key to publishers table], pages:number)

**NOTE** It is important to remember that there might not be a one to one ratio between data shapes and database tables. Data shapes only outline the structure of objects being passed between frontend and API, the database may need multiple tables to store a single shape.

### 2. DB Creation and Migrations

Now that you have the structure of the databse outlined, it is time to create the database and migrations. Add the npm packages dotenv and db-migrate that we used in the course and setup your Postgres database. If you get stuck, you can always revisit the database lesson for a reminder.

You must also ensure that any sensitive information is hashed with bcrypt. If any passwords are found in plain text in your application it will not pass.

### 3. Models

Create the models for each database table. The methods in each model should map to the endpoints in `REQUIREMENTS.md`. Remember that these models should all have test suites and mocks.

### 4. Express Handlers

Set up the Express handlers to route incoming requests to the correct model method. Make sure that the endpoints you create match up with the enpoints listed in `REQUIREMENTS.md`. Endpoints must have tests and be CORS enabled.

### 5. JWTs

Add JWT functionality as shown in the course. Make sure that JWTs are required for the routes listed in `REQUIUREMENTS.md`.

### 6. QA and `README.md`

Before submitting, make sure that your project is complete with a `README.md`. Your `README.md` must include instructions for setting up and running your project including how you setup, run, and connect to your database.

Before submitting your project, spin it up and test each endpoint. If each one responds with data that matches the data shapes from the `REQUIREMENTS.md`, it is ready for submission!




