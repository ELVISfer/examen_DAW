const express = require('express');
const app = express.Router();
const db = require('../db/conn');

app.post(' ',(req, res)=>{


    let params =[

      req.body.id_pais,
      req.body.id_cuidad,
      req.body.direccion,
      req.body.descripcion,
      req.body.activo,
      req.body.fecha_borra,
      req.body.correo_electronico

    ];

    let sql = `insert into tbl_direcciones 
                (id_pais, id_cuidad, direccion, descripcion, activo, fecha_borra, correo_electronico) 
                values 
                ($1, $2, $3, $4, $5, $6, $7)
                returning id ` ;

    console.log(params);    

    db.one(sql,params, event => event.id)
    .then( data => {

      const objetocreado = {id : data, id_pais: params[0], id_cuidad: params[1], direccion:params[2], descripcion:params[3], activo:params[4], fecha_borra:params[5], correo_electronico:params[6]};

      res.json(objetocreado);
    })
    .catch((error)=>{
      console.log(error);
      res.json(error);
    });

});

app.get('',(req, res)=>{
 
  let sql = "select * from tbl_direcciones";


    db.any(sql, e => e.id)
        .then(rows => { res.json(rows); })
        .catch((error) => {

            res.json(error);

        });

});
app.put('/:id', (req, res) => {


  const parametros = [
   
    req.body.id_pais,
    req.body.id_cuidad,
    req.body.direccion,
    req.body.descripcion,
    req.body.activo,
    req.body.fecha_borra,
    req.body.correo_electronico

  ];

  let sql = ` update tbl_direcciones 
               set  id_pais =  $2, 
                  id_cuidad = $3,
                  direccion = $4,
                  descripcion = $5,
                  activo= $6,
                  fecha_borra= $7,
                    correo_electronico = $8,
                  where id= $1`
                  ;

  db.result(sql, parametros, r => r.rowCount)
      .then(data => {

          const objetoMo = {   id : req.params.id, id_pais:req.params.id_pais,id_cuidad: req.params.id_cuidad, direccion: req.params.direccion, descripcion: req.params.descripcion,
            activo : false , fecha_borra: req.params.fecha_borra, correo_electronico:req.params.correo_electronico };
          
          res.json(objetoMo);

      })
      .catch((error) => {
          res.json(error);
      });


});
app.delete('/:id', (req, res) => {


  let sql =  ` update tbl_direcciones 
  set  id_pais =  $2, 
     id_cuidad = $3,
     direccion = $4,
     descripcion = $5,
     activo= $6,
     fecha_borra= $7,
       correo_electronico = $8,
     where id= $1`
     ;
  db.result(sql, [req.params.id] ,   r => r.rowCount)
      .then(data => {

          
          const objetoBorrado     = {  id : req.params.id, id_pais:req.params.id_pais,id_cuidad: req.params.id_cuidad, direccion: req.params.direccion, descripcion: req.params.descripcion,
                                      activo : false , fecha_borra: req.params.fecha_borra, correo_electronico:req.params.correo_electronico
                                  };
          
          res.json(objetoBorrado);

      })
      .catch((error) => {
          res.json(error);
      });


});


module.exports = app;