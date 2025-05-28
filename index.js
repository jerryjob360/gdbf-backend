const express = require('express');
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000' }));

const db = require('./models');
// db.sequelize.sync({ force:true });

//Routers
const adminRouter = require('./routes/Admins');
app.use("/auth", adminRouter);

const adminLogin = require('./routes/Admins');
app.use("/auth/login", adminLogin);

const activityRouter = require('./routes/Activity');
const { FORCE } = require('sequelize/lib/index-hints');
app.use("/activity", activityRouter);

app.use('/uploads', express.static('uploads'));

db.sequelize.sync().then(() => {     //The 'alter: true' should be removed during production.
    app.listen(3001, () => {
        console.log("Server running on port 3001");
    });
});