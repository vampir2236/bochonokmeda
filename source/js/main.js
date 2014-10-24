/*global jQuery, Handlebars*/
(function ($, Handlebars) {
    'use strict';


    var app = (function () {

        var cart;

        return {


            // переменные
            $spinners: null,
            $productSum: null,
            $cartValue: null,
            $productTotalSum: null,


            // инициализация модуля
            init: function () {
                // получаем список товаров
                this.getData();
            },


            // получение списка товаров
            getData: function () {
                $.ajax({
                    url: 'products.json',
                    type: 'get',
                    dataType: 'json',
                    context: this
                })
                    .done(function (data) {
                        var _this = this;

                        _this.initCart(data);
                        _this.fillProducts();
                        _this.setEventListeners();
                    })
                    .fail(function () {
                        $('.products__wrapper')
                            .append('<p class="lead text-center">Возникла ошибка при получении списка товаров. Обновите страницу.</p>');
                    });
            },


            // инициализация корзины
            initCart: function (data) {
                cart = data;
                cart.totalSum = 0;

                cart.products.forEach(function (item) {
                    item.quant = 0;
                    item.sum = 0;
                });
            },


            // обновить состояние корзины
            updateCart: function () {
                cart.totalSum = cart.products.reduce(function (sum, item) {
                    item.sum = item.quant * item.price;

                    if (isNaN(item.sum)) {
                        item.sum = 0;
                    }

                    return sum + item.sum;
                }, 0);
            },


            // заполнить шаблоны с продуктами
            fillProducts: function () {
                var _this = this,
                    productsTemplate = Handlebars.compile($('#products-template').html()),
                    modalTemplate = Handlebars.compile($('#modal-template').html());

                // заполнение шаблонов
                $('.products__wrapper').html(productsTemplate(cart));
                $('.modal__wrapper').html(modalTemplate(cart));

                // кэшируем переменные
                _this.$cartValue = $('.cart__value');
                _this.$spinners = $('.spinner');
                _this.$productSum = $('.product__sum');
                _this.$productTotalSum = $('.product__total-sum');

                // отображаем сумму заказа
                _this.$cartValue.text(_this.getCartValue(cart.totalSum));
                _this.$productTotalSum.text(cart.totalSum);

                // инициализируем спиннеры в шаблонах
                _this.$spinners.spinner({
                    min: 0,
                    max: 20,
                    icons: {
                        down: 'glyphicon glyphicon-chevron-down',
                        up: 'glyphicon glyphicon-chevron-up'
                    }
                });
                // убираем стандартный текст спиннеров
                $('.ui-icon').text('');
            },


            // обработчики событий
            setEventListeners: function () {
                var _this = this;

                $('.ui-spinner-button').on('click', $.proxy(_this.spinnerBtnClick, _this));
                _this.$spinners.on('change', $.proxy(_this.spinnerOnChange, _this));
            },


            // вызываем событие change у спинеров
            spinnerBtnClick: function (e) {
                $(e.target).closest('.ui-spinner').find('.spinner').trigger('change');
            },


            // изменение значения спиннера
            spinnerOnChange: function (e) {
                var _this = this,
                    $spinner = $(e.target),
                    value = $spinner.val(),
                    index = $spinner.data('id');

                cart.products[index].quant = value;
                _this.updateCart();

                // синхронизируем данные
                _this.$spinners.not($spinner).filter('[data-id=' + index + ']').val(value);
                _this.$productSum.filter('[data-id=' + index + ']')
                    .text('* ' + cart.products[index].price + ' = ' + cart.products[index].sum + ' руб.');

                // отображаем сумму заказа
                _this.$cartValue.text(_this.getCartValue(cart.totalSum));
                _this.$productTotalSum.text(cart.totalSum);
            },


            // заголовок корзины
            getCartValue: function (value) {
                if (value === 0) {
                    value = 'Ваша корзина пуста';
                } else {
                    value = 'Сумма заказа  ' + value + ' руб.';
                }
                return value;
            }
        };
    })();

    app.init();

})(jQuery, Handlebars);