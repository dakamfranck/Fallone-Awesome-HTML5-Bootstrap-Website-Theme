fallone = {
  sticky_visible: false,
  init: function () {
    this.textAnimation();
    //Navigation
    this.expander();
    this.runIsotope();
    this.runCarousel();
    //Mailchimp
    this.mailchimpNewsletter();
    this.formValidate();
    this.videoControl();
    this.runMagicPopUp();
    this.wow();
    this.runTooltips();
    //this.sizeGestion();
    this.backToTop();
    this.dropdownMenuOnHover();
  },
  dropdownMenuOnHover: function () {

    $(".dropdown").hover(
            function () {
              $('.dropdown-menu', this).stop(true, true).fadeIn("slow");
              $(this).toggleClass('open');
              $('b', this).toggleClass("caret caret-up");
              var t = this;
              setTimeout(function (t) {
                $('.dropdown-menu', t).addClass('fadetop');
              }, 200);
            },
            function () {
              $('.dropdown-menu', this).stop(true, true).fadeOut("slow");
              $(this).toggleClass('open');
              $('b', this).toggleClass("caret caret-up");
              var t = this;
              setTimeout(function (t) {
                $('.dropdown-menu', t).removeClass('fadetop');
              }, 200);
            });
  },
  sizeGestion: function () {
    if ($(window).width() > 1750) {
      if ($(".container-fluid").length) {
        console.log($(window).width());
        var containerFluid = $(".container-fluid");
        containerFluid.removeClass("container-fluid").addClass("container");
      }
    } else {
      if ($(".container").length) {
        var container = $(".container");
        container.removeClass("container").addClass("container-fluid");
      }
    }
    $(window).resize(function () {
      if ($(window).width() > 1750) {
        if ($(".container-fluid").length) {
          var containerFluid = $(".container-fluid");
          containerFluid.removeClass("container-fluid").addClass("container");
        }
      } else {
        if ($(".container").length) {
          var container = $(".container");
          container.removeClass("container").addClass("container-fluid");
        }
      }
    });
  },
  textAnimation: function () {
    if ($('.textillate').length) {
      $('.textillate').textillate({loop: false, in: {effect: 'flash'}, out: {effect: 'flash', shuffle: true}});
      $(".textillate").mouseenter(function () {
        $(this).textillate('start');
        return false;
      });
      $(".textillate").mouseleave(function () {
        $(this).textillate('out');
      });
    }
  },
  runTooltips: function () {
    $('[data-toggle="tooltip"]').tooltip();
  },
  backToTop: function () {
    $(window).scroll(function () {
      if ($(this).scrollTop() > 100) {
        if (fallone.sticky_visible === false) {
          //$('.fallone-navbar nav').addClass('navbar-fixed-top');
          $('.fallone-navbar').addClass('header-stuck');
          $('.main-content').css({'margin-top': '100px'});
          $('.back-to-top').fadeIn();
          setTimeout(function () {
            $('.fallone-navbar').addClass('do-animation');
          }, 500);
          fallone.sticky_visible = true;
        }
      } else {
        if (fallone.sticky_visible === true) {
          //$('.fallone-navbar nav').removeClass('navbar-fixed-top');
          $('.fallone-navbar').removeClass('do-animation');
          $('.fallone-navbar').removeClass('header-stuck');
          $('.main-content').css({'margin-top': '0px'});
          $('.back-to-top').fadeOut();
          fallone.sticky_visible = false;
        }
      }
    });
    $("body").on('click', '.back-to-top', function () {
      $('html, body').stop().animate({
        scrollTop: 0
      }, 800);
      return false;
    });
  },
  wow: function () {
    var wow = new WOW({
      boxClass: 'wow', // animated element css class (default is wow)
      animateClass: 'animated', // animation css class (default is animated)
      offset: 0, // distance to the element when triggering the animation (default is 0)
      mobile: false, // trigger animations on mobile devices (default is true)
      live: true, // act on asynchronously loaded content (default is true)
      callback: function (box) {
        // the callback is fired every time an animation is started
        // the argument that is passed in is the DOM node being animated
      }
    });
    wow.init();
  },
  runMagicPopUp: function () {
    if ($('a.show-image').length) {
      $('a.show-image').magnificPopup({type: 'image'});
    }
    if ($('.popup-gallery').length) {
      $('.popup-gallery a').magnificPopup({
        type: 'image',
        gallery: {
          enabled: true
        }
      });
    }
    if ($('.post-gallery').length) {
      $('.post-gallery').each(function () { // the containers for all your galleries
        $(this).magnificPopup({
          delegate: 'a', // the selector for gallery item
          type: 'image',
          gallery: {
            enabled: true
          }
        });
      });
    }
  },
  videoControl: function () {
    if ($("#video").length) {
      $("#video-control").on('click', function () {
        if ($(this).hasClass("iline2-pause11")) {
          document.getElementById("video").pause();
          $(this).removeClass("iline2-pause11").addClass("iline2-play33");
          return false;
        } else {
          document.getElementById("video").play();
          $(this).removeClass("iline2-play33").addClass("iline2-pause11");
          return false;
        }
      });
    }
  },
  formValidate: function () {
    $("input,textarea").jqBootstrapValidation({
      preventSubmit: true,
      submitError: function ($form, event, errors) {
        // additional error messages or events
      }
    });
  },
  runCarousel: function () {
    if ($('#main-carousel').length) {
      var $mainCarousel = $('#main-carousel');
      var $firstAnimatingElems = $mainCarousel.find('.item:first').find("[data-animation ^= 'animated']");
      $mainCarousel.carousel({
        interval: 5000
      });
      fallone.doAnimations($firstAnimatingElems);
      $mainCarousel.carousel('pause');
      //Other slides to be animated on carousel slide event 
      $mainCarousel.on('slide.bs.carousel', function (e) {
        var $animatingElems = $(e.relatedTarget).find("[data-animation ^= 'animated']");
        fallone.doAnimations($animatingElems);
      });
    }

    if ($('#tweet-carousel').length) {
      $("body").imagesLoaded(function () {
        $("#tweet-carousel").owlCarousel({
          autoPlay: true,
          stopOnHover: true,
          singleItem: true,
          // Responsive 
          responsive: true,
          responsiveRefreshRate: 200
        });
      });
    }
    if ($('#related-posts').length) {
      $("body").imagesLoaded(function () {
        $("#related-posts").owlCarousel({
          items: 3,
          itemsCustom: false,
          itemsDesktop: [1199, 3],
          itemsDesktopSmall: [980, 3],
          itemsTablet: [768, 2],
          itemsTabletSmall: false,
          itemsMobile: [479, 1],
          autoPlay: true,
          stopOnHover: true,
          singleItem: false,
          // Responsive 
          responsive: true,
          responsiveRefreshRate: 200
        });
      });
    }

  },
  doAnimations: function (elems) {
    var animEndEv = 'webkitAnimationEnd animationend';

    elems.each(function () {
      var $this = $(this),
              $animationType = $this.data('animation');

      // Add animate.css classes to
      // the elements to be animated 
      // Remove animate.css classes
      // once the animation event has ended
      $this.addClass($animationType).one(animEndEv, function () {
        $this.removeClass($animationType);
      });
    });
  },
  expander: function () {
    $('a.nav-expander').on('click', function (e) {
      e.preventDefault();
      $('body').toggleClass('nav-expanded');
      fallone.updateUrlHash("");
    });
  },
  updateUrlHash: function (target) {
    document.location.hash = target;
  },
  runIsotope: function () {
    //Blog Page
    if ($('.isotope-blog').length) {
      $("body").imagesLoaded(function () {
        var $container = $('.isotope-blog').isotope({
          itemSelector: '.blog-post',
          masonry: {
            columnWidth: 330
          }
        });
      });
    }
    //Team Members Page
    if ($('.isotope-team').length) {
      $("body").imagesLoaded(function () {
        var $container = $('.isotope-team').isotope({
          itemSelector: '.team-member',
          masonry: {
            columnWidth: 285
          }
        });
      });
    }
    //Fetures
    if ($('.isotope-features').length) {
      $("body").imagesLoaded(function () {
        var $container = $('.isotope-features').isotope({
          itemSelector: '.feature-item',
          masonry: {
            columnWidth: 285
          }
        });
      });
    }
    //Contact Informations Page
    if ($('.isotope-contact').length) {
      $("body").imagesLoaded(function () {
        var $container = $('.isotope-contact').isotope({
          itemSelector: '.contact-item',
          masonry: {
            columnWidth: 250
          }
        });
      });
    }
    if ($('.isotope-gallery').length) {
      $("body").imagesLoaded(function () {
        var winDow = $(window);
        // Needed variables
        var $container = $('.isotope-gallery');
        var $filter = $('.filter');
        $container.imagesLoaded(function () {
          $container.trigger('resize');
          $container.isotope({
            filter: '*',
            layoutMode: 'masonry',
            animationOptions: {
              duration: 750,
              easing: 'linear'
            }
          });
        });

        winDow.bind('resize', function () {
          var selector = $filter.find('a.active').attr('data-filter');

          try {
            $container.isotope({
              filter: selector,
              animationOptions: {
                duration: 750,
                easing: 'linear',
                queue: false
              }
            });
          } catch (err) {
          }
          return false;
        });

        // Isotope Filter 
        $filter.find('a').click(function () {
          var selector = $(this).attr('data-filter');

          try {
            $container.isotope({
              filter: selector,
              animationOptions: {
                duration: 750,
                easing: 'linear',
                queue: false
              }
            });
          } catch (err) {

          }
          return false;
        });


        var filterItemA = $('.filter li a');

        filterItemA.on('click', function () {
          var $this = $(this);
          if (!$this.hasClass('active')) {
            filterItemA.removeClass('active');
            $this.addClass('active');
          }
        });
      });
    }
  },
  mailchimpNewsletter: function () {
    if ($('#mailchimp-form').length) {
      $('#mailchimp-form').ajaxChimp({
        url: $('#mailchimp-form').data('url')
      });
    }
  }

};
fallone.init();


