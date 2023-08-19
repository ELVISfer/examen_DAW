
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

    --
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `tbl_ciudad`
--
ALTER TABLE tbl_ciudad
  ADD PRIMARY KEY (id_cuidad),
  ADD KEY id_pais (id_pais);

--
-- Indices de la tabla `tbl_continente`
--
ALTER TABLE tbl_continente
  ADD PRIMARY KEY (id_continente);

--
-- Indices de la tabla `tbl_direcciones`
--
ALTER TABLE tbl_direcciones
  ADD PRIMARY KEY (id_direccion),
  ADD KEY correo_electronico (correo_electronico),
  ADD KEY id_pais(id_pais),
  ADD KEY id_ciudad (id_ciudad);

--
-- Indices de la tabla `tbl_pais`
--
ALTER TABLE tbl_pais
  ADD PRIMARY KEY (id_pais),
  ADD KEY id_continente (id_continente);

--
-- Indices de la tabla `tbl_rol`
--
ALTER TABLE tblrol
  ADD PRIMARY KEY (id_rol);

--
-- Indices de la tabla `tbl_usuario`
--
ALTER TABLE tbl_usuario
  ADD PRIMARY KEY (correo_electronico),
  ADD KEY id_rol (id_rol);

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `tbl_ciudad`
--
ALTER TABLE tbl_ciudad
  ADD CONSTRAINT id_pais FOREIGN KEY (id_pais) REFERENCES tbl_pais (id_pais);

--
-- Filtros para la tabla `tbl_direcciones`
--
ALTER TABLE tbl_direcciones
  ADD CONSTRAINT correo_electronico FOREIGN KEY (correo_electronico) REFERENCES tbl_usuario (correo_electronico),
  ADD CONSTRAINT tbl_direcciones_ibfk_1 FOREIGN KEY (id_pais) REFERENCES tbl_pais (id_pais),
  ADD CONSTRAINT tbl_direcciones_ibfk_2 FOREIGN KEY (id_pais) REFERENCES tbl_pais (id_pais),
  ADD CONSTRAINT tbl_direcciones_ibfk_3 FOREIGN KEY (id_ciudad) REFERENCES tbl_ciudad (id_cuidad);

--
-- Filtros para la tabla `tbl_pais`
--
ALTER TABLE tbl_pais
  ADD CONSTRAINT tbl_pais_ibfk_1 FOREIGN KEY (id_continente) REFERENCES tbl_continente (id_continente);

--
-- Filtros para la tabla `tbl_usuario`
--
ALTER TABLE tbl_usuario
  ADD CONSTRAINT id_rol FOREIGN KEY (id_rol) REFERENCES tblrol (id_rol);ç

  
-- Volcado de datos para la tabla `tbl_continente`
--

INSERT INTO tbl_continente (`id_continente`, `nombre_continente`) VALUES
(1, 'Asia'),
(2, 'America'),
(3, 'Africa'),
(4, 'Antartida'),
(5, 'Europa'),
(6, 'Oceania');

--
-- Volcado de datos para la tabla `tbl_pais`
--

INSERT INTO tbl_pais (`id_pais`, `nombre_pais`, `id_continente`) VALUES
(1, 'Canadá', 2),
(2, 'Estados Unidos', 2),
(3, 'México', 2),
(4, 'Belice', 2),
(5, 'Costa Rica', 2),
(6, 'El Salvador', 2),
(7, 'Guatemala', 2),
(8, 'Honduras', 2),
(9, 'Nicaragua', 2),
(10, 'Panamá', 2),
(11, 'Argentina', 2),
(12, 'Bolivia', 2),
(13, 'Brasil', 2),
(14, 'Chile', 2),
(15, 'Colombia', 2),
(16, 'Ecuador', 2),
(17, 'Paraguay', 2),
(18, 'Perú', 2),
(19, 'Surinam', 2),
(20, 'Trinidad y Tobago', 2),
(21, 'Uruguay', 2),
(22, 'Venezuela', 2),
(23, 'Antigua y Barbuda', 2),
(24, 'Bahamas', 2),
(25, 'Barbados', 2),
(26, 'Cuba', 2),
(27, 'Dominica', 2),
(28, 'Granada', 2),
(29, 'Guyana', 2),
(30, 'Haití', 2),
(31, 'Jamaica', 2),
(32, 'República Dominicana', 2),
(33, 'San Cristóbal y Nieves', 2),
(34, 'San Vicente y las Granadinas', 2),
(35, 'Santa Lucía', 2);
