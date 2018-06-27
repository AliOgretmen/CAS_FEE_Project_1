(function($, shared, helper, http){

    const showFinished = $('#showFinished');
    const sortByFinishedDate = $('#sortByFinishedDate');
    const sortByCreatedDate = $('#sortByCreatedDate');
    const sortByImportance = $('#sortByImportance');
    let toggleFinishedNotes = true;

    const renderTemplate = (filter = '', order = 'rate') => {
        helper.setContainerId('main-container');
        helper.setTemplateId('task-template');
        helper.setFilterBy(filter);
        helper.setOrderBy(order);

        http.getNotes(helper.orderBy, helper.filterBy, (data) => {
            helper.setData(data);
            helper.renderTodos();
            checkDescriptions();
        });
        shared.setCurrentDate();
    }

    sortByCreatedDate.on('click', () => {
        shared.myLocalStorage.setItem("orderBy", 'due');
        renderTemplate('', 'due');
    });

    sortByFinishedDate.on('click', () => {
        shared.myLocalStorage.setItem("orderBy", 'done');
        renderTemplate('', 'done');
    });

    sortByImportance.on('click', () => {
        shared.myLocalStorage.setItem("orderBy", 'rate');
        renderTemplate('', 'rate');
    });

    showFinished.on('click', () => {
        toggleFinishedNotes = !toggleFinishedNotes;
        if (toggleFinishedNotes) {
            showFinished.html('Show Finished');
            renderTemplate('', 'rate');
        } else {
            showFinished.html('All Tasks');
            helper.setFilterBy('isFinished');
            renderTemplate('isFinished', '');
        }
        shared.myLocalStorage.setItem("isFinished", toggleFinishedNotes);
    });

    const onFinishedClicked = (e) => {
        const isChecked = $(e.target).is(":checked");
        http.findNoteById(e.target.id, function (result) {
            let selected = result.data;
            selected.isFinished = isChecked;
            selected.done = isChecked ? new Date() : '';
            http.updateNote(selected, function () {
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

    $('#main-container').on('click', (e) => {
        if ($(e.target).closest("button") && ($(e.target).closest("button").attr("id") === 'toggleText')) {
            onToggleText($(e.target).closest("button"));
        } else if ($(e.target).hasClass('is-finished')) {
            onFinishedClicked(e);
        }
    });

    function checkDescriptions(){
        $('.list-container').each( function() {
            if( $(this).html().match(/\n/gusm).length < 10){
                $(this).next().hide();
            }
        })
    }


    let orderByFromLocalStorage = shared.myLocalStorage.getItem("orderBy");

    renderTemplate('', orderByFromLocalStorage);

})(jQuery, shared, helper, http);





