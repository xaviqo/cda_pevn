import pool from '../db/keys'

const social = {};

social.create = async (req, res) => {
    const { id_actor,tw,fb,yt,ig } = req.body;
    console.log(req.body);
    try {
        await pool.query('INSERT INTO rrss (id_actor,tw,fb,yt,ig) VALUES ($1,$2,$3,$4,$5)', [id_actor,tw,fb,yt,ig]);
        res.status(200).json({
            message: 'Redes actualizadas correctamente'
        });
    } catch (error) {
        res.status(500).json({
            message: 'An error has ocurred',
            error
        });
    }
}

social.load = async (req, res) => {
    const id_actor = req.params.id_a;
    try {
        const rrss = await (await pool.query('SELECT * FROM rrss WHERE id_actor=$1', [id_actor])).rows[0];
        res.status(200).json({
            rrss
        });
    } catch (error) {
        res.status(500).json({
            message: 'An error has ocurred',
            error
        });
    }
}

social.update = async (req, res) => {
    const { id_actor,tw,fb,yt,ig } = req.body;
    console.log(req.body);
    try {
        await pool.query('UPDATE rrss SET tw=$1, fb=$2, yt=$3, ig=$4 WHERE id_actor=$5', [tw,fb,yt,ig,id_actor]);
        res.status(200).json({
            message: 'Redes actualizadas correctamente',

        });
    } catch (error) {
        res.status(500).json({
            message: 'An error has ocurred',
            error
        });
    }
}

module.exports = social;