import pool from '../db/keys'
import cloudinary from '../libs/cloudinary';

const image = {};

//TODO: GESTIONAR IMAGEN PRINCIPAL Y SHOW IMG

image.create = async (req, res) => {
    const id = req.params.id_a;
    const file = await cloudinary(req.files.actor_img.tempFilePath);
    try {
        await pool.query('INSERT INTO foto (id_actor,uri_foto) VALUES($1,$2)', [id, file]);
        res.status(200).json({
            message: 'Image uploaded successfully',
            img: { file }
        });
    } catch (error) {
        res.status(500).json({
            message: 'An error ocurred',
            error
        });
    }
}

image.readFromActor = async (req, res) => {
    const id = req.params.id_a;
    try {
        const img = await (await pool.query('SELECT id, uri_foto, img_principal, mostrar FROM foto WHERE id_actor=$1', [id])).rows;
        res.status(200).json({ img });
    } catch (error) {
        res.status(500).json({
            message: 'An error ocurred',
            error
        });
    }
}

image.mainImg = async (req, res) => {
    try {
        const mainImg = await (await pool.query('SELECT uri_foto FROM foto WHERE id_actor=$1 AND img_principal=true', [id])).rows[0];
        //USAMOS LA API DE CLOUDINARY PARA CROPEAR LA IMAGEN Y USAR EL FACE DETECTOR, LE PASAMOS LA FUNCION PARA RECORTAR EL NOMBRE DE LA URI
        let cloudinaryImg = 'https://res.cloudinary.com/xaviqo/image/upload/w_'+w+',h_'+h+',c_fill,g_faces/'+getFilenameFromUrl(mainImg.uri_foto);
        res.status(200).json({
            cloudinaryImg
        });
    } catch (error) {
        res.status(500).json({
            message: 'An error ocurred',
            error
        });
    }
}

//FUNCION PARA OBTENER NOMBRE DE ARCHIVO

function getFilenameFromUrl(url) {
    const pathname = new URL(url).pathname;
    const index = pathname.lastIndexOf('/');
    return (-1 !== index) ? pathname.substring(index + 1) : pathname;
}

module.exports = image;