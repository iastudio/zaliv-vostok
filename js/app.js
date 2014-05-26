
$.modal.defaults = {
  overlay: "#000",        // Overlay color
  opacity: 0.75,          // Overlay opacity
  zIndex: 100,              // Overlay z-index.
  escapeClose: true,      // Allows the user to close the modal by pressing `ESC`
  clickClose: true,       // Allows the user to close the modal by clicking the overlay
  closeText: 'Закрыть',     // Text content for the close <a> tag.
  closeClass: '',         // Add additional class(es) to the close <a> tag.
  showClose: true,        // Shows a (X) icon/link in the top-right corner
  modalClass: "modal",    // CSS class added to the element being displayed in the modal.
  spinnerHtml: null,      // HTML appended to the default spinner during AJAX requests.
  showSpinner: true,      // Enable/disable the default spinner during AJAX requests.
  fadeDuration: 100,     // Number of milliseconds the fade transition takes (null means no transition)
  fadeDelay: 1.0          // Point during the overlay's fade-in that the modal begins to fade in (.5 = 50%, 1.5 = 150%, etc.)
};

var chosenOpts = {
    width: "300px",
    disable_search: true
};

var checkCount = 0;


jQuery(document).ready(function(){

    //////////////////////////
    //  FILE UPLOADING BTN  //
    //////////////////////////

    $(document).find('.uploadBtn').each(function() {
        $(this).on('change', function() {
            var that = $(this);
            that.parent().siblings('.uploadFile').val( that.val() );
        })
    })

	////////////////////////
	//  PLACEHOLDERS FIX  //
	////////////////////////

	if ($.fn.placeholder.input && $.fn.placeholder.textarea) {
	} else if ($.fn.placeholder.input) {
		$('textarea').placeholder();
	} else {
		$('input, textarea').placeholder();
	}

	////////////////////////
	//  FORMS VALIDATION  //
	////////////////////////

	// $('a.submit').click(function(e) {
	// 	e.preventDefault();
	// 	$(this).parent().submit();
	// });

	// $('form').each(function() {
    //        $(this).validate({
    //            errorPlacement: $.noop
	//      // submitHandler: function(form) {
	// 		//     $(form).submitForm();
	// 		// }
    //        });
    //    });

    //////////////
    //  SELECT  //
    //////////////

    $('select').chosen(chosenOpts);

    //////////////
    //  PHOTOS  //
    //////////////

    $('.thumbs a').click(function(e) {
        e.preventDefault();
        var href = $(this).attr('href');
        $('a.main-photo img').attr("src", href);
        $('a.main-photo').attr("href", href);
    });

    ////////////////////
    //  MULTI-FIELDS  //
    ////////////////////

    $('.multiFields').on('click', '.addItem label.addEvent', function(e) {
        e.preventDefault();
        $(this).parent().parent().find('.addItem:hidden:first').show();
    });

    $('.addItem').on('click', 'label.rmEvent', function(e) {
        e.preventDefault();
        $(this).parent().hide();
    });

    //////////////////
    //  DATEPICKER  //
    //////////////////

    $('input.date').pickmeup({
        position        : 'right',
        hide_on_select  : true,
        format          : 'd.m.Y',
        locale          : {
            days        : ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'],
            daysShort   : ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
            daysMin     : ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
            months      : ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
            monthsShort : ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек']
        }
    });

    var date = $('input.date').pickmeup('get_date', true);
    $('input.date').val(date);

    $('i.calendar').on('click', function(e) {
        $(this).prev('input.date').pickmeup('show');
    });

    $('input.date').on('click', function(e) {
        $(this).pickmeup('show');
    });

    //////////////////
    //  CHECKBOXES  //
    //////////////////

    $('table .check input[type=checkbox].single').on( 'change', countChecked );
    $('table .check input[type=checkbox].overall').on( 'change', toggleAll );

});

////////////////////////////
//  CHECKBOXES FUNCTIONS  //
////////////////////////////

var countChecked = function() {
    var button = $('button.counter');
    var n = $( "input.single:checked" ).length;
    button.find('span').html(n);
    if (n > 0)
        button.removeClass('disabled');
    else
        button.addClass('disabled');
};

var toggleAll = function() {
    $('table .check input[type=checkbox].single').prop('checked', $(this).is(':checked'));
    countChecked();
};

/////////////////////////
//  BROWSER DETECTION  //
/////////////////////////

var BrowserDetect = 
{
    init: function () 
    {
        this.browser = this.searchString(this.dataBrowser) || "Other";
        this.version = this.searchVersion(navigator.userAgent) ||       this.searchVersion(navigator.appVersion) || "Unknown";
    },

    searchString: function (data) 
    {
        for (var i=0 ; i < data.length ; i++)   
        {
            var dataString = data[i].string;
            this.versionSearchString = data[i].subString;

            if (dataString.indexOf(data[i].subString) != -1)
            {
                return data[i].identity;
            }
        }
    },

    searchVersion: function (dataString) 
    {
        var index = dataString.indexOf(this.versionSearchString);
        if (index == -1) return;
        return parseFloat(dataString.substring(index+this.versionSearchString.length+1));
    },

    dataBrowser: 
    [
        { string: navigator.userAgent, subString: "Chrome",  identity: "Chrome" },
        { string: navigator.userAgent, subString: "MSIE",    identity: "Explorer" },
        { string: navigator.userAgent, subString: "Firefox", identity: "Firefox" },
        { string: navigator.userAgent, subString: "Safari",  identity: "Safari" },
        { string: navigator.userAgent, subString: "Opera",   identity: "Opera" }
    ]

};

BrowserDetect.init();