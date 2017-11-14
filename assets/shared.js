
  // Remove the custom style sheet, if the user is signed in to the content management system
  (function() {
    if (!document.querySelector) return;

    var timer;
    function check() {

      // SHIM: This is the best test we could come up with. This does not feel reliable.
      if (document.getElementById('cms_tools_top') || document.querySelector('meta[name="robots"][content="noindex"]')) {

        var stylesheet = document.querySelector('link[href*="jimthoburn.github.io"]');
        if (stylesheet) stylesheet.parentNode.removeChild(stylesheet);
        clearInterval(timer);
      }
    }

    // Check frequently
    timer = setInterval(check, 10);

    // Check one last time when the DOM has loaded
    document.addEventListener('DOMContentLoaded', function() {
      check();
      clearInterval(timer);
    });
    // Stop checking when everything has loaded
    document.addEventListener('load', function() {
      clearInterval(timer);
    });

    // If all else fails, stop checking after five seconds
    setTimeout(function() {
      clearInterval(timer);
    }, 5000);
  })();


  // OPTIONAL: Increase the resolution of the image in the header, by changing its “src” attribute
  document.addEventListener('DOMContentLoaded', function() {
    // Check to see if the page HTML matches a certain pattern (the HTML that we expect to see on School Loop 1.0)
    // If it does match, look for an image that appears right after the main headline
    // If that image is found, update it’s URL from wXXX to w2000

    // These selectors were taken directly from the style sheet, “custom.css”
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
      var url = image.getAttribute('src').
                  replace('w350', 'w2000').
                  replace('w465', 'w2000').
                  replace('w700', 'w2000').
                  replace('w970', 'w2000')

      image.setAttribute('src', url);
    }        
  });


  // Add a slideshow on the home page
  /*
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
  */
