


let note = {
    description: '',
    done: '',
    created: new Date(),
    due: '',
    isFinished: '',
    rate: '',
    text: '',
};

function init() {
    let currentID = window.location.search || '';
    const urlParams = currentID.replace('?', '').split('=');
    if (urlParams[0] && urlParams[0] == 'id' && urlParams[1]) {
        note = storage.GetNoteById(urlParams[1]) || note;
    }
    const theme = myLocalStorage.getItem('theme');
    switchTheme(theme);
    renderTemplate();
}

const renderTemplate = (filter ='', order = 'rate') => {
    helper.setContainerId('details-form');
    helper.setTemplateId('details-template');
    console.log('note', note);
    helper.setData(note);
    helper.renderTodos();
}

function getAllDetails() {
    note.description = $('#description').val();
    note.due = $('#due-date').val() ? new Date($('#due-date').val()): note.due;
    note.isFinished = false;
    note.text = $('#text').val();
}

function saveAllDetails() {
   if(note.id){
       storage.UpdateNote(note);
   } else {
       note.id = new Date().getTime();
       storage.AddNote(note);
   }
   window.location.href = 'index.html';
}

function deleteNote(e) {
    if(e.target && e.target.dataset) {
        const id = e.target.dataset.id;
        storage.DeleteNote(id);
        window.location.href = 'index.html';
    }
}

document.getElementById('details-form').addEventListener('click', (e) => {
   if(e.target.id === 'saveItem') {
    getAllDetails();
    saveAllDetails();
   }

   if(e.target.id == "deleteItem") {
      deleteNote(e);
   }

   if(e.target.id === 'rate') {
    if(e.target.value == 1){
        note.rate = [true, false, false];
    } else if(e.target.value == 2){
        note.rate = [true, true, false];
    } else if(e.target.value == 3){
        note.rate = [true, true, true];
    }
  }
});

init();