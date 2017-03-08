window.onload = function () {
  (function ($) {
    $.datepicker.regional['ru'] = {
      closeText: 'Закрыть',
      prevText: '&#x3c;Пред',
      nextText: 'След&#x3e;',
      currentText: 'Сегодня',
      monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
        'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
      monthNamesShort: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн',
        'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
      dayNames: ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'],
      dayNamesShort: ['вск', 'пнд', 'втр', 'срд', 'чтв', 'птн', 'сбт'],
      dayNamesMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
      weekHeader: 'Не',
      dateFormat: 'dd-mm-yy',
      firstDay: 1,
      isRTL: false,
      showMonthAfterYear: false,
      yearSuffix: ''
    };
    $.datepicker.setDefaults($.datepicker.regional['ru']);

    $('#birth').datepicker();
    function onAjaxSuccess(data) {
      if (data.result) {
        $('input[type!=button], select, textarea').removeClass().addClass('success');
        $('.errorBlock').css('display', 'none').html('');
      } else {
        errors = data.error;
        console.log(errors);
        $('input[type!=button], select, textarea').removeClass().addClass('success');
        $('.errorBlock').css('display', 'none').html('');
        $.each(errors, function (key, val) {
          key = '#' + key.toLowerCase().replace(' ', '_');
          $(key).removeClass().addClass('error');
          $('#error').html(val).dialog();
          $(key).effect('bounce');
        });
      }
    }

    $('#submit').on('click', function () {
      var request = $('form').serializeArray();
      $.post(
        'validator.php',
        request,
        onAjaxSuccess,
        'json'
      );
    });
  })(jQuery);
};