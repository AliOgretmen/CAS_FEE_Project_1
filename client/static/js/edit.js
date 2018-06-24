let note = null;

function init() {
    note = new Note();
    let currentID = window.location.search || '';
    const urlParams = currentID.replace('?', '').split('=');
    if (urlParams[0] && urlParams[0] == 'id' && urlParams[1]) {
        storage.GetNoteById(urlParams[1], function(response){
            note  = new Note(response.data);
            renderTemplate();
        });
    } else {
        renderTemplate();
    }
    const theme = shared.myLocalStorage.getItem('theme');
    shared.switchTheme(theme);
    shared.setCurrentDate();
}

const renderTemplate = (filter = '', order = 'rate') => {
    helper.setContainerId('details-form');
    helper.setTemplateId('details-template');
    console.log('note', note);
    helper.setData(note);
    helper.renderTodos();
}

function getAllDetails() {
    note.description = $('#description').val();
    note.due = $('#due-date').val() ? new Date($('#due-date').val()) : note.due;
    note.isFinished = false;
    note.text = $('#text').val();
    note.rate = populateRate(+$('#rate').val());
}

function populateRate(rate){
    let rates = [false, false, false];
    for(let i = 0; i <= rate-1; i++){
        rates[i] = true;
    }
    return rates;
}

function saveAllDetails() {
    if (note._id) {

        storage.UpdateNote(note, function (){});
    } else {
        storage.AddNote(note,function (){});
    }
    window.location.href = 'index.html';
}

function deleteNote(e) {
    if (e.target && e.target.dataset) {
        const id = e.target.dataset.id;
        storage.DeleteNote(id, function(res){
            window.location.href = 'index.html';
        });

    }
}

document.getElementById('details-form').addEventListener('click', (e) => {
    if (e.target.id === 'saveItem') {
        getAllDetails();
        saveAllDetails();
    }

    if (e.target.id === "deleteItem") {
        deleteNote(e);
    }

    if (e.target.id === 'rate') {
        if (e.target.value === 1) {
            note.rate = [true, false, false];
        } else if (e.target.value === 2) {
            note.rate = [true, true, false];
        } else if (e.target.value === 3) {
            note.rate = [true, true, true];
        }
    }
});

init();