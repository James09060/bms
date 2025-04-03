const sensorDataDao = require('../dao/batteryViewDao')

module.exports.createSensorData = async (data) => {
    try {
        return await sensorDataDao.createSensorData(data);
    } catch (err) {
        throw new Error("Error in service layer: " + err.message);
    }
};


module.exports.getSensorData = async () => {
    try {
        const result = await sensorDataDao.getSensorData({}); // ✅ Use `await` instead of callback
        return { error: false, data: result, message: null };
    } catch (err) {
        throw new Error("Error retrieving sensor data: " + err.message);
    }
};



// module.exports.updateBatteryView = (id, data, callback) => {
//     dao.updateBatteryView(id, data, function (err, result) {
//         if (err) {
//             callback(err);
//         } else {
//             callback(null, { error: false, data: result, message: "Updated Successfully" })
//         }
//     });

// };

module.exports.deleteSensorData = async (filter) => {
    try {
        return await sensorDataDao.deleteSensorData(filter); // ✅ No callbacks
    } catch (err) {
        throw new Error("Error in service layer: " + err.message);
    }
};


module.exports.filterSensorData = (data, callback) => {
    sensorDataDao.filterSensorData(data, function (err, result) {
        if (err) {
            callback(err)
        }
        else {
            callback(null, ({ error: false, data: result, message: null }))
        }
    })
}


module.exports.deleteOldSensorData = async () => {
    try {
        return await sensorDataDao.deleteOldSensorData();
    } catch (err) {
        throw new Error("Error in service layer: " + err.message);
    }
};
