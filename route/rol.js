const express = require('express');
const app = express.Router();
const db = require('../db/conn');

app.post('',(req, res)=>{


    let params =[
      req.body.nombre

    ];

    let sql = `insert into tblrol 
                (nombre) 
                values 
                ($1)
                returning id ` ;

    console.log(params);    

    db.one(sql,params, event => event.id)
    .then( data => {

      const objetocreado = {id : data, nombre: params[0]};

      res.json(objetocreado);
    })
    .catch((error)=>{
      console.log(error);
      res.json(error);
    });

});

app.get('',(req, res)=>{
 
  let sql = "select * from tbl_rol";


    db.any(sql, e => e.id)
        .then(rows => { res.json(rows); })
        .catch((error) => {

            res.json(error);

        });

});
app.put('', (req, res) => {


  const parametros = [
    req.params.id,
    req.body.nombre,
    req.body.activo
  ];

  let sql = ` update tbl_rol 
               set  nombre =  $2,
                  where id= $1`
                  ;

  db.result(sql, parametros, r => r.rowCount)
      .then(data => {

          const objetoMo = {  id : req.params.id, 
          nombre:  req.body.nombre,
     };
          
          res.json(objetoMo);

      })
      .catch((error) => {
          res.json(error);
      });


});

app.delete('/:id', (req, res) => {


  let sql = ` update tbl_rol 
  set  nombre =  $2, 
     where id= $1`;

  db.result(sql, [req.params.id] ,   r => r.rowCount)
      .then(data => {

          
          const objetoBorrado     = {  id : req.params.id, nombre :req.params.nombre,
                                      activo : false
                                  };
          
          res.json(objetoBorrado);

      })
      .catch((error) => {
          res.json(error);
      });


});


module.exports = app;