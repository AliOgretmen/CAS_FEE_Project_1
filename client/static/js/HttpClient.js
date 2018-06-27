let http = (
    function () {

        class HttpClient {

            constructor(url) {
                this.url = url;
            }

            getNotes(orderBy, filterBy, callback) {
                this.findAllNotes(function (result) {
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

            addNote(note) {
                fetch(this.url, {
                    method: 'POST',
                    body: JSON.stringify(note),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(res => res.json())
                    .catch(error => console.error('Error:', error))
                    .then(response => console.log('Success:', response));
            }

            updateNote(note, callback) {
                fetch(this.url + "/" + note._id, {
                    method: 'PUT',
                    body: JSON.stringify(note),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(res => res.json())
                    .catch(error => console.error('Error:', error))
                    .then(response => callback(response));
            }

            findNoteById(id, callback) {
                fetch(this.url + "/" + id, {
                    method: 'GET'
                }).then(res => res.json())
                    .catch(error => console.error('Error:', error))
                    .then(response => callback(response));
            }


            deleteNote(id, callback) {
                fetch(this.url + "/" + id, {
                    method: 'DELETE'
                }).then(res => res.json())
                    .catch(error => console.error('Error:', error))
                    .then(response => callback(response));
            }
        }

        return new HttpClient('http://localhost:3000/note');
    }());