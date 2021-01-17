/*jshint browser: true, devel: true, jquery: true*/

// Active pathway tiles
function changePage(page){
    window.location.pathname = page;
}
function changePageExternal(url) {
    window.location = url;
}




$(document).ready(function () {
    
    // UNMOD TESTING FUNCTIONALITY
    // Add url fragment to pages for user testing.
    var task = localStorage.getItem('task');
    var task1 = localStorage.getItem('Task 1 Accordion');
    var task2 = localStorage.getItem('Task 2 Accordion');
    
    if ($('.guide-main-section').hasClass('task1')) {
        localStorage.setItem('task', 1);
        localStorage.setItem('Task 2 Accordion', 'false');
        
        if (task1 == 'true') {
            window.location.hash = 'accordion-click'; 
        }
    } else if ($('.guide-main-section').hasClass('task2')) {
        localStorage.setItem('task', 2);
        localStorage.setItem('Task 1 Accordion', 'false');
        
        if (task2 == 'true') {
            window.location.hash = 'accordion-click'; 
        }
    } else if ($('.guide-main-section').hasClass('task3')){
        localStorage.setItem('task', 0);
        localStorage.setItem('Task 1 Accordion', 'false');
        localStorage.setItem('Task 2 Accordion', 'false');
    } else if ($('.guide-main-section').hasClass('task4')){
        localStorage.setItem('task', 0);
        localStorage.setItem('Task 1 Accordion', 'false');
        localStorage.setItem('Task 2 Accordion', 'false');
    } else if ($('.guide-main-section').hasClass('task5')){
        localStorage.setItem('task', 0);
        localStorage.setItem('Task 1 Accordion', 'false');
        localStorage.setItem('Task 2 Accordion', 'false');
    } else if ($('.guide-main-section').length === 0) {
        if (task1 == 'true' && task === '1') {
            window.location.hash = 'accordion-click'; 
        } else if (task2 == 'true' && task === '2') {
            window.location.hash = 'accordion-click'; 
        }
    }
    
    
    // Task 1 - measure opening of accordions
    $(".task1 .guide-title").on('click', function(){
        var fragment = window.location.hash,
            already_clicked = fragment.indexOf("accordion-click");
        
        if( already_clicked === -1) {
            fragment = fragment + "accordion-click";
            window.location.hash = fragment;
        }
        localStorage.setItem('Task 1 Accordion', "true");
        //localStorage.setItem('task', 1);
    });
    
    // Task 2 - measure opening of accordions
    $(".task2 .guide-title").on('click', function(){
        var fragment = window.location.hash,
            already_clicked = fragment.indexOf("accordion-click");
        
        if( already_clicked === -1) {
            fragment = fragment + "accordion-click";
            window.location.hash = fragment;
        }
        localStorage.setItem('Task 2 Accordion', "true");
        //localStorage.setItem('task', 2);
    });
    

    // Prevent click empty 'a' tag from causing scrolling
    $('a').on('click', function(e){
        if (! $(this).attr('href') ) {
            e.preventDefault();
        }
    });
    
    // Hide empty breadcrumb links and arrows
    $('a.breadcrumb-link').each(function(){
        if( $(this).is(':empty') ) {
            var wrapper = $(this).parent('.breadcrumb-home-wrapper');
            $(wrapper).css('display', 'none');
        }
    });
    

    /*----------- Add side-menu (sticky_list) functionality ----------- */
    
    // Function for menu stickiness on scroll (called within the if .anchor-menu .sticky-container exists block)
    function add_position(positions) {

        for (var i = 0; i < positions.length; i++) {
            var top_position = positions[i];
            if ($(window).scrollTop() >= top_position) {
                $('.anchor-menu a').removeClass('active-sticky');
                $('.anchor-menu a[data-value=' + positions[i] + ']').addClass('active-sticky');
            }
        }
    }
    
    
        // Add name attr to anchor-section. Name is taken from nested div inside the anchor-section.
        $('.anchor-section > div').each(function(){ 
            if ($('.anchor-menu').length !== 0) {
                var section_name = $(this).attr('id').toLowerCase().trim();
                $(this).parent('.anchor-section').attr('name', section_name);
            }
        });


        // Function to make the side menu sticky
        var stickyPosition = $('.anchor-menu').offset(); //This var is outside the function because it needs to be determined BEFORE window resizing,.

        function menuStickiness() {

            var win = $(window),
                stickyWidth = $('.twoCol39-left').width();

            // Set side-menu initial horizontal position 
            if(win.width() < 575) {
                $('.anchor-menu').css('position', 'relative').css('top', 'auto');
            } else if (win.width() >= 575) {
                if (win.scrollTop() >= stickyPosition.top) {
                    $('.anchor-menu').css('position', 'fixed').css('top', '32px').css('width', stickyWidth);
                } else {
                    $('.anchor-menu').css('position', 'relative').css('top', 'auto').css('width', stickyWidth);
                }
            } 

            // Reset side-menu position on scroll
            $(window).scroll(function () {

                stickyWidth = $('.twoCol39-left').width();

                if (win.width() < 575) {
                    $('.anchor-menu').css('position', 'relative').css('top', 'auto').css('width', stickyWidth);
                } else if (win.width() >= 575) {
                    if (win.scrollTop() >= stickyPosition.top) {
                        $('.anchor-menu').css('position', 'fixed').css('top', '32px').css('width', stickyWidth);
                    } else if (win.scrollTop() < stickyPosition.top) {
                        $('.anchor-menu').css('position', 'relative').css('top', 'auto').css('width', stickyWidth);
                    }
                }
            });
        }

        if ($( ".anchor-menu .sticky-container" ).length) {

            // Apply menu stickiness
            menuStickiness();


            // Side menu scroll to section of the page
            // Remove numbers and '.' from the start of numbered steps
            // and add top position of element to anchor link as a data-value
            $('.anchor-menu a').each(function(){

                var a_text = $(this).text(),
                    element_name = $(this).text().trim();
                    element_name = element_name.replace(/\s+/g, '-').toLowerCase();
                    element_name = element_name.replace(/[0-9]/g, '');
                    element_name = element_name.split('.').join("");
                    if (element_name.charAt(0) === '-') {
                        element_name = element_name.substring(1);
                    }              
                //console.log(element_name);
                    
                var name_str = 'div[name="' +  element_name  + '"]';
                var element_position = $(name_str).offset();
                //console.log(element_position);


                if ($(name_str).length){
                    $(this).attr('data-value', Math.round(element_position.top));

                    $(this).on('click', function(){
                        $([document.documentElement, document.body]).animate(
                            { scrollTop: $(name_str).offset().top }, 400);
                        $('.anchor-menu a').removeClass('active-sticky');
                        $(this).addClass('active-sticky');
                    });
                }


            });   


            // Change menu active state on scroll to different sections of the page
            var positions = [];
            $('.anchor-menu a').each(function(){
                var element_position = $(this).attr('data-value');
                positions.push(Math.round(element_position));
            }); 

            $(window).scroll(function(){
                add_position(positions); 
            });

        } // END if .anchor-menu .sticky-container EXISTS


        // Menu stickiness on .resize()
        $(window).on('resize', function(){
            if ($( ".anchor-menu .sticky-container" ).length) {
                menuStickiness();
            }
        });
    
    
   
    // Modal functionality
    // Empty href modal
    $('a[href=""]').on("click", function(){
        if (!$(this).parents('.sticky-container').length && !$(this).hasClass("guide_navlink")){
            $(".modal-wrapper").addClass("active");
            $(".modal-background").addClass("active");
        }
    });
    
    $('.inactive-path').on("click", function(){
        $(".modal-wrapper").addClass("active");
        $(".modal-background").addClass("active");
    });
    
    $(".modal-close").on("click", function(){
        $(".modal-wrapper").removeClass("active");
        $(".modal-background").removeClass("active");
    });

    $(".modal-background").on("click", function(){
        $(".modal-wrapper").removeClass("active");
        $(".modal-background").removeClass("active");
    });
    
    // Search not working modal
     $(".btn-search").on("click", function(){
        $(".modal-wrapper").addClass("active");
        $(".modal-background").addClass("active");
    });
    
    
    
    // GUIDE MINI-LIST
    /*------------------- Open & close list items -------------------*/
    $(".guide-mini-list-item-title").on("click", function () {
        $(this).next('.content-wrapper').slideToggle(400);

        if ($(this).closest('.guide-mini-list-item').hasClass('open')) {
            
            $(this).closest('.guide-mini-list-item').removeClass('open');

            
        } else {
            $(this).closest('.guide-mini-list-item').addClass('open');
        }
         
     });
    
    
    //GUIDE TILES
    /*------------------- Open & close items -------------------*/
    $(".guide-title").on("click", function () {
        if(!($(this).hasClass('inactive'))) {
            $(this).next('.guide-content').slideToggle(200);

            $(this).toggleClass("open");
            $(this).parent(".guide-section").toggleClass('open');

            /*var sectionId = $(this).parent(".guide-section").attr("id");
            if ($(this).parent(".guide-section").hasClass('open')) {
                localStorage.setItem(sectionId, 'open');
            } else {
                localStorage.setItem(sectionId, '');
            }*/
        }
            
     });
    
    $(".guide-expand-all").on("click", function (){
        
        if($(this).hasClass('open')) {
            $(this).removeClass('open');
            $('.guide-content').slideUp(400);
            $(".guide-title").removeClass('open');
            $(".guide-section").removeClass('open');
            
            $(this).find('h5').text('Open all');
            
        } else { 
            $(this).addClass('open');
            $('.guide-content').slideDown(400);
            $(".guide-title").addClass('open');
            $(".guide-section").addClass('open');
     
            $(this).find('h5').text('Close all');
        }
        
    });


    
}); // END doc ready