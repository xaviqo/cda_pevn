import pool from '../db/keys';

const experiencie = {};

experiencie.create = async (req, res) => {
    const id = req.params.id_a;
    const { date, exp } = req.body;
    try {
        await pool.query('INSERT INTO experiencia (id_actor,fecha,experiencia) VALUES ($1,$2,$3)', [id, date, exp]);
        res.status(200).json({
            message: 'Experiencie added successfully'
        });
    } catch (error) {
        res.status(500).json({
            message: 'An error has ocurred',
            error
        });
    }
}

experiencie.readFromActor = async (req, res) => {
    const id = req.params.id_a;
    try {
        const exps = await (await pool.query('SELECT * FROM experiencia WHERE id_actor=$1', [id])).rows;
        res.status(200).json({ exps });
    } catch (error) {
        res.status(500).json({
            message: 'An error has ocurred',
            error
        });
    }
}

experiencie.update = async (req, res) => {
    const id = req.params.id_exp;
    const { date, exp } = req.body;
    try {
        await pool.query('UPDATE experiencia SET fecha=$1, experiencia=$2 WHERE id=$3', [date, exp, id]);
        res.status(200).json({
            message: 'Experiencie updated successfully'
        });
    } catch (error) {
        res.status(500).json({
            message: 'An error has ocurred',
            error
        });
    }
}

experiencie.delete = async (req, res) => {
    const id = req.params.id_exp;
    try {
        await pool.query('DELETE FROM experiencia WHERE id=$1', [id]);
        res.status(200).json({
            message: 'Experiencie deleted from database'
        });
    } catch (error) {
        res.status(500).json({
            message: 'An error has ocurred',
            error
        });
    }
}


module.exports = experiencie;