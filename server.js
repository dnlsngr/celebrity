var express = require("express");
var app = express();
app.use(express.static(__dirname + "/dist"));

app.set("port", process.env.PORT || 8080);
app.listen(app.get("port"), () => {
  console.log("app is running");
});
