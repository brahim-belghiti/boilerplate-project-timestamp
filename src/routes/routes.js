const express = require('express');
const router = express.Router();
const { checkIfDate, isValidDate, convertToUnixAndUTC } = require('../utils/helpers');

router.get("/:clientvalue", function (req, res) {
    const clientvalue = req.params.clientvalue;
    if (!checkIfDate(clientvalue) && isNaN(clientvalue) && !isValidDate(clientvalue)) {
        res.send({ "error": "Invalid Date" })
    }

    if (!isNaN(clientvalue)) {
        const timestamp = parseInt(clientvalue);
        const minTimestamp = -8640000000000000; // Minimum representable timestamp
        const maxTimestamp = 8640000000000000; // Maximum representable timestamp
        if (timestamp < minTimestamp || timestamp > maxTimestamp) {
            return false;
        }
        const utcDate = new Date(timestamp).toUTCString();
        const responseObject = {
            unix: timestamp,
            utc: utcDate
        };
        res.json(responseObject);
        return;
    }

    let formatedDate = convertToUnixAndUTC(clientvalue);
    const responseObject = {
        unix: formatedDate.unixTime,
        utc: formatedDate.utcTime
    };
    res.json(responseObject);
});

router.get("/", function (req, res) {
    const timeNow = Date.now();
    let formatedDate = convertToUnixAndUTC(timeNow);
    const responseObject = {
        unix: formatedDate.unixTime,
        utc: formatedDate.utcTime
    };
    res.json(responseObject);
});


module.exports = router;
