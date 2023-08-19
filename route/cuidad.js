const express = require('express');
const app = express.Router();
const db = require('../db/conn');

app.post('',(req, res)=>{


    let params =[

      req.body.id_cuidad,
      req.body.nombre_cuidad
    ];

    let sql = `insert into tbl_cuidad 
                ( id_ cuidad, nombre_cuidad) 
                values 
                ($1, $2)
                returning id` ;

    console.log(params);    

    db.one(sql,params, event => event.id)
    .then( data => {

      const objetocreado = {id : data, id_cuidad :params [0], nombre_cuidad: params[1] };

      res.json(objetocreado);
    })
    .catch((error)=>{
      console.log(error);
      res.json(error);
    });

});

app.get('',(req, res)=>{
 
  let sql = "select * from tbl_cuidad";


    db.any(sql, e => e.id)
        .then(rows => { res.json(rows); })
        .catch((error) => {

            res.json(error);

        });

});
app.put('/:id', (req, res) => {


  const parametros = [
    req.params.id,
    req.body.id_cuidad,
    req.body.nombre_cuidad
  ];

  let sql = ` update tbl_cuidad 
               set  nombre_cuidad =  $2
               where id= $1`;

  db.result(sql, parametros, r => r.rowCount)
      .then(data => {

          const objetoMo = {  id : req.params.id, 
           nombre_cuidad:  req.body.nombre_cuidad};
          
          res.json(objetoMo);

      })
      .catch((error) => {
          res.json(error);
      });


});
app.delete('/:id', (req, res) => {


  let sql = ` update tbl_cuidad 
  set  nombre_cuidad =  $2,
     where id= $1`;

  db.result(sql, [req.params.id] ,   r => r.rowCount)
      .then(data => {

          
          const objetoBorrado     = {  id : req.params.id, nombre_cuidad:req.params.nombre_cuidad,
                                      activo : false
                                  };
          
          res.json(objetoBorrado);

      })
      .catch((error) => {
          res.json(error);
      });


});


module.exports = app;