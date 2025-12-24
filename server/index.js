const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const { userRouter } = require('./routes/userRoute');
const { taskRouter } = require('./routes/taskRoute');
const { seedUsers } = require('./helpers/seedUsers');
const session = require("express-session");
const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('./swagger');


require('dotenv').config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use(cors());



const connectToDatabase = async () => {
    const uri = process.env.DATABASE_URI;
    try {
        await mongoose.connect(uri, {
            family: 4,
            tls: true,
            tlsAllowInvalidCertificates: false,
            serverSelectionTimeoutMS: 5000
        })
        console.log("Connected to database")
    } catch (error) {
        setTimeout(connectToDatabase, 5000)
        console.error("Failed to connect to database!", e);
    }
}

connectToDatabase();

app.use(
  session({
    name: "task-manager-session",
    secret: process.env.SESSION_SECRET || "dev-secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false, 
      maxAge: 24 * 60 * 60 * 1000
    }
  })
);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));


app.use("/users",userRouter);
app.use("/tasks",taskRouter);

seedUsers();

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server listening on port ${port}`));

