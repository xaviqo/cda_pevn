import pool from '../db/keys';

const actor = {};

actor.create = async (req, res) => {
    const {
        nombre, fecha_edad, estatura,
        cabello, ojos, idioma,
        premios, habilidades, sexo,
        experiencia, formacion,
    } = req.body;
    await pool.query('INSERT INTO actor (nombre,fecha_edad,estatura,cabello,ojos,idioma,premios,habilidades,sexo,experiencia,formacion) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)', [nombre, fecha_edad, estatura,
        cabello, ojos, idioma,
        premios, habilidades, sexo, experiencia, formacion]);
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
    const actor = await (await pool.query('SELECT * FROM actor WHERE id=$1', [id])).rows[0];
    actor.premiosHtml = [];
    actor.formacionHtml = [];
    actor.experienciaHtml = [];
    actor.premiosHtml = parteToHtml(actor.premios);
    actor.experienciaHtml = parteToHtml(actor.experiencia);
    actor.formacionHtml = parteToHtml(actor.formacion);
    res.status(200).json({ actor });
    try {

    } catch (error) {
        res.status(500).json({
            message: 'An error has ocurred',
            error
        });
    }
}

actor.readAll = async (req, res) => {
    //TODO: variables como argumento
    const w = 300;
    const h = 200;
    let allActors = [{}];
    let count = 0;

    try {
        let query = await (await pool.query('SELECT a.id, a.nombre, f.uri_foto, f.mostrar FROM actor a LEFT JOIN foto f ON a.id = f.id_actor WHERE mostrar = TRUE AND img_principal = true ')).rows;

        //ATRIBUTO PARA QUE LA URL DE CADA ACTOR TENGA GUIONES EN VEZ DE ESPACIOS
        query.forEach(actor => {
            allActors[count] = actor;
            allActors[count].url = actorUrlName(actor.nombre);
            count++;
        });
        console.log(allActors);

        //USAMOS LA API DE CLOUDINARY PARA CROPEAR LA IMAGEN Y USAR EL FACE DETECTOR, LE PASAMOS LA FUNCION PARA RECORTAR EL NOMBRE DE LA URI
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
        cabello, ojos, idioma,
        premios, habilidades, sexo, experiencia, formacion
    } = req.body;
    try {
        await pool.query('UPDATE actor SET nombre=$1, fecha_edad=$2, estatura=$3, cabello=$4, ojos=$5, idioma=$6, premios=$7, habilidades=$8, sexo=$9, experiencia=$10, formacion=$11 WHERE id=$12', [nombre, fecha_edad, estatura,
            cabello, ojos, idioma,
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
        await pool.query('DELETE FROM foto WHERE id_actor=$1', [id]);
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

//FUNCION PARA OBTENER NOMBRE DE ARCHIVO

function getFilenameFromUrl(url) {
    const pathname = new URL(url).pathname;
    const index = pathname.lastIndexOf('/');
    return (-1 !== index) ? pathname.substring(index + 1) : pathname;
}

//FUNCION PARA ADAPTAR URLS AL PREFIL DEL ACTOR

function actorUrlName(name) {
    let result = name.trim().toLowerCase().split(' ').join('-');
    return result;
}

function parteToHtml(str) {
    let result;
    if (str != null) {
        if (str.length > 1) {
            result = splitDateInfo(convertLines(numeralToBold(str)));
        } else {
            result = null;
        }
    } else {
        result = null;
    }
    return result;
}

function numeralToBold(str) {
    let desharped = str.split('#');
    desharped.shift();
    let arr = []
    for (let i = 0; i < desharped.length; i++) {
        if (i % 2 == 0) {
            arr[i] = "<h3>" + desharped[i] + "</h3>";
        } else {
            arr[i] = desharped[i];
        }
    }
    return arr;
}

function convertLines(str) {
    let arr = [];
    for (let i = 0; i < str.length; i++) {
        if (i % 2 != 0) {
            let aux = str[i].split(/(?:\r\n|\r|\n)/g);
            aux = aux.filter(e => e.length > 1);
            aux.forEach((e) => {
                arr.push(e);
            });
        } else {
            arr.push(str[i]);
        }
    }
    return arr;
}

function splitDateInfo(str) {
    let arr = [];
    for (let i = 0; i < str.length; i++) {
        let aux = str[i].split("*");
        aux = aux.filter(e => e.length > 1);
        aux.forEach((e) => {
            e = e.trim();
            arr.push(e);
        });
    }
    return arr;
}

module.exports = actor;
