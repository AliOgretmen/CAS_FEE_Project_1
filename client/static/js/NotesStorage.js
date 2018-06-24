class NotesStorage{
    constructor(){
        this.url = 'http://localhost:3000/note';
    }

    GetNotes(orderBy, filterBy, callback) {
        this.findAllNotes(function(result){
             const data = result.data.filter(item => filterBy ? item[filterBy] == true : true)
                .sort((a, b) => a[orderBy] < b[orderBy]);
             callback(data);
        });
    }

    findAllNotes(callback) {
        return fetch(this.url, {
            method: 'GET'
        }).then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => callback(response));
    }

    AddNote(note){
        fetch(this.url, {
            method: 'POST',
            body: JSON.stringify(note),
            headers:{
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => console.log('Success:', response));
    }

    UpdateNote(note, callback){
        fetch(this.url+"/"+note._id, {
            method: 'PUT',
            body: JSON.stringify(note),
            headers:{
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => callback(response));
    }

    GetNoteById(id, callback) {
        fetch(this.url+"/"+id, {
            method: 'GET'
        }).then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => callback(response));
    }


    DeleteNote(id, callback) {
        fetch(this.url+"/"+id, {
            method: 'DELETE'
        }).then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => callback( response));
    }

}

const storage = new NotesStorage();