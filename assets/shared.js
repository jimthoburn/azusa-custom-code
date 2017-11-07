
  // Remove the custom style sheet, if the user is signed in
  (function() {
    var timer;
    function check() {
      if (document.getElementById('cms_tools_top')) {
        var stylesheet = document.querySelector('link[href*="jimthoburn.github.io"]');
        if (stylesheet) stylesheet.parentNode.removeChild(stylesheet);
      }
      clearInterval(timer);
    }
    timer = setInterval(check, 10);
    document.addEventListener('DOMContentLoaded', function() {
      check();
      clearInterval(timer);
    });
  })();


  // Add a canonical URL and redirect to www.azusahighschool.net
  (function() {
    if (window.location.host === 'ahs-ausd-ca.schoolloop.com' && document.head) {

      //var canonicalURL = 'http://www.azusahighschool.net' + window.location.pathname + window.location.search + window.location.hash;

      var canonicalURL = location.href.replace('ahs-ausd-ca.schoolloop.com', 'www.azusahighschool.net');

      // Add a rel canonical
      var link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      link.setAttribute('href', canonicalURL);
      document.head.appendChild(link);

      document.addEventListener('DOMContentLoaded', function() {

        function signedOut() {
          var footer = document.getElementById('container_footer');
          if (footer && footer.querySelector) {
            var button = footer.querySelector('.footer_login .button1');
            if (button && button.textContent === 'Staff Login') {
              return true;
            }
          }

          return false;
        }

        // If the domain name is not www.azusahighschool.net
        // Redirect to www.azusahighschool.net
        if (signedOut()) {

          // KUDOS: https://stackoverflow.com/questions/503093/how-to-redirect-to-another-webpage
          if (window.location && window.location.replace) {

            // similar behavior as an HTTP redirect
            window.location.replace(canonicalURL);
          } else {

            // similar behavior as clicking on a link
            window.location.href = canonicalURL;
          }

          var meta = document.createElement('meta');
          meta.setAttribute('http-equiv', 'refresh');
          meta.setAttribute('content', '0; url=' + canonicalURL);
          document.head.appendChild(meta);
        }
      });
    }
  })();

  // Wait for the page to load, and update the HTML.
  document.addEventListener('DOMContentLoaded', function() {
    var title = document.getElementById('page_title')
    if (!title) return;

    title = title.textContent;

    function titleHas() {
      for (var index = 0; index < arguments.length; index++) {
        if (title.indexOf(arguments[index]) >= 0) return true;
      }
      return false;
    }

    function getPageCategory(className) {
      if (titleHas('Singers')) {
        return 'singers';
      } else if (titleHas(
                  'Index',
                  'Athletic',
                  'Roster',
                  'Sport',
                  'Cheerleading',
                  'Cross Country',
                  'Tennis',
                  'Golf',
                  'Basketball',
                  'Soccer',
                  'Softball',
                  'Volleyball',
                  'Wrestling',
                  'Baseball',
                  'Track'
                )) {
        return 'athletics';
      } else if (titleHas('Football')) {
        return 'football';
      } else if (titleHas('ROTC')) {
        return 'rotc';
      } else if (titleHas('College', 'Guidance', 'Requirements')) {
        return 'college';
      } else if (titleHas('Welcome')) {
        return 'graduates';
      } else if (titleHas('Career', 'Curriculum', 'Course', 'Math', 'Science', 'Education', 'Language', 'Art', 'Baccalaureate')) {
        return 'academics';
      } else if (titleHas('Attendance')) {
        return 'campus';
      } else {
        return 'students';
      }
    }

    var category = getPageCategory();
    if (category) document.body.classList.add('azusa-' + getPageCategory());

    // Get a reference to the header element
    // Update the HTML

    // Get a reference to the footer element
    // Update the HTML



    // Check to see if the page HTML matches a certain pattern (the HTML that we expect to see on School Loop 1.0)
    // If it does match, look for an image that appears right after the main headline
    // If that image is found, update it’s URL from w700 to w2000
    var image = document.querySelector(
      '#container_content_home > .content_full > div > div[style="width: 100%; width: 970px"] > img[width="970"]:first-of-type'
      + ', ' +
      '#page_title + table > tbody > tr > td > #block_hub_main_b > .block_content_main > div > div[style="width: 100%; width: 350px"] > img[width="350"]:first-of-type'
      + ', ' +
      '#page_title + table > tbody > tr > td > #block_hub_main > .block_content_main > div > div[style="width: 100%; width: 465px"] > img[width="465"]:first-of-type'
      + ', ' +
      '#page_title + #block_wide_main > .block_content_main > div > div[style="width: 100%; width: 700px"] > img[width="700"]:first-of-type'
    );
    if (image) {
      image.setAttribute('src', image.getAttribute('src').replace('w350', 'w2000').replace('w465', 'w2000').replace('w700', 'w2000').replace('w970', 'w2000'));
    }


  });


  // Add a slideshow on the home page
  document.addEventListener('DOMContentLoaded', function() {

    var images = [
      'https://jimthoburn.github.io/azusa-custom-code/images/football.jpg',
      'https://jimthoburn.github.io/azusa-custom-code/images/graduates.jpg',
      'https://jimthoburn.github.io/azusa-custom-code/images/football-2.jpg',
      'https://jimthoburn.github.io/azusa-custom-code/images/singers.jpg',
      'https://jimthoburn.github.io/azusa-custom-code/images/singers-2.jpg',
      'https://jimthoburn.github.io/azusa-custom-code/images/best-buddies.jpg',
      'https://jimthoburn.github.io/azusa-custom-code/images/students.jpg'
    ];

    var cursor = 0;
    var image = document.getElementById('container_home_header');
    if (!image) return;

    var preloader = new Image();
    var imageListener = preloader.addEventListener('load', update);

    var timer;
    var stopped = false;
    function update() {
      if (stopped) return;

      image.setAttribute('style', 'background-image: url(' + images[cursor] + ') !important');

      if (timer) clearTimeout(timer);
      timer = setTimeout(preloadNext, 7000);
    }

    function preloadNext() {
      if (stopped) return;

      cursor++;
      if (cursor >= images.length) cursor = 0;
      preloader.src = images[cursor];
    }

    timer = setTimeout(preloadNext, 7000);

    window.azusa = window.azusa || {};
    window.azusa.stopHomeSlideshow = function() {
      if (timer) clearTimeout(timer);
      stopped = true;
    }
  });

  // Replace the placeholder image with a video element, if the link to the video has been pressed
  document.addEventListener('DOMContentLoaded', function() {

    // Do we have the features we need?
    if (!document.body.addEventListener || !document.body.querySelector || !document.body.classList) return;

    document.body.addEventListener('click', function(e) {
      if (e.target && e.target.parentNode &&
        (
          e.target.parentNode.classList.contains('azusa-home-video-link') || 
          (e.target.parentNode.parentNode && e.target.parentNode.parentNode.classList.contains('azusa-home-video-link'))
        )
      ) {

        var header   = document.querySelector('.azusa-home-introduction');
        var template = document.getElementById('azusa-home-video-template');

        if (header && template) {
          header.className += ' video-playing';
          header.innerHTML = template.innerHTML;
          e.preventDefault();
          if (window.azusa && window.azusa.stopHomeSlideshow) window.azusa.stopHomeSlideshow();
        }

      }
    }, false);
  });

