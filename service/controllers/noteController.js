const noteService = require('../services/noteService');

const addNote = (req, res) => {
    noteService.addNote(req.body, (err, data) => {
        if (err) {
            res.status(500).send({
                error: 'data could not be found!'
            });
        } else {
            res.status(200).send({
                data: data
            });
        }
    });
}

const updateNote = (req, res) => {
    noteService.updateNote(req.body, (err, data) => {
        if (err) {
            res.status(500).send({
                error: 'data could not be found!'
            });
        } else {
            res.status(200).send({
                data: data
            });
        }
    });
}

const deleteNote = (req, res) => {
    noteService.deleteNote(req.params.id, (err, data) => {
        if (err) {
            res.status(500).send({
                error: 'data could not be found!'
            });
        } else {
            res.status(200).send({
                data: data
            });
        }
    });
}

const findNote = (req, res) => {
    noteService.findNote(req.params.id, (err, data) => {
        if (err) {
            res.status(500).send({
                error: 'data could not be found!'
            });
        } else {
            res.status(200).send({
                data: data
            });
        }
    });
}

const findAllNote = (req, res) => {
    noteService.findAllNote((err, data) => {
        if (err) {
            res.status(500).send({
                error: 'data could not be found!'
            });
        } else {
            res.status(200).send({
                data: data
            });
        }
    });
}


module.exports = {
    addNote,
    updateNote,
    deleteNote,
    findNote,
    findAllNote
}