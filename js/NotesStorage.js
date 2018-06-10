
/*
o	GetNotes(orderBy, filterBy)
o	AddNote(note)
o	UpdateNote(note)
o	GetNoteById(id) 
o	Wichtig: Der Store darf kein Zugriff auf den DOM haben. 
o	Hinweis: Dieses Modul ist das M von MVC
*/

function NotesStorage () {
    this.GetNotes = (orderBy, filterBy) => {
        const notes = myLocalStorage.getItem('notes') || [];
        return notes.filter(item => filterBy ? item[filterBy] == true: true)
               .sort((a,b) => a[orderBy] < b[orderBy])
    }

    this.AddNote = (note) => {
        const notes = myLocalStorage.getItem('notes') || [];
        notes.push(note); 
        return myLocalStorage.setItem('notes', notes);
    }

    this.UpdateNote = (note) => {
        let notes = myLocalStorage.getItem('notes') || [];
        let index = notes.findIndex(item => item.id == note.id);
        notes[index] = note;
        return myLocalStorage.setItem('notes', notes);
    }

    this.GetNoteById = (id) => {
        const notes = myLocalStorage.getItem('notes') || [];
        return notes.find(item => item.id == id);
    }

    this.DeleteNote = (id) =>{
        let notes = myLocalStorage.getItem('notes') || [];
        notes = notes.filter(item => item.id != id);
        return myLocalStorage.setItem('notes', notes);
    }
}

const storage = new NotesStorage();