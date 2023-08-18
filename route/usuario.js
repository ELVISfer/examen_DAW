const express = require('express');
const app = express.Router();
const db = require('../db/conn');

app.post('/api/usuario',(req, res)=>{


    let params =[

      req.body.correo_electronico,
      req.body.nombre,
      req.body.activo,
      req.body.fecha_borra,
      req.body.id_rol

    ];

    let sql = `insert into tbl_usuario 
                (correo_electronico,  nombre, activo, fechas_borra, id_rol) 
                values 
                ($1, $2, $3, $4, $5)
                returning id ` ;

    console.log(params);    

    db.one(sql,params, event => event.id)
    .then( data => {

      const objetocreado = {id : data, correo_electronico: params[0], nombre: params[1], activo:params[2], fecha_borra: params[3], id_rol:params[4]};

      res.json(objetocreado);
    })
    .catch((error)=>{
      console.log(error);
      res.json(error);
    });

});

app.get('/api/usuario',(req, res)=>{
 
  let sql = "select * from tbl_usuario";


    db.any(sql, e => e.id)
        .then(rows => { res.json(rows); })
        .catch((error) => {

            res.json(error);

        });

});
app.put('/api/usuario/:id', (req, res) => {


  const parametros = [
    req.params.id,
    req.body.correo_electronico,
    req.body.nombre,
    req.body.activo,
    req.body.fecha_borra,
    req.body.id_rol
  

    
  ];

  let sql = ` update tbl_usuario
               set correo_electronico= $2,
                 nombre=$3, 
                 activo=$4,
                  fechas_borra= $5, 
                  id_rol=$5,
                  where id= $1`
                  ;

  db.result(sql, parametros, r => r.rowCount)
      .then(data => {

          const objetoMo = {  id : req.params.id, 
          correo_electronico : req.body.correo_electronico,
           nombre: req.body.nombre,
          activo: false, fecha_borra: req.body.fecha_borra,
        id_rol: req.body.id_rol };
          
          res.json(objetoMo);

      })
      .catch((error) => {
          res.json(error);
      });


});
app.delete('/api/usuario/:id', (req, res) => {


  let sql = ` update tbl_usuario
  set correo_electronico= $2,
    nombre=$3, 
    activo=$4,
     fechas_borra= $5, 
     id_rol=$5,
     where id= $1`;

  db.result(sql, [req.params.id] ,   r => r.rowCount)
      .then(data => {

          
          const objetoBorrado     = {  id : req.params.id, correo_electronico:req.params.correo_electronico,
                                      activo : false, fecha_borra: req.params.fecha_borra, id_rol: req.params.id_rol
                                  };
          
          res.json(objetoBorrado);

      })
      .catch((error) => {
          res.json(error);
      });


});


module.exports = app;