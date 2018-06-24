let shared = (
    function () {
        function LocalStorageService() {
            this.setItem = (key, value) => {
                value = JSON.stringify(value);
                localStorage.setItem(key, value);
            }

            this.getItem = (key) => {
                let items = localStorage.getItem(key);
                return JSON.parse(items);
            }
        }

        const myLocalStorage = new LocalStorageService();

        const switchTheme = (theme) => {
            let themeToBeRemoved = theme === 'dark' ? 'light' : 'dark';
            $('.wrapper').removeClass(themeToBeRemoved).addClass(theme);
            myLocalStorage.setItem('theme', theme)
        }

        document.getElementById('themes').addEventListener('click', (e) => {
            const target = e.target.closest('button');
            switchTheme(target.id);
        })

        function setCurrentDate() {
            document.getElementById('date').innerHTML = moment().format('DD.MM.YYYY');
        }

        if (myLocalStorage.getItem('theme'))
            switchTheme(myLocalStorage.getItem('theme'));

        return {
            setCurrentDate,
            switchTheme,
            myLocalStorage
        }
    })();

