const express = require('express');
const app = express.Router();
const db = require('../db/conn');

app.post('',(req, res)=>{


    let params =[

      req.body.id_pais,
      req.body.nombre_pais

    ];

    let sql = `insert into tbl_pais 
                (nombre_pais) 
                values 
                ($1)
                returning id ` ;

    console.log(params);    

    db.one(sql,params, event => event.id)
    .then( data => {

      const objetocreado = {id : data, nombre_pais: params[0]};

      res.json(objetocreado);
    })
    .catch((error)=>{
      console.log(error);
      res.json(error);
    });

});

app.get('',(req, res)=>{
 
  let sql = "select * tbl_pais";


    db.any(sql, e => e.id)
        .then(rows => { res.json(rows); })
        .catch((error) => {

            res.json(error);

        });

});
app.put('/:id', (req, res) => {


  const parametros = [
    req.params.id,
    req.body.nombre_pais

    
  ];

  let sql = ` update tbl_pais 
               set  nombre_pais=  $2,
                  where id= $1`
                  ;

  db.result(sql, parametros, r => r.rowCount)
      .then(data => {

          const objetoMo = {  id : req.params.id, 
          nombre_pais:  req.body.nombre_pais };
          
          res.json(objetoMo);

      })
      .catch((error) => {
          res.json(error);
      });


});
app.delete('/:id', (req, res) => {


  let sql = ` update tbl_pais
  set  nombre_pais =  $2, 
     where id= $1`;

  db.result(sql, [req.params.id] ,   r => r.rowCount)
      .then(data => {

          
          const objetoBorrado     = {  id : req.params.id, nombre_pais :req.params.nombre_pais,
                                      activo : false
                                  };
          
          res.json(objetoBorrado);

      })
      .catch((error) => {
          res.json(error);
      });


});


module.exports = app;