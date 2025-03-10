(function ($) {
    "use strict";
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 200) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });
    
    
    // Dropdown on mouse hover
    $(document).ready(function () {
        function toggleNavbarMethod() {
            if ($(window).width() > 992) {
                $('.navbar .dropdown').on('mouseover', function () {
                    $('.dropdown-toggle', this).trigger('click');
                }).on('mouseout', function () {
                    $('.dropdown-toggle', this).trigger('click').blur();
                });
            } else {
                $('.navbar .dropdown').off('mouseover').off('mouseout');
            }
        }
        toggleNavbarMethod();
        $(window).resize(toggleNavbarMethod);
    });


    // Testimonials carousel
    $(".testimonials-carousel").owlCarousel({
        autoplay: true,
        dots: true,
        loop: true,
        responsive: {
            0:{
                items:1
            },
            576:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:3
            }
        }
    });
    
    
    // Portfolio isotope and filter
    var portfolioIsotope = $('.portfolio-container').isotope({
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
    });

    $('#portfolio-flters li').on('click', function () {
        $("#portfolio-flters li").removeClass('filter-active');
        $(this).addClass('filter-active');

        portfolioIsotope.isotope({filter: $(this).data('filter')});
    });


    
        
       
    
})(jQuery);


$(document).ready(function() {
    $('.submit').on('click', function(event) {
        event.preventDefault(); // Prevent form submission

        // Disable the submit button to prevent multiple clicks
        $(this).prop('disabled', true);

        // Get values from the form fields
        var service = $('.service').val();
        var number = $('.number').val();
        var name = $('.name').val();
        var comment = $('.comment').val();
        var email = $('.email').val();

        var serviceid = "service_dq69phn";
        var templateid = "template_2v4oa31";
        var userid = "dzcfZdSpSzoeUbIr0";
        var admin = "tcleaninglogistics@gmail.com";


        // Define the parameters for the user email
        var emailParams = {
            service_id: serviceid, // Replace with your service ID
            template_id: templateid, // Replace with your template ID
            user_id: userid, // Replace with your Public Key
            template_params: {
                from_name: "T cleaning and logistics",
                to_name: name,
                message: `We responded to your services: ${service} and Comment: ${comment}`,
                receiver: email,
                reply_to: email
            }
        };

        // Define the parameters for the admin email
        var AdminemailParams = {
            service_id: serviceid, // Replace with your service ID
            template_id: templateid, // Replace with your template ID
            user_id: userid, // Replace with your Public Key (should be the same as above)
            template_params: {
                from_name: name,
                to_name: "You",
                message: `${name} requested for services: ${service} with Comment: ${comment}. Tel: ${number}`,
                receiver: admin, // Admin email
                reply_to: admin // Admin email
            }
        };

        // Function to send an email
        function sendEmail(params) {
            return $.ajax({
                type: "POST",
                url: "https://api.emailjs.com/api/v1.0/email/send",
                data: JSON.stringify(params),
                contentType: "application/json"
            });
        }

        // Send both emails using Promise.all
        Promise.all([
            sendEmail(AdminemailParams),
            sendEmail(emailParams)
        ])
        .then(function(responses) {
            console.log("Both emails sent successfully!", responses);
            alert("Emails sent successfully! Check your email.");
        })
        .catch(function(error) {
            console.error("Failed to send one or more emails.", error);
            alert("Failed to send one or more emails. Please try again.");
        })
        .finally(function() {
            // Re-enable the submit button
            $('.submit').prop('disabled', false);
        });
    });
});





