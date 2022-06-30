import pool from '../db/keys';

const langs = {};

langs.getLangs = async (req, res) => {
    const id = req.params.id_a;
    try {
        let query = await (await pool.query('SELECT * FROM idioma WHERE id_actor = $1', [id])).rows;
        res.status(200).json({
            query
        });
    } catch (error) {
        res.status(500).json({
            message: 'An error has ocurred',
            error
        })
    }
}

langs.insertLang = async (req, res) => {
    //Aqui ID es el ID del actor
    const { id, idioma, bar } = req.body;
    try {
        await pool.query('INSERT INTO idioma (id_actor,idioma,bar) VALUES ($1,$2,$3)', [id, idioma, bar]);
        res.status(200).json({
            message: 'Idiomas guardados correctamente'
        });
    } catch (error) {
        res.status(500).json({
            message: 'An error has ocurred',
            error
        })
    }
}

langs.updateLang = async (req, res) => {
    //Aqui ID es el ID del idioma
    const { id, idioma, bar } = req.body;
    console.log(id);
    console.log(idioma);
    console.log(bar);
    try {
        await pool.query('UPDATE idioma SET idioma=$1, bar=$2 WHERE id=$3', [idioma, bar, id]);
        res.status(200).json({
            message: 'Idioma borrado correctamente'
        });
    } catch (error) {
        res.status(500).json({
            message: 'An error has ocurred',
            error
        })
    }
}

langs.deleteLang = async (req, res) => {
    const lang = req.params.id_l;
    await pool.query('DELETE FROM idioma WHERE id = $1', [lang]);
    try {
        res.status(200).json({
            message: 'Idioma borrado correctamente'
        });
    } catch (error) {
        res.status(500).json({
            message: 'An error has ocurred',
            error
        })
    }
}

module.exports = langs;
