import pool from '../db/keys';

const actor = {};

actor.create = async (req, res) => {
    const {
        a_nombre, a_fecha_edad, a_estatura, 
        a_cabello, a_ojos, a_idioma, 
        a_premios, a_habilidades, a_sexo,
    } = req.body;
    try {
        await pool.query('INSERT INTO actor (nombre,fecha_edad,estatura,cabello,ojos,idioma,premios,habilidades,sexo) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)', [a_nombre, a_fecha_edad, a_estatura, 
        a_cabello, a_ojos, a_idioma, 
        a_premios, a_habilidades, a_sexo]);
        res.status(200).json({
            message: 'Actor created successfully'
        });
    } catch (error) {
        res.status(500).json({
            message: 'An error has ocurred',
            error
        });
    }
}

actor.read = async (req, res) => {
    const id = req.params.id_a;
    try {
        const actor = await (await pool.query('SELECT * FROM actor WHERE id=$1',[id])).rows[0];
        res.status(200).json({actor});
    } catch (error) {
        res.status(500).json({
            message: 'An error has ocurred',
            error
        });
    }
}

actor.readAll = async (req, res) => {
    try {
        const allActors = await (await pool.query('SELECT * FROM actor')).rows;
        res.status(200).json({allActors});
    } catch (error) {
        res.status(500).json({
            message: 'An error has ocurred',
            error
        });
    }
}

actor.update = async (req, res) => {
    const id = req.params.id_a;
    const {
        a_nombre, a_fecha_edad, a_estatura, 
        a_cabello, a_ojos, a_idioma, 
        a_premios, a_habilidades, a_sexo
    } = req.body;
    try {
        await pool.query('UPDATE actor nombre=$1, fecha_edad=$2, estatura=$3, cabello=$4, ojos=$5, idioma=$6, premios=$7, habilidades=$8, sexo=$9 WHERE id=$10', [a_nombre, a_fecha_edad, a_estatura, 
        a_cabello, a_ojos, a_idioma, 
        a_premios, a_habilidades, a_sexo, id]);
        res.status(200).json({
            message: 'Actor updated successfully',

        });
    } catch (error) {
        res.status(500).json({
            message: 'An error has ocurred',
            error
        });
    }
}

actor.delete = async (req, res) => {
    const id = req.params.id_a;
    try {
        await pool.query('DELETE FROM actor WHERE id=$1', [id]);
        res.status(200).json({
            message: 'Actor deleted from database',
        });
    } catch (error) {
        res.status(500).json({
            message: 'An error has ocurred',
            error
        })
    }
}

module.exports = actor;