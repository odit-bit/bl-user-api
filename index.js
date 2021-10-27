const express = require("express");
const process = require("process");

const app = express();
const port = process.env.NODE_PORT;

//middleware
app.use(express.json({ limit: "10mb" }));

//Import Routes
const UserRoutes = require("./routes/user");

//setup routes
app.use("/api/user", UserRoutes);

//start the server
app.listen(port, () => {
  console.log(`listening on port  ${port}`);
});
