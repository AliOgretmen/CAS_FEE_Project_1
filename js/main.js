
   
    /*
    storage.AddNote({id: 1, due: new Date('2019-12-12'), description: 'description 1', rate: 2, done: new Date('2018-01-12'), text: 'textasdl sasdfa', isFinished: false });
    storage.AddNote({ id: 2, due: new Date('2019-06-12'), description: 'description 2', rate: 3, done: new Date('2018-02-12'), text: 'alkasd alsh öal', isFinished: true  });
    storage.AddNote({ id: 3, due: new Date('2019-05-12'), description: 'description 3', rate: 4, done: new Date('2018-03-12'), text: 'aefkahwe awef awef awe', isFinished: false  });
    */
    const showFinished = $('#showFinished');
    const sortByFinishedDate = $('#sortByFinishedDate');
    const sortByCreatedDate = $('#sortByCreatedDate');
    const sortByImportance = $('#sortByImportance');
    const isFinishedCheckbox = $(".is-finished");
    let toogleShowFinished = true;
 
    const renderTemplate = (filter ='', order = 'rate') => {
        const theme = myLocalStorage.getItem('theme');
        switchTheme(theme);
        helper.setContainerId('main-container');
        helper.setTemplateId('task-template');
        helper.setFilterBy(filter);
        helper.setOrderBy(order);
        const data = storage.GetNotes(helper.orderBy, helper.filterBy)
        helper.setData(data);
        helper.renderTodos();
        
    }


    sortByCreatedDate.on('click', () =>{
        renderTemplate('', 'due');
    });

    sortByFinishedDate.on('click', () =>{
        renderTemplate('', 'done');
    });
    sortByImportance.on('click', () =>{
        renderTemplate('', 'rate');
    });

    showFinished.on('click', () =>{
        toogleShowFinished = !toogleShowFinished;
        if(toogleShowFinished) {
            showFinished.html('Show Finished');
            renderTemplate('', 'rate');
        } else{
            showFinished.html( 'All Tasks');
            helper.setFilterBy('isFinished');
            renderTemplate('isFinished', '');
        }
    });

    const onFinishedClicked = (e) => {
        const isChecked = $(e.target).is(":checked");
        const selected  = storage.GetNoteById(e.target.id);
        selected.isFinished = isChecked;
        selected.done =  isChecked ? new Date(): '';
        storage.UpdateNote(selected);
        renderTemplate();
    }

    const onToggleText = (target) => {
        const elm = $(target).prev('.list-container');
        if(elm.hasClass('expand')){
            elm.removeClass('expand');
        } else{
            elm.addClass('expand');
        }
    }

   document.getElementById('main-container').addEventListener('click', (e) => {
      if(e.target.closest("button") && (e.target.closest("button").id === 'toggleText')) {
        onToggleText(e.target.closest("button"));
      } else if(e.target.classList.contains('is-finished')){
        onFinishedClicked(e);
      }
   })



    
    renderTemplate();
    
 
 


