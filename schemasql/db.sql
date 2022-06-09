CREATE TABLE actor (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR NOT NULL,
    fecha_edad DATE NOT NULL,
    sexo CHAR(1) NOT NULL,
    estatura NUMERIC,
    cabello VARCHAR,
    ojos VARCHAR,
    idioma VARCHAR,
    premios VARCHAR,
    habilidades VARCHAR,
    formacion VARCHAR,
    experiencia VARCHAR,
    CHECK (sexo in ('m','f'))
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
    uri_video VARCHAR NOT NULL
);

CREATE TABLE rrss (
    id SERIAL PRIMARY KEY,
    id_actor INTEGER REFERENCES actor(id) NOT NULL,
    link VARCHAR NOT NULL
);

CREATE TABLE admin (
    id SERIAL PRIMARY KEY,
    admin_usr VARCHAR NOT NULL,
    admin_pass VARCHAR NOT NULL
);
