const SensorData = require('../Model/batteryView')


module.exports.createSensorData = async (data) => {
    try {
        // Generate current timestamp in the required format
        const now = new Date();
        const formattedTimestamp = now.toISOString().slice(0, 19).replace("T", " ");
        data.timestamp = formattedTimestamp;

        // Insert new record
        const newSensorData = new SensorData(data);
        return await newSensorData.save();
    } catch (error) {
        throw new Error("Error saving sensor data: " + error.message);
    }
};





module.exports.getSensorData = async (receivedData) => {
    try {
        const data = await SensorData.find(receivedData); // ✅ No .exec(callback)
        return data;
    } catch (error) {
        throw new Error("Error retrieving sensor data: " + error.message);
    }
};


// module.exports.updateBatteryView = (id, receivedData, callback) => {
//     product.updateBatteryView({ _id: id }, { $set: receivedData }).exec(function (err, data) {
//         if (err) {
//             callback(err)
//         } else {
//             callback(null, data);
//         }
//     });
// };


module.exports.deleteSensorData = async (filter) => {
    try {
        const result = await SensorData.deleteOne(filter); // ✅ No callbacks
        if (result.deletedCount === 0) {
            throw new Error("No matching record found to delete.");
        }
        return { message: "Deleted Successfully", deletedCount: result.deletedCount };
    } catch (error) {
        throw new Error("Error deleting sensor data: " + error.message);
    }
};

module.exports.filterSensorData = (receivedData, callback) => {
    SensorData.find(receivedData, function (err, response) {
        if (err) {
            callback(err)
        }
        else {
            callback(null, response)
        }
    })
}


module.exports.deleteOldSensorData = async () => {
    try {
        // Get the timestamp for 5 minutes ago
        const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);

        // Convert the string timestamp in DB to a Date and compare
        const result = await SensorData.deleteMany({
            timestamp: { $lt: fiveMinutesAgo.toISOString().slice(0, 19).replace("T", " ") }
        });

        return result;
    } catch (error) {
        throw new Error("Error deleting old sensor data: " + error.message);
    }
};

