let shared = (
    function ($, moment) {

        class LocalStorageService{
            setItem(key, value) {
                value = JSON.stringify(value);
                localStorage.setItem(key, value);
            };

            getItem(key){
                let items = localStorage.getItem(key);
                if(items)
                    return JSON.parse(items);
                return null;
            }
        }

        setCurrentDate = () => {
            $('#date').html(moment().format('DD.MM.YYYY'));
        };

        switchTheme = (theme) => {
            theme = theme || 'dark';
            let themeToBeRemoved = theme === 'dark' ? 'light' : 'dark';
            $('.wrapper').removeClass(themeToBeRemoved).addClass(theme);
            myLocalStorage.setItem('theme', theme)
        };


        $(document).ready(function(){
            $('#themes button').on('click', (e) => {
                const target = $(e.target).closest("button");
                switchTheme(target.attr("id"));
            });
        });

        const myLocalStorage = new LocalStorageService();

        if (myLocalStorage.getItem('theme'))
            switchTheme(myLocalStorage.getItem('theme'));

        return {
            setCurrentDate,
            switchTheme,
            myLocalStorage
        }
    })(jQuery, moment);

