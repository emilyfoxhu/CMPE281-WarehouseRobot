const app = require('./app');

const login = require("./routes/login");
const signup = require("./routes/signup");
const profile = require("./routes/profile");
const images = require("./routes/images");
const userdashboard = require("./routes/userdashboard");
const admindashboard = require("./routes/admindashboard");

app.use("/login", login);
app.use("/signup", signup);
app.use("/profile", profile);
app.use("/images", images);
app.use("/userdashboard", userdashboard);
app.use("/admindashboard", admindashboard);

const port = process.env.PORT || 3001;
var server = app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

module.exports = app;