const express = require('express');
const router = express.Router();
const Person = require('../controllers/person')

/* GET home page. */
router.get('/', function(req, res, next) {
    const date = new Date().toISOString().substring(0, 16)
    Person.list()
        .then(people => {
            res.render('index', { plist: people, d: date });
        })
        .catch(erro => {
            res.render('error', {error: erro, message: "Erro na obtenção da lista de pessoas"})
        })
});

/* GET Person Form. */
router.get('/people/registo', function(req, res, next) {
    const date = new Date().toISOString().substring(0, 16)
    res.render('addPersonForm', {d: date})
});

/* GET Person page. */
router.get('/people/:idPerson', function(req, res, next) {
    const date = new Date().toISOString().substring(0, 16)
    Person.getPerson(req.params.idPerson)
        .then(person => {
            res.render('person', {p: person, d: date });
        })
        .catch(erro => {
            res.render('error', {error: erro, message: "Erro na obtenção do registo de pessoa"})
        })
});

/* GET Student Update Form. */
router.get('/people/edit/:idPerson', function(req, res, next) {
    const date = new Date().toISOString().substring(0, 16)
    Person.getPerson(req.params.idPerson)
        .then(person => {
            res.render('updatePersonForm', {p: person, d: date})
        })
        .catch(erro => {
            res.render('error', {error: erro, message: "Erro na obtenção do registo de pessoa"})
        })
});

/* GET Student Delete Form. */
router.get('/people/delete/:idPerson', function(req, res, next) {
    const date = new Date().toISOString().substring(0, 16)
    Person.getPerson(req.params.idPerson)
        .then(person => {
            res.render('deletePersonForm', {p: person, d: date})
        })
        .catch(erro => {
            res.render('error', {error: erro, message: "Erro na obtenção do registo de pessoa"})
        })
});

/* GET Delete Confirmation */
router.get('/people/delete/:idPerson/confirm', (req,res) => {
    Person.deletePerson(req.params.idPerson)
        .then(resposta => {
            res.redirect('/')
        })
        .catch(erro => {
            res.render('error', {error: erro, message: "Erro na obtenção do registo de pessoa"})
        })
})

// POST Student Form Data
router.post('/people/registo', (req,res) => {
    const date = new Date().toISOString().substring(0, 16)
    Person.addPerson(req.body)
        .then(_ => {
            res.render('addPersonConfirm', {d: date})
        })
        .catch(erro => {
            res.render('error', {error: erro, message: "Erro no armazenamento do registo de pessoa"})
        })
})

// POST Student Update Form
router.post('/people/edit', (req,res) => {
    const date = new Date().toISOString().substring(0, 16)
    Person.updatePerson(req.body)
        .then(_ => {
            res.render('updatePersonConfirm', {d: date})
        })
        .catch(erro => {
            res.render('error', {error: erro, message: "Erro na alteração do registo de pessoa"})
        })
})

module.exports = router;
