var express = require('express');
var router = express.Router();
var Person = require('../models/data')

var pages = ['index', 'create', 'delete', 'details']


router.get('/:page', function(req, res, next) {

    var page = req.params.page
    if (pages.indexOf(page) == -1) {
        res.render('error', { message: 'This pages doesnt exists'})
    }
    res.render(page)

})

/* GET home page. */
router.get('/', function(req, res, next) {

    Person.find(null, function(err, docs){
      res.render('index', {person: docs});
    });

    var id = req.query.id
    Person.findById(id, function(err){
      if(err){
        console.log(err)
      }
    })

});


router.get('/:page/:id', function(req, res, next){
  var page = req.params.page
  if (pages.indexOf(page) == -1) {
      res.render('error', { message: 'This pages doesnt exists'})
  }
var id = req.params.id

Person.findByIdAndRemove(id, function(err){
  if(err){
    console.log(err)
  }
  res.redirect('/')

})


})


router.post('/:page', function(req, res, next) {
  var page = req.params.page
  if (pages.indexOf(page) == -1) {
      res.render('error', { message: 'This pages doesnt exists'})
  }
    var data = req.body
    Person.create(data, function(err, people){
      if(err){
        console.log(err)
      }else{
        console.log('SUCCESS')
      }
    })

    res.redirect('/')

});

module.exports = router;
