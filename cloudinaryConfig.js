const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    // cloud_name: 'dqswh5cp4',
    // api_key: '225431548792421',
    // api_secret: '6BHKLVPv7KWf1coUFZ774ITCPhc,'
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'gdbf-events',
        allowed_formats: ['jpg', 'png', 'jpeg'],
        public_id: (req, file) => Date.now() + '-' + file.originalname,
    },
});

module.exports = { cloudinary, storage };