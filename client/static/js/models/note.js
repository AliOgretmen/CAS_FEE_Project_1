class Note {
    constructor(){
        const json = arguments.length ? arguments[0] : {};
        this.description = json.description || '';
        this.done = json.done ||'';
        this.created = json.created ||new Date();
        this.due =  json.due ||'';
        this.isFinished = json.isFinished ||'';
        this.rate = json.rate || [true, true, true];
        this.text = json.text ||'';
        this._id = json._id || '';
    }
}


