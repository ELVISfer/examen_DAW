
create DATABASE TiendaFacturacion ;


create table tblrol (

    id serial NOT NULL,
    id_rol int,
    nombre varchar(100),
    activo BOOLEAN DEFAULT true,
    fecha_borra timestamp without time zone,
    PRIMARY KEY(id_rol)
);


create table tbl_usuario (
id serial PRIMARY key  
    correo_electronico varchar(80) , 
    nombre varchar(100), 
   activo BOOLEAN DEFAULT true,
    fecha_borra TIMESTAMP without time zone ,
    id_rol int,
    PRIMARY key (id),
        constraint fk_id_rol_1 Foreign Key (id_rol) REFERENCES tblrol(id)

);

create table tbl_continente(
    id SERIAl NOT NULL,
    id_continente int,
    nombre_continente VARCHAR(200), 
 id_pais int 
    PRIMARY KEY(id),
        constraint fk_id_continente_1 Foreign Key (id_pais) REFERENCES tbl_pais(id)

        );

create table tbl_pais(
    id SERIAl NOT null,
    id_pais int,
    nombre_pais VARCHAR(200), 
    id_continente int, 
    PRIMARY KEY(id),
        constraint fk_id_pais_1 Foreign Key (id_continente) REFERENCES tbl_continente(id)
        );



create table tbl_cuidad(
    id SERIAl not null,
    id_cuidad int ,
    nombre_cuidad VARCHAR(200), 
    id_pais int,
    PRIMARY KEY(id),
        constraint fk_id_cuidad_1 Foreign Key (id_pais) REFERENCES tbl_pais(id)
        );


create table tbl_direcciones (

    id serial NOT null, 
    id_pais INT,
    id_cuidad INT, 
    direccion varchar(50), ,
    descripcion varchar(50), 
    activo BOOLEAN DEFAULT true,
    fecha_borra TIMESTAMP without time zone,
    correo_electronico varchar(100),
    constraint fk_id_correo_1 Foreign Key (correo_electronico) REFERENCES tbl_usuario(id).
       constraint fk_id_pais_1 Foreign Key (id_pais) REFERENCES tbl_pais(id),
    constraint fk_id_cuidad_1 Foreign Key (id_cuidad) REFERENCES tbl_cuidad(id) );