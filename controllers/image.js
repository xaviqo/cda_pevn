import pool from '../db/keys'

const image = {};

image.create = async (req, res) => {
    const id = req.params.id_a;
    console.log(req.files);
}

module.exports = image;