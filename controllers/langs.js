import pool from '../db/keys'

const language = {};

function checkPercent(percent) {
    
    if (percent > 100 || percent < 0 || isNaN(percent)) {
        percent = 0;
    }

    return percent;
}

language.create = async (req, res) => {
    const id = req.params.id_a;
    const { lang, percent } = req.body;
    percent = checkPercent(percent);
    try {
        await pool.query('INSERT INTO idioma (id_actor,idioma,porcentaje) VALUES ($1,$2,$3)', [id, lang, percent]);
        res.status(200).json({
            message: 'Language added successfully'
        });
    } catch (error) {
        res.status(500).json({
            message: 'An error has ocurred',
            error
        });
    }

}

language.readFromActor = async (req, res) => {
    const id = req.params.id_a;
    try {
        const langs = await (await pool.query('SELECT * FROM idioma WHERE id_actor=$1', [id])).rows;
        res.status(200).json({ langs });
    } catch (error) {
        res.status(500).json({
            message: 'An error has ocurred',
            error
        });
    }
}

language.update = async (req, res) => {
    const id = req.params.id_lng;
    const { lang, percent } = req.body;
    try {
        await pool.query('UPDATE idioma SET idioma=$1, porcentaje=$2 WHERE id=$3', [lang, percent, id]);
        res.status(200).json({
            message: 'Language updated successfully'
        });
    } catch (error) {
        res.status(500).json({
            message: 'An error has ocurred',
            error
        });
    }
}

language.delete = async (req, res) => {
    const id = req.params.id_lng;
    try {
        await pool.query('DELETE FROM idioma WHERE id=$1', [id]);
        res.status(200).json({
            message: 'Language deleted from database'
        });
    } catch (error) {
        res.status(500).json({
            message: 'An error has ocurred',
            error
        });
    }
}