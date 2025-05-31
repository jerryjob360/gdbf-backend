const express = require('express');
const router = express.Router();
const { Activity } = require('../models');
const { validateToken } = require('../middleware/AuthMiddleware');
const multer = require('multer');
const path = require('path');
const { storage } = require('../cloudinaryConfig');
const upload = multer({ storage });


// Multer config...
// const storage = require('../cloudinaryConfig');
// const upload = multer({ storage });


router.get('/', async (req, res) => {
    const listOfActivities = await Activity.findAll();
    res.json(listOfActivities);
});

router.post("/", upload.single('image'), validateToken,  async (req, res) => {
    try {
        const { title, body } = req.body;
        const image = req.file.path;

        const newActivity = await Activity.create({ 
            title,
            body,
            image,
        });
        res.status(200).json(newActivity);
    }
    catch (err){
        res.status(500).json({ error: 'Upload failed.' })
    }
    console.log(req.file);
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
        
        const imagePath = req.file ? req.file.path : null;

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