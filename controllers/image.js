import pool from '../db/keys'
import cloudinary from '../libs/cloudinary';

const image = {};

//TODO: GESTIONAR IMAGEN PRINCIPAL Y SHOW IMG

image.create = async (req, res) => {
    const id = req.params.id_a;
    const file = await cloudinary(req.files.actor_img.tempFilePath);
    try {
        await pool.query('INSERT INTO foto (id_actor,uri_foto) VALUES($1,$2)',[id,file]);
        res.status(200).json({
            message: 'Image uploaded successfully',
            img: {file}
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
        const img = await (await pool.query('SELECT id, uri_foto FROM foto WHERE id_actor=$1',[id])).rows;
        res.status(200).json({img});
    } catch (error) {
        res.status(500).json({
            message: 'An error ocurred',
            error
        });
    }
}

module.exports = image;