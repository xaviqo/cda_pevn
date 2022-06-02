import cloudinary from 'cloudinary';

cloudinary.config({
    //reconfigurar con variables de entorno
    cloud_name: 'xaviqo',
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SEC
});

module.exports = async (file) => {
    try {
        const res = await cloudinary.uploader.upload(file);
        return res.secure_url;
    } catch (error) {
        return error;
    }
}