import pool from '../db/keys';

const formation = {};

formation.create = async (req, res) => {
    const id = req.params.id_a;
    const { date, form } = req.body;
    try {
        await pool.query('INSERT INTO formacion (id_actor,fecha,formacion) VALUES(id_actor,fecha,formacion) VALUES ($1,$2,$3)', [id, date, form]);
        res.status(200).json({
            message: 'Formation added successfully'
        });
    } catch (error) {
        res.status(500).json({
            message: 'An error has ocurred',
            error
        });
    }
}

formation.readFromActor = async (req, res) => {
    const id = req.params.id_a;
    const { date, form } = req.body;
    try {
        const formations = await (await pool.query('SELECT * FROM formacion WHERE id_actor=$1', [id])).rows;
        res.status(200).json({formations});
    } catch (error) {
        res.status(500).json({
            message: 'An error has ocurred',
            error
        });
    }
}

formation.update = async (req, res) => {
    const id = req.params.id_frm;
    const { date, form } = req.body;
    try {
        await pool.query('UPDATE formacion SET fecha=$1, formacion=$2 WHERE id=$3', [date, form, id]);
        res.status(200).json({
            message: 'Formation updated successfully'
        });
    } catch (error) {
        res.status(500).json({
            message: 'An error has ocurred',
            error
        });
    }
}

formation.delete = async (req, res) => {
    const id = req.params.id_frm;
    try {
        await pool.query('DELETE FROM formacion WHERE id=$1', [id]);
        res.status(200).json({
            message: 'Formation deleted from database',
        });
    } catch (error) {
        res.status(500).json({
            message: 'An error has ocurred',
            error
        })
    }
}

module.exports = formation;

