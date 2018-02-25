/* Ждем пока страница полностью загрузится */
$(document).ready(function() {
    /* Левая стрелка нажата */
    $('.slider__controls-previous').click(function(e) {
      e.preventDefault();
        /* Перебираем все слайды в цикле */
        $('.slider__items-item').each(function(index) {
            var $currentElement = $(this);
            /* если находим активный сейчас слайд (с классом slider__items-item_active) */
            if ($currentElement.hasClass('slider__items-item_active')) {
                /* то удаляем у него этот класс и делаем его неактивным */
                $currentElement.removeClass('slider__items-item_active');
                /* Проверяем, есть ли у него сосед слева */
                if ($currentElement.prev().length > 0) {
                    /* сосед есть - отлично :) делаем его активным (ставим класс slider__items-item_active) */
                    $currentElement
                        .prev()
                        .addClass('slider__items-item_active');
                    /* если соседа слева нет :(, то перескакиваем в самый конец, на последний слайд и делаем его активным (ставим класс slider__items-item_active) */
                } else {
                    $('.slider__items-item')
                        .last()
                        .addClass('slider__items-item_active');
                }
                /* Заканчиваем перебирать слайды. Мы все сделали и больше нам ничего не нужно! */
                return false;
            }
        });
    });

    /* Для правой стрелки все тоже самое, что и для левой ;) */
    $('.slider__controls-next').click(function(e) {
      e.preventDefault();
        $('.slider__items-item').each(function(index) {
            var $currentElement = $(this);
            if ($currentElement.hasClass('slider__items-item_active')) {
                $currentElement.removeClass('slider__items-item_active');
                if ($currentElement.next().length > 0) {
                    $currentElement
                        .next()
                        .addClass('slider__items-item_active');
                } else {
                    $('.slider__items-item')
                        .first()
                        .addClass('slider__items-item_active');
                }
                return false;
            }
        });
    });

    /*
    Этот блок отвечает за "листание" слайдов автоматически.

    Основная идея: листать слайды автоматом, но выключать
    автоматическую "листалку" когда человек
    наводит мышкой на слайдер (и включать обратно, когда мышка "ушла со слайдера").
    */

    /*
    Здесь мы храним ссылку на листатель слайдов,
    чтобы можно было его перезапускать.
    */
    var slideChangeControl;

    /* Запускаем листалку слайдов */
    autoSlidesDisplay();

    /* Мышка на слайдере - отключаем */
    $('.slider').on('mouseover', function() {
        clearInterval(slideChangeControl);
    })
    /* Мышка ушла со слайдера - включаем обратно :) */
    $('.slider').on('mouseout', function() {
        autoSlidesDisplay();
    })

    /*
    Сам "листатель".
    Здесь просто задается интервал смены слайдов в секундах
    и нажимается правая "стрелка" на слайдере. Так и листаем :D
    */

    function autoSlidesDisplay() {
        slideChangeControl = setInterval(function() {
            $('.slider__controls-next').click();
        }, 3000);
    }
});
