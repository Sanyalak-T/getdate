// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/mydatabase', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Define a schema and model for the data
const dateSchema = new mongoose.Schema({
    date: Date,
});
const DateModel = mongoose.model('Date', dateSchema);

// API endpoint to get the date
app.get('/api/date', async (req, res) => {
    try {
        const dateData = await DateModel.findOne(); // Assuming there's at least one document
        res.json(dateData);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// API endpoint to update the date
app.post('/api/date', async (req, res) => {
    try {
        const newDate = req.body.date;
        const updatedDate = await DateModel.findOneAndUpdate({}, { date: newDate }, { new: true, upsert: true });
        res.json(updatedDate);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
