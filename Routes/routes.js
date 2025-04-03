const express = require("express");
const apiRoutes = express.Router();


const socController = require("../Controller/batteryViewController");

// State of Charge

apiRoutes.post("/batteryview", socController.postSensorData);
apiRoutes.get("/batteryview", socController.getSensorData);
// apiRoutes.put("/batteryview/:id", socController.updateBatteryView);
apiRoutes.delete("/batteryview/:id", socController.deleteSensorData);
apiRoutes.post("/batteryviewfilter", socController.filterSensorData);
apiRoutes.delete("/batteryold", socController.deleteOldSensorData)

apiRoutes.get("/latestbatteryview", socController.getLatestSensorData)



module.exports = apiRoutes;
