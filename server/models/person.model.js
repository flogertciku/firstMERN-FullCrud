const mongoose = require('mongoose');
const PersonSchema = new mongoose.Schema({
    firstName: { type: String,
    minlength: [3, "emri duhet te jete me i gjate se 3 "] ,
    required: [
        true,
        "firstName is required"
    ]
},
    lastName: { type: String,
        minlength: [3, "mbiemri duhet te jete me i gjate se 3 "] ,
        required: [
            true,
            "lastName is required"
        ]}
}, { timestamps: true });
module.exports = mongoose.model('Person', PersonSchema);

