let helper =
    (function($) {

        class HandleBarHelper {

            constructor(){
                this.orderBy = 'rate';
                this.filterBy = '';
                this.templateId = "task-template";
                this.containerId = 'main-container';
                this.data = [];
            }

            renderTodos() {
                let source = this.getTemplate(this.templateId);
                let template = this.renderTemplate(source);
                this.append(this.containerId, template(this.data));
            };

            getTemplate(id) {
                return $(`#${id}`).html();
            };

            renderTemplate(template) {
                return Handlebars.compile(template);
            };

            append (place, domElement) {
                $(`#${place}`).html(domElement);
            };

            setOrderBy(type) {
                this.orderBy = type;
            };

            setFilterBy(type) {
                this.filterBy = type;
            };

            setTemplateId(id) {
                this.templateId = id;
            };

            setContainerId(id) {
                this.containerId = id;
            };

            setData(data) {
                this.data = data;
            }
        }

        Handlebars.registerHelper("formatDate", function (datetime, format) {
            if (moment) {
                if (!datetime) {
                    return '';
                }
                return moment(datetime).format(format);
            }
            else {
                return datetime;
            }
        });

        Handlebars.registerHelper("eq", function (a, b) {
            return a == b;
        });

        Handlebars.registerHelper("checkedIf", function (condition) {
            return (condition) ? "checked" : "";
        });

        Handlebars.registerHelper("ratings", function (rate) {
            let result = '';
            result += '<i class="fas fa-star"></i>'.repeat(rate);
            result += '<i class="far fa-star"></i>'.repeat(3-rate);
            return result;
        });

        return new HandleBarHelper();

    })(jQuery);