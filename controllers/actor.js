import pool from '../db/keys';

const actor = {};

actor.create = async (req, res) => {
    const {
        nombre, fecha_edad, estatura,
        cabello, ojos,
        premios, habilidades, sexo,
        experiencia, formacion,
    } = req.body;

    await pool.query('INSERT INTO actor (nombre,fecha_edad,estatura,cabello,ojos,premios,habilidades,sexo,experiencia,formacion) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)', [nombre, fecha_edad, estatura, cabello, ojos, premios, habilidades, sexo, experiencia, formacion]);

    let actor = req.body;
    actor.id = await (await pool.query('SELECT max(id) FROM actor')).rows[0].max;


    res.status(200).json({
        message: 'Registro de ' + nombre + ' añadido',
        actor
    });

    try {

    } catch (error) {
        res.status(500).json({
            message: 'Ha ocurrido un error',
            error
        });
    }
}

actor.read = async (req, res) => {
    const id = req.params.id_a;

    try {
        const actor = await (await pool.query('SELECT * FROM actor WHERE id=$1', [id])).rows[0];

        if (actor.premios !== null) {
            actor.premiosJson = jsonizer(pullGroups(actor.premios));
        }

        if (actor.experiencia !== null) {
            actor.experienciaJson = jsonizer(pullGroups(actor.experiencia));
        }

        if (actor.formacion !== null) {
            actor.formacionJson = jsonizer(pullGroups(actor.formacion));
        }
        res.status(200).json({ actor });

    } catch (error) {
        res.status(500).json({
            message: 'An error has ocurred',
            error
        });
    }
}

actor.readAll = async (req, res) => {
    const w = 300;
    const h = 200;
    let allActors = [{}];
    let count = 0;

    try {
        let query = await (await pool.query('SELECT a.id, a.nombre, f.uri_foto, f.mostrar FROM actor a LEFT JOIN foto f ON a.id = f.id_actor WHERE mostrar = TRUE AND img_principal = true ')).rows;

        query.forEach(actor => {
            allActors[count] = actor;
            allActors[count].url = actorUrlName(actor.nombre);
            count++;
        });

        for (let i = 0; i < allActors.length; i++) {
            if (allActors[i].uri_foto == null) {
                allActors[i].mainImg = null
            } else {
                allActors[i].mainImg = 'https://res.cloudinary.com/xaviqo/image/upload/w_' + w + ',h_' + h + ',c_fill,g_faces/' + getFilenameFromUrl(allActors[i].uri_foto);

            }
        }

        res.status(200).json({
            allActors
        });
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
        nombre, fecha_edad, estatura,
        cabello, ojos,
        premios, habilidades, sexo, experiencia, formacion
    } = req.body;
    try {
        await pool.query('UPDATE actor SET nombre=$1, fecha_edad=$2, estatura=$3, cabello=$4, ojos=$5, premios=$6, habilidades=$7, sexo=$8, experiencia=$9, formacion=$10 WHERE id=$11', [nombre, fecha_edad, estatura,
            cabello, ojos,
            premios, habilidades, sexo, experiencia, formacion, id]);
        res.status(200).json({
            message: 'Registro de ' + nombre + ' editado',

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
        await pool.query('DELETE FROM idioma WHERE id_actor = $1', [id]);
        await pool.query('DELETE FROM foto WHERE id_actor=$1', [id]);
        await pool.query('DELETE FROM rrss WHERE id_actor=$1', [id]);
        await pool.query('DELETE FROM actor WHERE id=$1', [id]);
        res.status(200).json({
            message: 'Actor eliminado de la base de datos',
        });
    } catch (error) {
        res.status(500).json({
            message: 'An error has ocurred',
            error
        })
    }
}

function getFilenameFromUrl(url) {
    const pathname = new URL(url).pathname;
    const index = pathname.lastIndexOf('/');
    return (-1 !== index) ? pathname.substring(index + 1) : pathname;
}

function actorUrlName(name) {
    let result = name.trim().toLowerCase().split(' ').join('-');
    return result;
}

function pullGroups(str) {

    let desharped = [];
    let arr = [];
    let count = 0;

    desharped = str.split('#');
    desharped.shift();

    desharped.forEach(line => {

        let obj = {
            type: false,
            text: ''
        };

        if (count % 2 == 0) {
            obj.type = true;
            obj.text = line.trim();
        } else {
            obj.type = false;
            obj.text = line;
        }

        count++;
        arr.push(obj)

    });

    return arr;
}


function jsonizer(str) {

    let arr = [];

    str.forEach(line => {

        if (!line.type) {

            let toProcess = line.text.split(/(?:\r\n|\r|\n)/g).filter(e => e.length > 1);

            toProcess.forEach((e) => {

                let obj = {
                    type: false,
                    date: '',
                    text: ''
                };

                let data = e.split('*').filter(e => e.length > 1);

                obj.date = data[0];
                obj.text = data[1];

                arr.push(obj);

            });


        } else {
            arr.push(line)
        }

    });

    console.log(arr);
    return arr;

}

module.exports = actor;
