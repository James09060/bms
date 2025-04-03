const Express = require('express')
const app = new Express();
const cors = require('cors');
require("dotenv").config();

var mongoose = require('mongoose');

var bodyParser = require('body-parser');
var path = require('path')

const mainRoute = require('./Routes/routes')

if (!process.env.MONGO_URI) {
    console.error("❌ MONGO_URI is not defined in .env file");
    process.exit(1); // Exit if MongoDB URI is missing
}

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use(cors({
    origin: '*'
}))
app.use(Express.static(path.join(__dirname, '/build')))


app.use(bodyParser.json({ limit: '20mb' }));
app.use(bodyParser.urlencoded({ limit: '20mb', extended: true }));


app.get("/", (req, res) => {
    res.json({ message: "Backend is running... Fine" });
});

app.use('/api', mainRoute)

app.listen(3000, (error) => {
    if (!error) {
        console.log(`Server is running on port: ${3000}!`); // eslint-disable-line
    }
});

const cron = require('node-cron');
const sensorDataService = require('./service/batteryViewService');

// Schedule a task to run every minute
cron.schedule('* * * * *', async () => {
    console.log("Running cleanup job...");
    await sensorDataService.deleteOldSensorData();
});