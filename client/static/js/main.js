const showFinished = $('#showFinished');
const sortByFinishedDate = $('#sortByFinishedDate');
const sortByCreatedDate = $('#sortByCreatedDate');
const sortByImportance = $('#sortByImportance');
const isFinishedCheckbox = $(".is-finished");
let toogleShowFinished = true;

const renderTemplate = (filter = '', order = 'rate') => {
    const theme = shared.myLocalStorage.getItem('theme');
    shared.switchTheme(theme);
    helper.setContainerId('main-container');
    helper.setTemplateId('task-template');
    helper.setFilterBy(filter);
    helper.setOrderBy(order);

    setInterval(function () {
        storage.GetNotes(helper.orderBy, helper.filterBy, function(data){
            helper.setData(data);
            helper.renderTodos();
        })

    }, 1000)

    shared.setCurrentDate();
}

sortByCreatedDate.on('click', () => {
    renderTemplate('', 'due');
});

sortByFinishedDate.on('click', () => {
    renderTemplate('', 'done');
});
sortByImportance.on('click', () => {
    renderTemplate('', 'rate');
});

showFinished.on('click', () => {
    toogleShowFinished = !toogleShowFinished;
    if (toogleShowFinished) {
        showFinished.html('Show Finished');
        renderTemplate('', 'rate');
    } else {
        showFinished.html('All Tasks');
        helper.setFilterBy('isFinished');
        renderTemplate('isFinished', '');
    }
});

const onFinishedClicked = (e) => {
    const isChecked = $(e.target).is(":checked");
    storage.GetNoteById(e.target.id, function (result){
        let selected = result.data; 
        selected.isFinished = isChecked;
        selected.done = isChecked ? new Date() : '';
        storage.UpdateNote(selected, function(){
            renderTemplate();
        });
    });
}

const onToggleText = (target) => {
    const elm = $(target).prev('.list-container');
    if (elm.hasClass('expand')) {
        elm.removeClass('expand');
    } else {
        elm.addClass('expand');
    }
}

document.getElementById('main-container').addEventListener('click', (e) => {
    if (e.target.closest("button") && (e.target.closest("button").id === 'toggleText')) {
        onToggleText(e.target.closest("button"));
    } else if (e.target.classList.contains('is-finished')) {
        onFinishedClicked(e);
    }
})

renderTemplate();





