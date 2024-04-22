const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
const checkIfDate = (value) => {
    return (dateRegex.test(value));
}

function convertToUnixAndUTC(timeString) {
    // Create a new Date object with the given time string
    const date = new Date(timeString);

    // Get the Unix time (milliseconds since January 1, 1970)
    const unixTime = date.getTime();

    // Get the UTC time string
    const utcTime = date.toUTCString();

    return {
        unixTime: unixTime,
        utcTime: utcTime
    };
}

function isValidDate(value) {
    // Attempt to create a new Date object from the given date string
    const date = new Date(value);

    // Check if the created date object is valid
    // Date.parse() returns NaN for invalid dates
    return !isNaN(date.getTime());
}



module.exports = { checkIfDate, convertToUnixAndUTC };