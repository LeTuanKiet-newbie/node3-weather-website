const request = require("request");

const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoibmVhcmx5b3AiLCJhIjoiY2t6emxreXh3MGI4MTNibWw1cWNyYzZyNyJ9.fMmWrnbqeqg5U2iyJZrqTQ&limit=1";

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to the location service", undefined);
    } else if (!body.features[0]) {
      callback("Unable to find location. Try another search", undefined);
    } else {
      callback(undefined, {
        lattitude: body.features[0].center[1],
        longtitude: body.features[0].center[0],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
