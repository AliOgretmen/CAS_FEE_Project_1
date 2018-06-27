const noteService = require('../services/noteService');

let success = (res) => (data) => res.status(200).send({data: data});
let errored = (res) => (err) => res.status(500).send({error: 'data could not be found!'});

const addNote = (req, res) => {
    noteService.addNote(req.body).then(success(res)).catch(errored(res));
}

const updateNote = (req, res) => {
    noteService.updateNote(req.body).then(success(res)).catch(errored(res));
}

const deleteNote = (req, res) => {
    noteService.deleteNote(req.params.id).then(success(res)).catch(errored(res));
}

const findNote = (req, res) => {
    noteService.findNote(req.params.id).then(success(res)).catch(errored(res));
}

const findAllNote = (req, res) => {
    return noteService.findAllNote().then(success(res)).catch(errored(res));
}


module.exports = {
    addNote,
    updateNote,
    deleteNote,
    findNote,
    findAllNote
}