require("dotenv").config();
const db = require("./database/connection.js");
const express = require("express");
const cors = require("cors");
const init = require("./database/init.js");
const app = express();
const protect = require("./middlewares/authMiddleware");
const schoolRoute = require("./routes/schoolRoutes.js");
const userRoute = require("./routes/userRoutes.js");
const roleRoute = require("./routes/roleRoutes.js");
const taskRoute = require("./routes/taskRoutes.js");
const classRoute = require("./routes/classRoutes.js");
const taskassignRoute = require("./routes/taskassignRoutes.js");
const tasksolutionRoute = require("./routes/TaskSolutionRoutes.js");
const commentRoute = require("./routes/commentRoutes.js");
const awardRoute = require("./routes/awardRoutes.js");
const assignAwardRoute = require("./routes/AwardAssignRoutes.js");

app.use(express.json());
app.use(cors());

app.use("/api", schoolRoute);
app.use("/api", userRoute);
app.use("/api", roleRoute);
app.use("/api", taskRoute);
app.use("/api", classRoute);
app.use("/api", taskassignRoute);
app.use("/api", tasksolutionRoute);
app.use("/api", commentRoute);
app.use("/api", awardRoute);
app.use("/api", assignAwardRoute);

db.sync().then(() => {
  app.listen(process.env.PORT, () =>
    console.log(`PORT runs on ${process.env.PORT}`)
  );
});
