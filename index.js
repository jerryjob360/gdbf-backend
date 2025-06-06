const express = require('express');
const app = express();
const cors = require("cors");

const path = require("path");
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors({
    origin: (origin, callback) => {
        const allowedOrigins = [
            // 'https://gdbf-frontend-cahpskhk5-jerry-jobs-projects.vercel.app',
            'https://gdbf.or.tz',
            'https://www.gdbf.or.tz'
            // // 'https://gdbf-frontend.vercel.app'
            // 'https://gdbf-frontend-c4yp39b47-jerry-jobs-projects.vercel.app',
            // 'https://gdbf-frontend-c4yp39b47-jerry-jobs-projects.vercel.app'
            // 'https://gdbf-frontend-g4cdgiqah-jerry-jobs-projects.vercel.app'
        ];
        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        } else {
            return callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));

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

app.use('/uploads', express.static(path.join(__dirname,  'uploads')));

db.sequelize.sync().then(() => {     //The 'alter: true' should be removed during production.
    app.listen(PORT, () => {
        console.log(`🚀 Server running on port ${PORT}`);
    });
});