
create DATABASE TiendaFacturacion ;


create table tblrol (

    id serial PRIMARY key,
    id_rol INTEGER PRIMARY KEY,
    nombre varchar(100),
    activo BOOLEAN DEFAULT true,
    fecha_borra TIMESTAMP,
);


create table tbl_usuario (

    correo_electronico varchar(80) primary key, 
    nombre varchar(100), 
   activo BOOLEAN DEFAULT true,
    fecha_borra TIMESTAMP,
    id_rol int INTEGER,
);

create table tbl_continente(
    id SERIAl PRIMARY KEY,
    id_continente int INTEGER PRIMARY KEY,
    nombre_continente VARCHAR(200), 
        );

create table tbl_pais(
    id SERIAl PRIMARY KEY,
    id_pais int INTEGER PRIMARY KEY,
    nombre_pais VARCHAR(200), 
    id_continente int INTEGER
        );



create table tbl_cuidad(
    id SERIAl PRIMARY KEY,
    id_cuidad int INTEGER PRIMARY KEY,
    nombre_cuidad VARCHAR(200), 
    id_pais int INTEGER
        );


create table tbl_direcciones (

    id serial primary key, 
    id_pais INT PRIMARY KEY
    id_cuidad INT PRIMARY KEY
    direccion varchar(50), ,
    descripcion varchar(50), 
    activo BOOLEAN DEFAULT true,
    fecha_borra TIMESTAMP,
    correo_electronico varchar(100) 
    );