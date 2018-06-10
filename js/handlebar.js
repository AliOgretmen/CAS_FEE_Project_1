
function handleBarHelper() {
    this.orderBy = 'rate';
    this.filterBy = '';
    this.templateId = "task-template";
    this.containerId = 'main-container';
    this.data = [];

    this.renderTodos = () => {
        let source = this.getTemplate(this.templateId);
        let template = this.renderTemplate(source);
        this.append(this.containerId, template(this.data));
    }

    this.getTemplate = (id) => {
        return document.getElementById(id).innerHTML;
    }

    this.renderTemplate = (template) => {
        return Handlebars.compile(template);
    }

    this.append = (place, domElement) => {
        document.getElementById(place).innerHTML = domElement;
    }

    this.setOrderBy = (type) => {
        this.orderBy = type;
    }

    this.setFilterBy = (type) => {
        this.filterBy = type;
    }

    this.setTemplateId = (id) => {
        this.templateId = id;
    }

    this.setContainerId = (id) => {
        this.containerId = id;
    }

    this.setData = (data) =>{
        this.data = data;
    }
}

Handlebars.registerHelper("formatDate", function (datetime, format) {
    if (moment) { 
       if(!datetime){
           return '';
       }
       return moment(datetime).format(format); 
    }
    else {
        return datetime;
    }
});

Handlebars.registerHelper("eq", function (a, b) {
    a = a || [];
    const trueCount = a.filter(item => item == true)
    if (trueCount.length == b) { 
       return true
    }
    return false
});


Handlebars.registerHelper("checkedIf", function (condition) {
    return (condition) ? "checked" : "";
});

const helper = new handleBarHelper();