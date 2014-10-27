<html>

<head>
    <title>Новый заказ</title>
    <style>
        html,
        body {
            color: #b05b00;
            font: 16px Georgia, "Century Schoolbook L", Serif;
            height: 100%;
            width: 100%;
        }
        body {
            background-color: #ffc24c;
        }
        .content {
            background-color: #ffdb96;
            border-radius: 5px;
            box-shadow: 0 0 5px #b05b00;
            padding: 10px;
        }
        .title {
            border-bottom: 1px dotted #b05b00;
            font-weight: bold;
            padding: 10px;
            text-align: center;
        }
        .products {
            border-spacing: 0;
            margin: 0 auto;
            padding: 30px 0;
        }
        .products td,
        .products th {
            padding: 5px 10px;
        }
        thead th {
            border-bottom: 1px dotted #b05b00;
        }
        tfoot td {
            border-top: 1px dotted #b05b00;
            font-weight: bold;
        }
        .customer {
            border-top: 1px dotted #b05b00;
            padding: 10px;
        }
        .customer table {
            border-bottom: 1px dotted #b05b00;
            margin: 0 auto;
        }
        .customer table td {
            padding: 5px 15px;
        }
    </style>
</head>

<body>
    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="width: 100%; height: 100%; background-color: #ffc24c; color: #b05b00; font-size: 16px; font-family: Georgia, serif; padding: 50px">
        <tr>
            <td align="center">

                <table cellpadding="0" cellspacing="0" border="0" width="700" style="background-color: #ffdb96; padding: 10px; border-radius: 5px; box-shadow: 0 0 5px #b05b00;">
                    <tr>
                        <td style="border-bottom: 1px dotted #b05b00; font-weight: bold; padding: 10px; text-align: center;">Новый заказ</td>
                    </tr>
                    <tr>
                        <td>
                            <table style="border-spacing: 0; margin: 0 auto; padding: 30px 0;">
                                <thead>
                                    <tr>
                                        <th style="padding: 5px 10px; border-bottom: 1px dotted #b05b00;">Наименование</th>
                                        <th style="padding: 5px 10px; border-bottom: 1px dotted #b05b00;">Цена</th>
                                        <th style="padding: 5px 10px; border-bottom: 1px dotted #b05b00;">Количество</th>
                                        <th style="padding: 5px 10px; border-bottom: 1px dotted #b05b00;">Стоимость</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {foreach from=$products item=i}
                                    {if $i.quant > 0}
                                    <tr>
                                        <td style="padding: 5px 10px;">{$i.title}</td>
                                        <td style="padding: 5px 10px;" align="right">{number_format($i.price, 2, '.', ' ')} {$i.currency}</td>
                                        <td style="padding: 5px 10px;" align="center">{$i.quant} {$i.unit}</td>
                                        <td style="padding: 5px 10px;" align="right">{number_format($i.sum, 2, '.', ' ')} {$i.currency}</td>
                                    </tr>
                                    {/if}
                                    {/foreach}
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td style="padding: 5px 10px; border-top: 1px dotted #b05b00; font-weight: bold;" colspan="3">Итого</td>
                                        <td style="padding: 5px 10px; border-top: 1px dotted #b05b00; font-weight: bold;" align="right">{number_format($totalSum, 2, '.', ' ')} руб.</td>
                                    </tr>
                                </tfoot>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td style="border-top: 1px dotted #b05b00; padding: 10px;">
                            <table style="border-bottom: 1px dotted #b05b00; margin: 0 auto;">
                                <tr>
                                    <td style="border-bottom: 1px dotted #b05b00; font-weight: bold; text-align: center; padding: 5px 15px;" colspan="2">Заказчик</td>
                                </tr>
                                <tr>
                                    <td style="padding: 5px 15px;">Имя</td>
                                    <td style="padding: 5px 15px;">{$contacts['name']}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 5px 15px;">Телефон</td>
                                    <td style="padding: 5px 15px;">{$contacts['phone']}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 5px 15px;">Email</td>
                                    <td style="padding: 5px 15px;">{$contacts['email']}</td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>

</html>