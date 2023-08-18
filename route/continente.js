const express = require('express');
const app = express.Router();
const db = require('../db/conn');

app.post('/api/continente ',(req, res)=>{


    let params =[

      req.body.id_continente,
      req.body.nombre_continente

    ];

    let sql = `insert into tbl_contintente 
                (nombre_continente, ) 
                values 
                ($1)
                returning id ` ;

    console.log(params);    

    db.one(sql,params, event => event.id)
    .then( data => {

      const objetocreado = {id : data, nombre_continente: params[0]};
      res.json(objetocreado);
    })
    .catch((error)=>{
      console.log(error);
      res.json(error);
    });

});

app.get('/api/continente',(req, res)=>{
 
  let sql = "select * from tbl_continente";


    db.any(sql, e => e.id)
        .then(rows => { res.json(rows); })
        .catch((error) => {

            res.json(error);

        });

});
app.put('/api/continente/:id', (req, res) => {


  const parametros = [
    req.params.id,
    req.body.nombre_continente

    
  ];

  let sql = ` update tbl_continente 
               set  nombre_continente =  $2,
                  where id= $1`
                  ;

  db.result(sql, parametros, r => r.rowCount)
      .then(data => {

          const objetoMo = {  id : req.params.id, 
          nombre_continente:  req.body.nombre_continente};
          
          res.json(objetoMo);

      })
      .catch((error) => {
          res.json(error);
      });


});
app.delete('/api/continente/:id', (req, res) => {


  let sql = ` update tbl_continente 
  set  nombre_continente=  $2, 
     where id= $1`;

  db.result(sql, [req.params.id] ,   r => r.rowCount)
      .then(data => {

          
          const objetoBorrado     = {  id : req.params.id, nombre_continente:req.params.nombre_continente,
                                      activo : false
                                  };
          
          res.json(objetoBorrado);

      })
      .catch((error) => {
          res.json(error);
      });


});


module.exports = app;