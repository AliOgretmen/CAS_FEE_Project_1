(function($, shared, helper, http) {

    let note = null;

    function init() {
        note = new Note();
        delete note._id;
        let currentID = window.location.search || '';
        const urlParams = currentID.replace('?', '').split('=');
        if (urlParams[0] && urlParams[0] == 'id' && urlParams[1]) {
            http.findNoteById(urlParams[1], function (response) {
                note = new Note(response.data);
                renderTemplate();
            });
        } else {
            renderTemplate();
        }

        shared.setCurrentDate();
    }

    const renderTemplate = (filter = '', order = 'rate') => {
        helper.setContainerId('details-form');
        helper.setTemplateId('details-template');
        helper.setData(note);
        helper.renderTodos();
    }

    function getAllDetails() {
        note.description = $('#description').val();
        note.due = $('#due-date').val() ? new Date($('#due-date').val()) : note.due;
        note.isFinished = false;
        note.text = $('#text').val();
        note.rate = +$('#rate').val();
    }



    function saveAllDetails() {
        if (note._id) {
            http.updateNote(note, () => {});
        } else {
            http.addNote(note, () => {});
        }
        window.location.href = 'index.html';
    }

    function deleteNote(e) {
        if (e.target && e.target.dataset) {
            const id = e.target.dataset.id;
            http.deleteNote(id, function (res) {
                window.location.href = 'index.html';
            });
        }
    }

    $('#details-form')
        .on('submit', (e) => {
            e.preventDefault();
            getAllDetails();
            saveAllDetails();
        })
        .on('click', (e) => {
            if (e.target.id === "deleteItem") {
                deleteNote(e);
            }
        });

    init();

})(jQuery, shared, helper, http);