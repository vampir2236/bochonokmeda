<html>

<head>
    <title>Бочонок мёда</title>
</head>
<body>
    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="width: 100%; height: 100%; background-color: #ffc24c; color: #b05b00; font-size: 16px; font-family: Georgia, serif; padding: 50px">
        <tr>
            <td align="center">

                <table cellpadding="0" cellspacing="0" border="0" width="700" style="background-color: #ffdb96; padding: 10px; border-radius: 5px; box-shadow: 0 0 5px #b05b00;">
                    <tr>
                        <td style="border-bottom: 1px dotted #b05b00; padding: 10px; text-align: center;">
                            <a href="//bochenokmeda.ru" style="font-weight: bold; border-bottom: 2px dashed #b05b00; text-decoration: none; color: #b05b00;">Бочонок мёда</a>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 10px;">Ваш заказ принят, в течении дня с Вами свяжется наш менеджер</td>
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
                        <td style="border-top: 1px dotted #b05b00; padding: 10px; text-align: center; text-transform: uppercase;">Спасибо за покупку</td>
                    </tr>
                </table>

            </td>
        </tr>
    </table>
</body>

</html>