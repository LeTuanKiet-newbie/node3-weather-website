const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("views", viewPath);
// this is the way to use hbs npm
app.set("view engine", "hbs");
hbs.registerPartials(partialsPath);

// app.use() : it's a way to customize the server
// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

// using index.hbs
app.get("", (req, res) => {
  // render allow to render it views
  //first argumment just need to match the name of the view file and the second argument is an object you want that view to be able to access
  res.render("index", {
    title: "Weather App",
    name: "Andrew Mead",
  });
});

// about
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Andrew Mead",
  });
});

// help views
app.get("/help", (req, res) => {
  res.render("help", {
    helpText: "This is some helpful text",
    title: "Help",
    name: "Kiet",
  });
});
// owning app.com domain

// dung de lay 1 cai gi do khi tru cap vao 1 route cu the

//weather route
app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You need to provide a location",
    });
  }

  geocode(
    req.query.address,
    (error, { lattitude, longtitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }
      forecast(lattitude, longtitude, (error, response) => {
        if (error) {
          return res.send({ error });
        }
        res.send({
          location: location,
          descripte: response,
        });
      });
    }
  );
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }

  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: 404,
    message: "Help article not found",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: 404,
    message: "Page not found",
  });
});

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
// adding this comment to see if my theory is correct
