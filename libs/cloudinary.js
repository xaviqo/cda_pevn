const cloudinary = require('cloudinary');


cloudinary.config({
    //reconfigurar con variables de entorno
    cloud_name: 'xaviqo',
    api_key: '454356868378879',
    api_secret: 'Uik2ikc0KpU2hLpfy3esQRk_TY4',
});

module.exports = async (file) => {
    try {
        const res = await cloudinary.uploader.upload(file);
        return res.secure_url;
    } catch (error) {
        return error;
    }
}