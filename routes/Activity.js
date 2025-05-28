const express = require('express');
const router = express.Router();
const { Activity } = require('../models');
const { validateToken } = require('../middleware/AuthMiddleware');
const multer = require('multer');
const path = require('path');


// Multer config...
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');           //save files to the uploads folder in server root folder.
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });


router.get('/', async (req, res) => {
    const listOfActivities = await Activity.findAll();
    res.json(listOfActivities);
});

router.post("/", upload.single('image'), validateToken,  async (req, res) => {
    try {
        const { title, body } = req.body;
        const image = req.file ? req.file.filename : null;

        const activity = await Activity.create({ title, body, image });
        res.json(activity);
    }
    catch (err){
        res.status(500).json({ error: 'Failed to create activity' })
    }
});

router.delete("/:id", async (req, res) => {
    const id = req.params.id;
    await Activity.destroy({ where: { id: id } });
    res.json("Deleted");
});

router.put("/:id", upload.single('image'), async (req, res) => {
    try {
        const { title, body } = req.body;
        const activityId = req.params.id;

        const updatedFields = { title, body };
        
        const imagePath = req.file ? `${req.file.filename}` : null;

        if (imagePath) {
            updatedFields.image = imagePath;
        }


        const [updatedRows] = await Activity.update(updatedFields, {
            where: { id: activityId}
        });

        if (updatedFields === 0){
            return res.status(404).json({ message: 'Activity not found or not updated.' });
        }


        // await Activity.update(updatedFields, { where: { id: id } });
        res.json({ message: "Updated", updatedFields});
    }
    catch (error) {
        console.error('Error updating event: ', error);
        res.status(500).json({message: 'Internal Server Error', error});
    }
    
});

module.exports = router;