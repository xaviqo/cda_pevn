CREATE DATABASE cdadb;

CREATE TABLE actor {
    id SERIAL PRIMARY KEY,
    nombre VARCHAR NOT NULL,
    fecha_edad DATE NOT NULL,
    estatura NUMERIC,
    cabello VARCHAR,
    ojos VARCHAR,
    idioma VARCHAR,
    premios VARCHAR,
    habilidades VARCHAR
}

CREATE TABLE idioma {
    id_actor INTEGER REFERENCES actor(id) NOT NULL,
    idioma STRING NOT NULL,
    porcentaje SMALLINT DEFAULT 0
}

CREATE TABLE foto {
    id_actor INTEGER REFERENCES actor(id) NOT NULL,
    uri_foto VARCHAR NOT NULL
}

CREATE TABLE formacion {
    id_actor INTEGER REFERENCES actor(id) NOT NULL,
    fecha VARCHAR,
    formacion VARCHAR NOT NULL
}

CREATE TABLE experiencia {
    id_actor INTEGER REFERENCES actor(id) NOT NULL,
    fecha VARCHAR,
    experiencia VARCHAR NOT NULL
}

CREATE TABLE video {
    id_actor INTEGER REFERENCES actor(id) NOT NULL,
    uri_video VARCHAR NOT NULL
}

CREATE TABLE rrss {
    id_actor INTEGER REFERENCES actor(id) NOT NULL,
    link VARCHAR NOT NULL
}

CREATE TABLE admin {
    id SERIAL PRIMARY KEY,
    user VARCHAR NOT NULL,
    pass VARCHAR NOT NULL
}