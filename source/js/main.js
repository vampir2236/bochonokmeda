/*global jQuery, Handlebars*/
(function ($, Handlebars) {
    'use strict';

    var app = (function () {

        return {
            // инициализация модуля
            init: function () {
                var that = this;

                // получаем список товаров
                that.getGoodsList();
                that.setupListeners();
            },

            // инициализация спинеров
            initSpinners: function () {
                var $spinners = $('.spinner');

                if ($spinners.length) {
                    $spinners.spinner({
                        min: 0,
                        max: 20,
                        icons: {
                            down: 'glyphicon glyphicon-chevron-down',
                            up: 'glyphicon glyphicon-chevron-up'
                        }
                    });

                    // удаляем стандартные стрелки спинера
                    $('.ui-icon').text('');
                }
            },

            // получить список товаров
            getGoodsList: function () {
                $.ajax({
                    url: 'goods.json',
                    type: 'GET',
                    dataType: 'json',
                    context: this
                })
                    .done(function (data) {
                        var that = this,
                            source = $('#goods-template').html(),
                            template = Handlebars.compile(source),
                            html = template(data);

                        $('.goods__list').append(html);

                        // спинеры
                        that.initSpinners();
                    })
                    .fail(function (x, s, error) {
                        $('.goods__list').append('<p>Возникла ошибка при получении списка товаров!</p>');
                    });
            },

            // установка обработчиков событий
            setupListeners: function () {

            },

            // добавить товар в корзину
            addToCart: function () {

            },

            // удалить товар из корзины
            deleteFromCart: function () {

            }
        };
    })();

    app.init();
})(jQuery, Handlebars);