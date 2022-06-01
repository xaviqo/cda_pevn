import pool from '../db/keys'

const social = {};

social.create = async (req, res) => {
    const id = req.params.id_a
    const { link } = req.body;
    try {
        await pool.query('INSERT INTO rrss (id_actor,link) VALUES ($1,$2)', [id, link]);
        res.status(200).json({
            message: 'Link added successfully'
        });
    } catch (error) {
        res.status(500).json({
            message: 'An error has ocurred',
            error
        });
    }
}

module.exports = social;