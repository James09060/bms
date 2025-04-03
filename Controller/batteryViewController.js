const sensorDataService = require('../service/batteryViewService')



module.exports.postSensorData = async (req, res) => {
    try {
        const savedData = await sensorDataService.createSensorData(req.body);
        res.status(201).json({ message: "Data saved successfully", data: savedData });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


module.exports.getSensorData = async (req, res) => {
    try {
        const data = await sensorDataService.getSensorData(req.body);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


module.exports.deleteSensorData = async (req, res) => {
    try {
        const id = req.params.id; // Get ID from request URL

        if (!id) {
            return res.status(400).json({ error: "Invalid ID" });
        }

        const filter = { _id: id }; // ✅ Convert to object format required by Mongoose

        const result = await sensorDataService.deleteSensorData(filter);

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



module.exports.filterSensorData = (req, res) => {
    var requestData = req.body;
    sensorDataService.filterSensorData(requestData, function (error, data) {
        if (error) {
            res.status(500).send(error)
        }
        else {
            res.status(200).send(data)
        }
    })
}


module.exports.deleteOldSensorData = async (req, res) => {
    try {
        const result = await sensorDataService.deleteOldSensorData();
        res.status(200).json({ message: "Old data deleted successfully", deletedCount: result.deletedCount });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const SensorData = require("../Model/batteryView"); // Import your model

exports.getLatestSensorData = async (req, res) => {
    try {
        const latestData = await SensorData.findOne().sort({ timestamp: -1 }); // Get the latest entry
        if (!latestData) {
            return res.status(404).json({ message: "No sensor data found" });
        }
        res.json(latestData);
    } catch (error) {
        res.status(500).json({ message: "Error fetching data", error: error.message });
    }
};
