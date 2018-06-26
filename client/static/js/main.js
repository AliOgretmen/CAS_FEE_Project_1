(function($, shared, helper, http){

    const showFinished = $('#showFinished');
    const sortByFinishedDate = $('#sortByFinishedDate');
    const sortByCreatedDate = $('#sortByCreatedDate');
    const sortByImportance = $('#sortByImportance');
    const isFinishedCheckbox = $(".is-finished");
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
        renderTemplate('', 'due');
    });

    sortByFinishedDate.on('click', () => {
        renderTemplate('', 'done');
    });

    sortByImportance.on('click', () => {
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
            if( $(this).html().match(/\n/gusm).length < 3){
                $(this).next().hide();
            }
        })
    }

    renderTemplate();

})(jQuery, shared, helper, http);





