
create DATABASE TiendaFacturacion ;


create table tblrol (

    id serial NOT NULL,
    id_rol int,
    nombre varchar(100),
    activo BOOLEAN DEFAULT true,
    fecha_borra timestamp without time zone  DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(id_rol)
);


create table tbl_usuario (

    correo_electronico varchar(80) , 
    nombre varchar(100), 
   activo BOOLEAN DEFAULT true,
    fecha_borra TIMESTAMP without time zone DEFAULT CURRENT_TIMESTAMP,
    id_rol int,
);

create table tbl_continente(
    id SERIAl NOT NULL,
    id_continente int,
    nombre_continente VARCHAR(200), 
    PRIMARY KEY(id_continente)
        );

create table tbl_pais(
    id SERIAl NOT null,
    id_pais int,
    nombre_pais VARCHAR(200), 
    id_continente int, 
    PRIMARY KEY(id_pais)
        );



create table tbl_cuidad(
    id SERIAl not null,
    id_cuidad int ,
    nombre_cuidad VARCHAR(200), 
    id_pais int,
    PRIMARY KEY(id_cuidad)
        );


create table tbl_direcciones (

    id serial not NULL, 
    id_pais INT PRIMARY KEY
    id_cuidad INT PRIMARY KEY
    direccion varchar(50), ,
    descripcion varchar(50), 
    activo BOOLEAN DEFAULT true,
    fecha_borra TIMESTAMP without time zone DEFAULT CURRENT_TIMESTAMP,
    correo_electronico varchar(100) PRIMARY key
    );