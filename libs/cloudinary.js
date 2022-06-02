import cloudinary from 'cloudinary';

cloudinary.config({
    //reconfigurar con variables de entorno
    cloud_name: '',
    api_key: '',
    api_secret: '',
});

module.exports = async (file) => {
    try {
        const res = await cloudinary.uploader.upload(file);
        return res.secure_url;
    } catch (error) {
        return error;
    }
}