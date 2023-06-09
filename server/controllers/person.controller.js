const Person = require('../models/person.model');
module.exports.index = (request, response) => {
    response.json({
        message: "Hello World"
    });
}
/* The method below is new */
module.exports.createPerson = async (request, response) => {
    
    Person.exists({ firstName: request.body.firstName })  
        .then(userExists => {
            if (userExists) {
                // Promise.reject() will activate the .catch() below.
                return Promise.reject({errors : {firstName:{message:"this firstname is used before"}}});
            }else{
            return Person.create(request.body)
            
          
        }
        })
        .then(person => response.json(person))
        .catch(err => response.json(err));
      
}

module.exports.getAllPeople = (request, response) => {

    Person.find()
        .then(persons => {
            // console.log(persons); //console logs are optional, but they are highly recommended for troubleshooting!
            response.json(persons);
        })
        .catch(err => {
            console.log(err)
            response.json(err)
        })
}

module.exports.getPerson = (request, response) => {
    Person.findOne({ _id: request.params.id })
        .then(person => response.json(person))
        .catch(err => response.json(err));
}
module.exports.updatePerson = (request, response) => {

    Person.exists({ firstName: request.body.firstName })  
        .then(userExists => {
            if (userExists) {
                // Promise.reject() will activate the .catch() below.
                return response.json("ekziston");
            }else{
                Person.findOneAndUpdate({ _id: request.params.id }, request.body, { new: true })
                .then(updatedPerson => response.json(updatedPerson))
                .catch(err => response.json(err))
        }
        })

    
}

module.exports.deletePerson = (request, response) => {
    Person.deleteOne({ _id: request.params.id }) //note: "id" here MUST match id in corresponding route
        .then(deleteConfirmation => response.json(deleteConfirmation))
        .catch(err => response.json(err))
}


