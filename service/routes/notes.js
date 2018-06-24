const express = require('express');
const router = express.Router();
const noteController = require('../controllers/noteController');

router.get('/note', noteController.findAllNote);
router.get('/note/:id', noteController.findNote);
router.delete('/note/:id', noteController.deleteNote);
router.put('/note/:id', noteController.updateNote);
router.post('/note', noteController.addNote);

module.exports = router;
