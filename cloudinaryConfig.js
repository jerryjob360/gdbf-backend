const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name: dqswh5cp4,
    api_key: '225431548792421',
    api_secret: '6BHKLVPv7KWf1coUFZ774ITCPhc,'
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'gdbf-uploads',
        allowed_formats: ['jpg', 'png', 'jpeg'],
    },
});

module.exports = { cloudinary, storage };