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
    var task = sessionStorage.getItem('task');
    var task1 = sessionStorage.getItem('Task 1');
    var task2 = sessionStorage.getItem('Task 2');
    
    if (task1 == 'true' && task === '1') {
        window.location.hash = 'accordion-click'; 
    } else if (task2 == 'true' && task === '2') {
        window.location.hash = 'accordion-click'; 
    }

    
    // Task 1 - measure opening of accordions
    $(".task1 .guide-title").on('click', function(){
        var fragment = window.location.hash,
            already_clicked = fragment.indexOf("accordion-click");
        
        if( already_clicked === -1) {
            fragment = fragment + "accordion-click";
            window.location.hash = fragment;
        }
        sessionStorage.setItem('Task 1', true);
    });
    
    // Task 2 - measure opening of accordions
    $(".task2 .guide-title").on('click', function(){
        var fragment = window.location.hash,
            already_clicked = fragment.indexOf("accordion-click");
        
        if( already_clicked === -1) {
            fragment = fragment + "accordion-click";
            window.location.hash = fragment;
        }
        sessionStorage.setItem('Task 2', true);
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
    
    // Remove whitespace from anchor-section names or they break the sidemenu links
    /*$('.anchor-section').each(function(){
        var section_name = $(this).attr('name');
        section_name = $(this).attr('name').replace(/\s/g,' ');
        $(this).attr('name', section_name);
    });*/
    
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
        // and add top position of element to anchor link as a data-value
        $('.anchor-menu a').each(function(){
            
            var a_text = $(this).text(),
                element_name = $(this).text().replace(/\s/g,' ');
                var name_str = '.anchor-section[name="' +  element_name  + '"]';
                var element_position = $(name_str).offset();
            
            
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

            var sectionId = $(this).parent(".guide-section").attr("id");
            if ($(this).parent(".guide-section").hasClass('open')) {
                sessionStorage.setItem(sectionId, 'open');
            } else {
                sessionStorage.setItem(sectionId, '');
            }
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

$(window).on( "unload", function(){
    if ($('.guide-main-section').hasClass('task1')) {
        sessionStorage.setItem('task', 1);
        sessionStorage.setItem('Task 2', 'false');
    } else if ($('.guide-main-section').hasClass('task2')) {
        sessionStorage.setItem('task', 2);
        sessionStorage.setItem('Task 1', 'false');
    } else {
        sessionStorage.setItem('task', 0);
        sessionStorage.setItem('Task 1', 'false');
        sessionStorage.setItem('Task 2', 'false');
    }
} );
