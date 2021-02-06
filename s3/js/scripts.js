/*!
    * Start Bootstrap - Freelancer v6.0.5 (https://startbootstrap.com/theme/freelancer)
    * Copyright 2013-2020 Start Bootstrap
    * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-freelancer/blob/master/LICENSE)
    */
    (function($) {
    "use strict"; // Start of use strict
    var apigClient = apigClientFactory.newClient();
    $('#spinnerGenerate').hide()
    $('#spinnerUpload').hide()

    //Generate button
    $('#generateButton').click(async function() {
      event.preventDefault();
      $('#spinnerGenerate').show()
      $('#textGenerate').hide()

      var campus = $('#campusHelp').val()
      var student = await apigClient.rootGet({campus: campus}, {campus: campus}, {campus: campus})

      console.log(student)

      $('#generateTicketModal').modal('show');
      $('#spinnerGenerate').hide()
      $('#textGenerate').show()

      $('#studentContact').text(student.data.contact)
    })

    //Register new student
    $( "#registerForm" ).submit(async function( event ) {
      event.preventDefault();
      $('#spinnerUpload').show()
      $('#textUpload').hide()

      var response = await apigClient.rootPost({}, {'email':$('#email').val(),
        'ticketsLeft': $('#quantity').val(),
        'contact':$('#contact').val(),
        'campus': $('#campus').val()}, {})

      if(response.data.hasOwnProperty('errorMessage')){
        $('#erroModal').modal('show');
      }else{
        $('#successModal').modal('show');
      }

      $('#spinnerUpload').hide()
      $('#textUpload').show()

    });

    //On modal close refresh page
    $('#successModal').on('hide.bs.modal', function() {
      location.reload();
    });

    $('#errorModal').on('hide.bs.modal', function() {
      location.reload();
    });

    // Smooth scrolling using jQuery easing
    $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
      if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        if (target.length) {
          $('html, body').animate({
            scrollTop: (target.offset().top - 71)
          }, 1000, "easeInOutExpo");
          return false;
        }
      }
    });

    // Scroll to top button appear
    $(document).scroll(function() {
      var scrollDistance = $(this).scrollTop();
      if (scrollDistance > 100) {
        $('.scroll-to-top').fadeIn();
      } else {
        $('.scroll-to-top').fadeOut();
      }
    });

    // Closes responsive menu when a scroll trigger link is clicked
    $('.js-scroll-trigger').click(function() {
      $('.navbar-collapse').collapse('hide');
    });

    // Activate scrollspy to add active class to navbar items on scroll
    $('body').scrollspy({
      target: '#mainNav',
      offset: 80
    });

    // Collapse Navbar
    var navbarCollapse = function() {
      if ($("#mainNav").offset().top > 100) {
        $("#mainNav").addClass("navbar-shrink");
      } else {
        $("#mainNav").removeClass("navbar-shrink");
      }
    };
    // Collapse now if page is not at top
    navbarCollapse();
    // Collapse the navbar when page is scrolled
    $(window).scroll(navbarCollapse);


  })(jQuery); // End of use strict
