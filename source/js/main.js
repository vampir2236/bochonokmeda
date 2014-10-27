/*global jQuery, Handlebars*/
(function ($, Handlebars) {
    'use strict';


    var app = (function () {

        var cart, popover;

        return {


            // переменные
            $spinners: null,
            $cartValue: null,
            $products: null,
            $productSum: null,
            $productTotalSum: null,
            $contactsForm: null,
            $contactsName: null,
            $contactsPhone: null,
            $contactsEmail: null,
            $cartModal: null,
            $confirmModal: null,

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

                _this.cacheElements();

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

                // создание тултипов для валидации данных
                _this.createValidationTooltips();

                // маска для ввода телефона
                _this.$contactsPhone.mask('+7 (000) 000 00 00');

                // отображаем сумму заказа
                _this.$cartValue.text(_this.getCartValue(cart.totalSum));
                _this.$productTotalSum.text(cart.totalSum);
            },


            // кэшируем переменные
            cacheElements: function () {
                var _this = this;

                _this.$cartValue = $('.cart__value');
                _this.$spinners = $('.spinner');
                _this.$products = $('.cart-products__list');
                _this.$productSum = $('.cart-products__sum');
                _this.$productTotalSum = $('.cart-products__total-sum');
                _this.$contactsForm = $('.contacts__form');
                _this.$contactsName = $('.contacts__name');
                _this.$contactsPhone = $('.contacts__phone');
                _this.$contactsEmail = $('.contacts__email');
                _this.$cartModal = $('#cart-modal');
                _this.$confirmModal = $('#confirm-modal');
            },


            // создание тултипов для валидации данных
            createValidationTooltips: function () {
                var _this = this;

                _this.$products.tooltip({
                    title: 'Выберите товар',
                    trigger: 'manual'
                });
                _this.$contactsName.tooltip({
                    title: 'Введите Ваше имя',
                    trigger: 'manual'
                });
                _this.$contactsPhone.tooltip({
                    title: 'Введите Ваш телефон',
                    trigger: 'manual'
                });
                _this.$contactsEmail.tooltip({
                    title: 'Введите Ваш email',
                    trigger: 'manual'
                });
                _this.$contactsForm.tooltip({
                    title: 'Ваш заказ не был принят. Возможно возникли технические неполадки. Попробуйте повторить заказ еще раз.',
                    trigger: 'manual'
                });
            },


            // скрытие тултипов валидации
            hideValidationTooltips: function () {
                var _this = this;

                _this.$products.tooltip('hide');
                _this.$contactsName.tooltip('hide');
                _this.$contactsPhone.tooltip('hide');
                _this.$contactsEmail.tooltip('hide');
                _this.$contactsForm.tooltip('hide');
            },


            // обработчики событий
            setEventListeners: function () {
                var _this = this;

                $('.ui-spinner-button').on('click', $.proxy(_this.spinnerBtnClick, _this));
                _this.$spinners.on('change', $.proxy(_this.spinnerOnChange, _this));
                $('.modal__order').on('click', $.proxy(_this.buyProducts, _this));
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


            // заказаз товара
            buyProducts: function (e) {
                var _this = this,
                    data;

                e.preventDefault();

                // проверка входных данных
                if (!_this.validate()) {
                    return;
                }

                console.log(cart);
                $(e.target).attr('disabled', 'disabled');
                // запрос на сервер
                $.ajax({
                    url: 'buyProducts.php',
                    type: 'post',
                    context: _this,
                    data: JSON.stringify(cart)
                })
                    .done(function (data) {
                        var _this = this;

                        _this.$cartModal.modal('hide');
                        _this.$confirmModal.modal('show');
                    })
                    .fail(function (data) {
                        console.log(data);
                        _this.$contactsForm.tooltip('show');
                    })
                    .always(function () {
                        $(e.target).removeAttr('disabled');
                    });
            },


            // проверка введенных данных
            validate: function () {
                var _this = this;

                _this.hideValidationTooltips();

                // счтитываем контактную информацию
                cart.contacts = {
                    name: _this.$contactsName.val(),
                    phone: _this.$contactsPhone.val(),
                    email: _this.$contactsEmail.val()
                };

                if (!cart.totalSum) {
                    _this.$products.tooltip('show');
                    return false;
                }

                if (!cart.contacts.name) {
                    _this.$contactsName.tooltip('show');
                    return false;
                }

                if (!/^\+7\s\(\d{3}\)\s\d{3}\s\d{2}\s\d{2}$/.test(cart.contacts.phone)) {
                    _this.$contactsPhone.tooltip('show');
                    return false;
                }

                if (!/.+@.+\..+/.test(cart.contacts.email)) {
                    _this.$contactsEmail.tooltip('show');
                    return false;
                }

                return true;
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