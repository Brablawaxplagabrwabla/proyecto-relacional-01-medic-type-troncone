/**
 * AlergiaController
 *
 * @description :: Server-side logic for managing Alergias
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  show: function(req, res) {
    Medicamento.find().exec(function(err, medicamentos){
      if (err) sails.log(err);
      res.view({
        medicamento: medicamentos
      })
    });
  },

  nuevo: function(req, res){
    res.view();
  },

  'new': function(req, res) {
    Medicamento.create({
      nombreComercial: req.param('nombreComercial'),
      efectosSec: req.param('efectosSec'),
      contraindicaciones: req.param('contraindicaciones')
    }).exec(function(err, medicamento){
      if (err) sails.log(err);
      res.redirect('back');
    });
  },

  editar: function(req, res) {
    Medicamento.find({
      id: req.param('id')
    }).exec(function(err, medicamento){
      if (err) sails.log(err);
      if (JSON.stringify(medicamento).length <= 2) {
        res.redirect('/404');
      }
      res.view({
        medicamento: medicamento[0]
      })
    });
  },

  update: function(req, res) {
    Medicamento.update({id: req.param('id')},{
      nombreComercial: req.param('nombreComercial'),
      efectosSec: req.param('efectosSec'),
      contraindicaciones: req.param('contraindicaciones')
    }).exec(function(err, medicamento){
      if (err) sails.log(err);
      if (!medicamento) {
        res.redirect('/500');
      }
      res.redirect('/Medicamento/show/'+medicamento[0].id);
    });
  }

};
