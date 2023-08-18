const express = require('express');
const app = express.Router();
const db = require('../db/conn');

app.post('/api/usuario',(req, res)=>{


    let params =[

      req.body.Hora_inicio,
      req.body.Hora_final

    ];

    let sql = `insert into horario 
                (hora_inicio, hora_fina) 
                values 
                ($1, $2)
                returning id ` ;

    console.log(params);    

    db.one(sql,params, event => event.id)
    .then( data => {

      const objetocreado = {id : data, Hora_inicio: params[0], Hora_final: params[1] };

      res.json(objetocreado);
    })
    .catch((error)=>{
      console.log(error);
      res.json(error);
    });

});

app.get('/api/usuario',(req, res)=>{
 
  let sql = "select * from horario";


    db.any(sql, e => e.id)
        .then(rows => { res.json(rows); })
        .catch((error) => {

            res.json(error);

        });

});
app.put('/api/usuario/:id', (req, res) => {


  const parametros = [
    req.params.id,
    req.body.Hora_inicio,
    req.body.Hora_final

    
  ];

  let sql = ` update horario 
               set  hora_inicio =  $2, 
                  hora_final = $3,
                  where id= $1`
                  ;

  db.result(sql, parametros, r => r.rowCount)
      .then(data => {

          const objetoMo = {  id : req.params.id, 
          Hora_inicio:  req.body.Hora_inicio,
           Hora_final: req.body.Hora_final };
          
          res.json(objetoMo);

      })
      .catch((error) => {
          res.json(error);
      });


});
app.delete('/api/usuario/:id', (req, res) => {


  let sql = ` update horario 
  set  hora_inicio =  $2, 
     hora_final = $3,
     where id= $1`;

  db.result(sql, [req.params.id] ,   r => r.rowCount)
      .then(data => {

          
          const objetoBorrado     = {  id : req.params.id, nombre :req.params.nombre,identidad_secreta : req.params.identidad_secreta,
                                      activo : false
                                  };
          
          res.json(objetoBorrado);

      })
      .catch((error) => {
          res.json(error);
      });


});


module.exports = app;