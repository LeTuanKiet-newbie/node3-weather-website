const request = require("request");

const forecast = (lattitude, longtitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=a0edc1830e52adb83c9320a8accd1895&query=" +
    lattitude +
    "," +
    longtitude +
    "&units=f";
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to the forecast service", undefined);
    } else if (body.error) {
      callback("Unable to find the forecast. Try another location", undefined);
    } else {
      callback(
        undefined,
        `${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} degrees out. It feels like ${body.current.feelslike} degree out` +
          "and the humitidy is " +
          body.current.humidity +
          "% period"
      );
    }
  });
};

module.exports = forecast;
