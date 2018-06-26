const Datastore = require('nedb');
const db = new Datastore({
    filename: __dirname + '/../data/notes.db',
    autoload: true
});


const addNote = (note) => {
    return new Promise(function(resolve, reject){
        db.insert(note, (err, data) => err ? reject(err) : resolve(data));
    });
};

const updateNote = (note) => {
    return new Promise(function(resolve, reject){
        db.update({_id: note._id}, note, {}, (err, data) => err ? reject(err) : resolve(data));
    });
};

const deleteNote = (id) => {
    return new Promise(function(resolve, reject){
        db.remove({_id: id}, {multi: true}, (err, data) => err ? reject(err) : resolve(data));
    });
};

const findNote = (id) => {
    return new Promise(function(resolve, reject){
        db.findOne({_id: id}, (err, data) => err ? reject(err) : resolve(data));
    });
};

const findAllNote = () => {
    return new Promise(function(resolve, reject){
        db.find({}, (err, data) => err ? reject(err) : resolve(data));
    });
};


module.exports = {
    addNote,
    updateNote,
    deleteNote,
    findNote,
    findAllNote
}