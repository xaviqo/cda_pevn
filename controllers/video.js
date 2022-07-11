const pool = require('../db/keys');

const video = {};

video.get = async (req, res) => {
    const id = req.params.id_a;

    try {

        const vids = await (await pool.query('SELECT * FROM video WHERE id_actor=$1', [id])).rows;

        for (let i = 0; i < vids.length; i++) {
            vids[i].img = ytImg(vids[i].uri_video);
        }

        res.status(200).json({ vids });
    } catch (error) {
        res.status(500).json({
            message: 'An error has ocurred',
            error
        });
    }
}

video.save = async (req, res) => {
    const {id_actor,descripcion,url} = req.body;
    await pool.query('INSERT INTO video(id_actor,descripcion,uri_video) VALUES($1,$2,$3)', [id_actor,descripcion,url]);

    try { 
        res.status(200).json({ message: 'Video guardado correctamente' });
    } catch (error) {
        res.status(500).json({
            message: 'An error has ocurred',
            error
        });
    }
}

video.getOne = async (req, res) => {
    const id = req.params.id_a;

    try {

        const vid = await (await pool.query('SELECT * FROM video WHERE id=$1', [id])).rows[0];

        res.status(200).json({ vid });
    } catch (error) {
        res.status(500).json({
            message: 'An error has ocurred',
            error
        });
    }
}

video.delete = async (req, res) => {
    const id = req.params.id_v;

    try {

        const vid = await (await pool.query('DELETE FROM video WHERE id=$1', [id])).rows[0];

        res.status(200).json({ message: 'Vídeo borrado correctamente' });
    } catch (error) {
        res.status(500).json({
            message: 'An error has ocurred',
            error
        });
    }
}

function ytImg(urlVid) {
    let ID=(urlVid.split("v=")[1].substring(0,11));
    return "https://img.youtube.com/vi/"+ID+"/maxresdefault.jpg";
}

module.exports = video;
