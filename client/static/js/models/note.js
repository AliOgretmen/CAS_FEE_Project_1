
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

  /*  get description(){ return this._description;}
    get done(){ return this._done; }
    get created(){ return this._created; }
    get due(){ return this._due;}
    get isFinished(){ return this._isFinished; }
    get rate(){ return this._rate; }
    get text(){ return this._text }
    get _id(){ return this._nid; }

    set description(val){  this._description = val;  }
    set done(val){  this._done = val; }
    set created(val){ this._created = val;  }
    set due(val){ this._due = val; }
    set isFinished(val){ this._isFinished = val;  }
    set rate(val){ this._rate = val; }
    set text(val){ this._text = val; }
    set _id(val){ this._nid = val; }*/

    /*getObj (){
        return {
            description: this.description,
            done: this.done,
            created: this.created,
            due: this.done,
            isFinished: this.isFinished,
            rate: this.rate,
            text: this.text,
           _id: this._id,
        }
    }*/
}


