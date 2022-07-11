const pool = require('../db/keys');
const cloudinary = require('../libs/cloudinary');

const image = {};

//TODO: GESTIONAR IMAGEN PRINCIPAL Y SHOW IMG

image.create = async (req, res) => {

    try {
        const id = req.params.id_a;
        const file = await cloudinary(req.files.actor_img.tempFilePath);
        await pool.query('INSERT INTO foto (id_actor,uri_foto,img_principal,mostrar) VALUES($1,$2,true,true)', [id, file]);
        res.status(200).json({
            message: 'Imagen subida correctamente',
            img: { file }
        });
    } catch (error) {
        res.status(500).json({
            message: 'Ha ocurrido un error',
            error
        });
    }
}

image.newImg = async (req, res) => {

    try {
        const id = req.params.id_a;
        const file = await cloudinary(req.files.new_img.tempFilePath);
        await pool.query('INSERT INTO foto (id_actor,uri_foto,img_principal,mostrar) VALUES($1,$2,false,true)', [id, file]);
        res.status(200).json({
            message: 'Imagen subida correctamente',
            img: { file }
        });
    } catch (error) {
        res.status(500).json({
            message: 'Ha ocurrido un error',
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
            message: 'Ha ocurrido un error',
            error
        });
    }
}

image.chgMain = async (req, res) => {
    const { actor, image } = req.body;
    try {
        await pool.query('UPDATE foto SET img_principal = false WHERE id_actor = $1',[actor]);
        await pool.query('UPDATE foto SET img_principal = true WHERE id_actor = $1 AND id = $2',[actor,image]);
        res.status(200).json({ message: 'Imagen principal cambiada' });
    } catch (error) {
        res.status(500).json({
            message: 'Ha ocurrido un error',
            error
        }); 
    }
}

image.mainImg = async (req, res) => {
    const id = req.params.id_a;
    const w = req.params.w_a;
    const h = req.params.h_a;
    try {
        const mainImg = await (await pool.query('SELECT uri_foto FROM foto WHERE id_actor=$1 AND img_principal=true', [id])).rows[0];
        //USAMOS LA API DE CLOUDINARY PARA CROPEAR LA IMAGEN Y USAR EL FACE DETECTOR, LE PASAMOS LA FUNCION PARA RECORTAR EL NOMBRE DE LA URI
        let cloudinaryImg = 'https://res.cloudinary.com/xaviqo/image/upload/w_'+w+',h_'+h+',c_fill,g_faces/'+getFilenameFromUrl(mainImg.uri_foto);
        res.status(200).json({
            cloudinaryImg
        });
    } catch (error) {
        res.status(500).json({
            message: 'Ha ocurrido un error',
            error
        });
    }
}

image.remainingImgs = async (req, res) => {
    const id = req.params.id_a;
    const w = req.params.w_a;
    const h = req.params.h_a;
    try {
        const remImgs = await (await pool.query('SELECT uri_foto FROM foto WHERE id_actor=$1 AND img_principal=false', [id])).rows;
        let remainingImgs = remainingToArray(remImgs,w,h);
        res.status(200).json({
            remainingImgs
        });
    } catch (error) {
        res.status(500).json({
            message: 'Ha ocurrido un error',
            error
        });
    }
}

image.delete = async (req, res) => {
    const id = req.params.id_img;
    try {
        await pool.query('DELETE FROM foto WHERE id=$1', [id]);
        res.status(200).json({ message: 'Imagen eliminada' });
    } catch (error) {
        res.status(500).json({
            message: 'Ha ocurrido un error',
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

function remainingToArray(imgs,w,h) {
    let arr = [];
    imgs.forEach(img => {
        arr.push('https://res.cloudinary.com/xaviqo/image/upload/w_'+w+',h_'+h+',c_fill,g_faces/'+getFilenameFromUrl(img.uri_foto));
    });
    return arr;
}

module.exports = image;
