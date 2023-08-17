
create DATABASE TiendaFacturacion ;


create table tblrol (

    id serial PRIMARY key,
    id_rol INTEGER PRIMARY KEY,
    nombre varchar(100), activo BOOLEAN DEFAULT true,
    fecha_borra TIMESTAMP,
);


create table tbl_usuario (

    correo_electronico varchar(80) primary key, 
    nombre varchar(100), 
   activo BOOLEAN DEFAULT true,
    fecha_borra TIMESTAMP,
    id_rol int INTEGER,
    constraint id_rol foreign key (id_rol) references tbl_rol(id) 

);

create table tbl_continente(
    id SERIAl PRIMARY KEY,
    id_continente int INTEGER PRIMARY KEY,
    nombre_continente VARCHAR(200), 
        constraint id_continente Foreign Key (id_continente) REFERENCES tbl_pais(id) 
        );

create table tbl_pais(
    id SERIAl PRIMARY KEY,
    id_pais int INTEGER PRIMARY KEY,
    nombre_pais VARCHAR(200), 
    id_continente int INTEGER,
        constraint id_pais Foreign Key (id_pais) REFERENCES tbl_direcciones(id)
        constraint id_continente Foreign Key (id_continente) REFERENCES tbl_pais(id) 
        );



create table tbl_cuidad(
    id SERIAl PRIMARY KEY,
    id_cuidad int INTEGER PRIMARY KEY,
    nombre_cuidad VARCHAR(200), 
    id_pais int INTEGER,
        constraint id_cuidad Foreign Key (id_cuidad) REFERENCES tbl_direcciones(id),
                constraint id_pais Foreign Key (id_pais) REFERENCES tbl_direcciones(id)

        );


create table tbl_direcciones (

    id serial primary key, 
    id_pais INT PRIMARY KEY
    id_cuidad INT PRIMARY KEY
    direccion varchar(50), ,
    descripcion varchar(50), 
    activo BOOLEAN DEFAULT true,
    fecha_borra TIMESTAMP
    correo_electronico varchar(100), 
    constraint correo_electronico Foreign Key (correo_electronico) REFERENCES tbl_usuario(correo_electronico)
    );