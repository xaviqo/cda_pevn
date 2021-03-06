CREATE TABLE actor (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR NOT NULL,
    fecha_edad VARCHAR NOT NULL,
    sexo CHAR(1) NOT NULL,
    estatura NUMERIC,
    cabello VARCHAR,
    ojos VARCHAR,
    premios VARCHAR,
    habilidades VARCHAR,
    formacion VARCHAR,
    experiencia VARCHAR,
    CHECK (sexo in ('m','f'))
);

CREATE TABLE idioma (
    id SERIAL PRIMARY KEY,
    id_actor INTEGER REFERENCES actor(id) NOT NULL,
    idioma VARCHAR NOT NULL,
    bar SMALLINT NOT NULL,
    mostrar BOOLEAN DEFAULT TRUE
);


CREATE TABLE foto (
    id SERIAL PRIMARY KEY,
    id_actor INTEGER REFERENCES actor(id) NOT NULL,
    uri_foto VARCHAR NOT NULL,
    img_principal BOOLEAN DEFAULT FALSE,
    mostrar BOOLEAN DEFAULT TRUE
);

CREATE TABLE video (
    id SERIAL PRIMARY KEY,
    id_actor INTEGER REFERENCES actor(id) NOT NULL,
    descripcion VARCHAR,
    uri_video VARCHAR NOT NULL
);

CREATE TABLE rrss (
    id_actor INTEGER REFERENCES actor(id) NOT NULL,
    tw VARCHAR,
    fb VARCHAR,
    yt VARCHAR,
    ig VARCHAR
);


CREATE TABLE admin (
    id SERIAL PRIMARY KEY,
    admin_usr VARCHAR NOT NULL,
    admin_pass VARCHAR NOT NULL
);
