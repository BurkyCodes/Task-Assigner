After cloning the repository


# Running the Frontend

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.3.1.

## Cd to the frontend app
```bash
cd client
```

## Install dependencies
```bash
npm install
```


## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.


For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.



# Running the Backend

This project was generated using Express.js, MongoDB as the database and mongoose ase the ORM.



## Cd to the server repository

```bash
cd server
```

## Install dependencies

```bash
npm install
```

## Development server

To start a local development server, run:

```bash
npm run dev
```


Once the server is running, open your browser and navigate to `http://localhost:5000/`. The application will automatically reload whenever you modify any of the source files.

## Setting up environment variables(Optional - You can use mine as it is)

To get started you will need to setup your DATABASE_URI connection string
If you havent used MongoDb before go to `https://www.mongodb.com/products/platform/atlas-database` and create and add a database.

cd backend

Change the current .env file and add your URI with the format
DATABASE_URI = "connection string"


Once the server is running, open your browser and navigate to `http://localhost:5000/`. The application will automatically reload whenever you modify any of the source files.

## API Documentation
After starting the server, you can access the API documentation via Swagger UI at:

http://localhost:5000/api-docs/

This interface allows you to explore all available endpoints, view request and response schemas, and test the API directly from the browser.

## Prefilled Users
mark, nena, admin, winnie, john, burky


