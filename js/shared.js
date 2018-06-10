function  myLocalStorageService (){
    this.setItem = (key, value) => {
        value = JSON.stringify(value);
        localStorage.setItem(key, value);
    }

    this.getItem = (key) => {
       let items = localStorage.getItem(key);
       return JSON.parse(items);
    }
}

const myLocalStorage = new myLocalStorageService();

const switchTheme = (theme) => {
    if(theme == "light-theme"){
        $('.wrapper').removeClass('dark');
        $('.wrapper').addClass('light');
        myLocalStorage.setItem('theme', 'light-theme')
    }

    if(theme == "dark-theme"){
        $('.wrapper').removeClass('light');
        $('.wrapper').addClass('dark');
        myLocalStorage.setItem('theme', 'dark-theme')
    }
}

document.getElementById('themes').addEventListener('click', (e)=>{
    const target = e.target.closest('button');
    switchTheme(target.id);
})




