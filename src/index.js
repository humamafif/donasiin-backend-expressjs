const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT;
const cors = require('cors');

app.use(cors());
app.use(express.json());


// test route
app.get("/", (req, res) => {
    res.send("Hello World");
});

app.get("/home", (req, res) => {
    res.send("Home World");
});

// DONOR ROUTES
const donorController = require('./donors/donor.controller');
app.use('/donors', donorController);

// DONATIONS ROUTE
const donationController = require('./donations/donation.controller');
app.use('/donations', donationController);

// BANKS ROUTE
const bankController = require('./banks/bank.controller');
app.use('/banks', bankController);

// PROGRAMS ROUTE
const programController = require("./programs/program.controller")
app.use("/programs", programController);

// TRANSACTIONS ROUTE
const transactionController = require("./transactions/transaction.controller");
app.use("/transactions", transactionController);

// ERROR HANDLING
app.use((err, req, res, next) => {
    let statusCode = 500;
    let message = "Internal Server Error";
    if (err.message === "Donor not found" || err.message === "Donation not found" || err.message === "Bank not found" || err.message === "Program not found" || err.message === "Transaction not found") {
        statusCode = 404;
        message = err.message;
    } else if (err.message === "Invalid ID") {
        statusCode = 400;
        message = err.message;
    }

    res.status(statusCode).json({ error: true, message: message, status_code: statusCode });
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running at http://localhost:${PORT}`);
})