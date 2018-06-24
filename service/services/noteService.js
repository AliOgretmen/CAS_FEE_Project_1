const Datastore = require('nedb');
const db = new Datastore({
    filename: __dirname + '/../data/notes.db',
    autoload: true
});

const addNote = (note, callback) => {
    console.log('gelebildim', note);
    db.insert(note, (err, newDoc) => {
        resolver(err, callback, newDoc);
    });
}

const updateNote = (note, callback) => {
    db.update({
        _id: note._id
    }, note, {}, (err, newDoc) => {
        resolver(err, callback, newDoc);
    });
}

const deleteNote = (id, callback) => {
    db.remove({
        _id: id
    }, {
        multi: true
    }, (err, newDoc) => {
        resolver(err, callback, newDoc);
    });
}

const findNote = (id, callback) => {
    db.findOne({
        _id: id
    }, (err, newDoc) => {
        resolver(err, callback, newDoc);
    });
}

const findAllNote = (callback) => {
    db.find({}, (err, newDoc) => {
        resolver(err, callback, newDoc);
    });
}

const resolver = (err, callback, newDoc) => {
    if (err) {
        callback(err);
    } else {
        callback(null, newDoc);
    }
}

module.exports = {
    addNote,
    updateNote,
    deleteNote,
    findNote,
    findAllNote
}