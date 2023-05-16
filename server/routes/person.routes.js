const PersonController = require('../controllers/person.controller');
module.exports = (app) => {
    app.get('/api', PersonController.index);
    app.post('/api/people', PersonController.createPerson); 
    app.get('/api/people', PersonController.getAllPeople); 
    app.get('/api/people/:id', PersonController.getPerson);
    app.patch('/api/people/:id', PersonController.updatePerson);
    app.delete('/api/people/:id', PersonController.deletePerson); //note: "id" here MUST match params in controller



    /* This is new */
}

