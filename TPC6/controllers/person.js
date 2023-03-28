const Person = require('../models/person')

let counter = 0;

// Student list
module.exports.list = () => {
    return Person
        .find()
        .then(docs => {
            return docs;
        })
        .catch(err => {
            console.log(err);
            return err;
        });
}

module.exports.getPerson = id => {
    return Person
        .findOne({_id: id})
        .then(docs => {
            return docs;
        })
        .catch(err => {
            console.log(err);
            return err;
        });
}

module.exports.addPerson = p => {

	if(p._id === undefined){
		p._id = `a${counter}`;
		++counter;
	}

    return Person
            .create(p)
            .then(s => {
                return s;
            })
            .catch(err => {
                console.log(err);
                return err;
            });
}

module.exports.updatePerson = p => {

    console.log(p);

    return Person
            .updateOne({_id: p._id}, {$set: p})
            .then(s => {
                return s;
            })
            .catch(err => {
                console.log(err);
                return err;
            });
}

module.exports.deletePerson = id => {
    return Person
            .deleteOne({_id: id})
            .then(s => {
                return s;
            })
            .catch(err => {
                console.log(err);
                return err;
            });
}
