$(document).ready(_ => {

    // Menu 
    const menuBodyWidth = $('#menu-body').outerWidth();
    let active = false;

    function activeMenu() {
        $('#menu-toggle').css('display', 'none');

        $('#menu').animate({
            left: 0
        }, 700)

        active = !active;
    }
    function unActiveMenu() {
        $('#menu-toggle').css('display', 'flex');
        $('#menu').animate({
            left: -menuBodyWidth,
        }, 700)

        active = !active;
    }

    $('#menu-toggle').click(function () {
        if (!active) {
            activeMenu();
        } else {
            unActiveMenu();
        }
    });

    $('#close-menu').click(function () {
        unActiveMenu();
    });

    $('#menu-body li a').click(function (e) {
        $('html , body').animate({
            scrollTop: $($(this).attr('href')).offset().top,
        }, 1000, _ => unActiveMenu());

    })

    $(window).scroll(function () {

        let scrollVal = $(window).scrollTop();
        if (scrollVal < $('#home').outerHeight()) {
            $('#menu-toggle').css('color', '#fff');
        }
        else if ((scrollVal >= ($('#details').offset().top - 50)) &&
            scrollVal < ($('#details').offset().top + $('#details').outerHeight())) {
            $('#menu-toggle').css('color', 'rgb(var(--mainColor)');
        }
        else if ((scrollVal >= $('#duration').offset().top - 50) &&
            scrollVal < ($('#duration').offset().top - 50 + $('#duration').outerHeight())) {
            $('#menu-toggle').css('color', '#fff');
        }
        else {
            $('#menu-toggle').css('color', 'rgb(var(--mainColor)');
        }
    });
    // Menu 

    // Details
    $('#details .accordion-item .head-singer').click(function () {
        $(this).siblings('p').slideToggle(500);
        $(this).parent().siblings().children('p').slideUp(500);
    });
    // Details

    // Duration
    let days, hours, minutes, seconds;
    let durationID;

    function HandleDate(TargetDate) {
        const DiffDate = TargetDate - new Date().getTime();
        days = Math.floor((DiffDate / (1000 * 60 * 60 * 24))); //Calc Number Of Days 
        $('#durDays').text(days); // set Days To DOM

        hours = Math.floor((DiffDate % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)); // Calc Number Of Hours 
        // Get Remainder Number From Days Thats Will Be Number Of hours In MSeconds
        $('#durHours').text(hours); // set Hours To DOM

        minutes = Math.floor((DiffDate % (1000 * 60 * 60)) / (1000 * 60)); //Calc Number Of Minutes
        //Get Remainder Number From Hours Thats Will Be Number Of Minutes In MSeconds              
        $('#durMinutes').text(minutes); // set Minutes To DOM

        seconds = Math.floor((DiffDate % (1000 * 60)) / (1000)); // Calc Number Of Seconds
        // Get Remainder Number From Minutes Thats Will Be Number Of Seconds In MSeconds 
        $('#durSeconds').text(seconds); // set Seconds To DOM

        // Create inteval To Start Duration Count
        durationID = setInterval(setSeconds, 1000);
    }

    // Handle Seconds Func
    function setSeconds() {
        if (seconds <= 0) {
            seconds = 60;
            if (setMinutes() == 'finish') { // if get null That's mean finish timer  
                eventDone(); // Finich Event
                return;
            }
        }
        else {
            seconds--;
            $('#durSeconds').text(seconds);
        }
    }

    // Handle Minutes Func
    function setMinutes() {
        if (minutes == 0) {
            minutes = 59;
            if (setHourse() == 'finish') { // if get Null
                return 'finish';// return null to finish Hours
            }
        }
        minutes--;
        $('#durMinutes').text(minutes);
    }

    // Handle Hours Func
    function setHourse() {
        if (hours == 0) {
            hours = 24;
            if (setDays() == 'finish') { // if get null
                return 'finish'; // return null to finish hours
            }
        }
        hours--;
        $('#durHours').text(hours);
    }

    // Handle Days Func
    function setDays() {
        if (days == 0) {
            return 'finish'; // return null to finish days;
        }
        days--;
        $('#durDays').text(days);
    }

    // Handle Event Finish
    function eventDone() {
        clearInterval(durationID);
        // Type Done Word
        console.log($('#durDays').parent().html('D'));
        console.log($('#durHours').parent().html('O'));
        console.log($('#durMinutes').parent().html('N'));
        console.log($('#durSeconds').parent().html('E'));
    }

    HandleDate(new Date(2022, 11, 20, 20, 2).getTime());

    // Duration

    // Form Validation
    let validData = true;

    $('#userMsg').on('input', e => {
        let msgLength = e.target.value.length;


        if (msgLength > 100) {
            $('#submitMsg').attr('disabled', true);
            $('#validate-msg span').text('your available character finished');
        } else {
            $('#validate-msg span').text(100 - msgLength);
            $('#submitMsg').removeAttr('disabled');

        }
    })

    // Form Validation
});