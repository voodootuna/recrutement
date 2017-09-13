const contactForm = document.querySelector('.contact-form');
const contactHead = document.querySelector('.contact-head');
const textboxen = Array.prototype.slice.call(document.querySelectorAll(".contact-form input"));
const requiredComponents = Array.prototype.slice.call(document.querySelectorAll("[required]"));
const contactSubmitButton = document.getElementById('contact-submit-button');
const contactActionUrl = "https://formspree.io"

function initExpandingTextareas() {

  var textareas = document.querySelectorAll('.expanding'),

      resize = function(t) {
        t.style.height = 'auto';
        t.style.overflow = 'hidden'; // Ensure scrollbar doesn't interfere with the true height of the text.
        t.style.height = (t.scrollHeight + t.offset ) + 'px';
        t.style.overflow = '';
      },

      attachResize = function(t) {
        if ( t ) {
          console.log('t.className',t.className);
          t.offset = !window.opera ? (t.offsetHeight - t.clientHeight) : (t.offsetHeight + parseInt(window.getComputedStyle(t, null).getPropertyValue('border-top-width')));

          resize(t);

          if ( t.addEventListener ) {
            t.addEventListener('input', function() { resize(t); });
            t.addEventListener('mouseup', function() { resize(t); }); // set height after user resize
          }

          t['attachEvent'] && t.attachEvent('onkeyup', function() { resize(t); });
        }
      };

  // IE7 support
  if ( !document.querySelectorAll ) {

    function getElementsByClass(searchClass,node,tag) {
      var classElements = new Array();
      node = node || document;
      tag = tag || '*';
      var els = node.getElementsByTagName(tag);
      var elsLen = els.length;
      var pattern = new RegExp("(^|\\s)"+searchClass+"(\\s|$)");
      for (i = 0, j = 0; i < elsLen; i++) {
        if ( pattern.test(els[i].className) ) {
          classElements[j] = els[i];
          j++;
        }
      }
      return classElements;
    }

    textareas = getElementsByClass('expanding');
  }

  for (var i = 0; i < textareas.length; i++ ) {
    attachResize(textareas[i]);
    
    console.log('current textarea: ' + textareas[i]);
    console.log('attachResize(textarea[i]) result: ' + attachResize(textareas[i]));
  }

}




textboxen.forEach(element => {
  element.addEventListener('keydown', event => {
    if (event.keyCode === 13){
      event.preventDefault();
      event.stopPropagation();
    }
  });
});

// event delegation instead of being lazy
textboxen.forEach(element => {
  element.addEventListener('keyup', event => {
    element.setAttribute('size', element.value.length);
  });
  element.setAttribute('size', element.value.length);
});

// textarea expanding
initExpandingTextareas();

//change the default behavior for :required:invalid to only apply after interaction with the element or an attempt to submit the form
//  stash list of required elements in array
requiredComponents.forEach(function(element){
  element.removeAttribute('required');
});

// onBlur after gaining and losing focus add back the required flag 
requiredComponents.forEach(element => {
  element.addEventListener('focus', () => {
    element.setAttribute('required', true);
  }); 
});

// when submit button click, add required attribute back
contactSubmitButton.addEventListener('click', function(){
  requiredComponents.forEach(function(element){
    element.setAttribute('required', true)
  })
});

contactForm.addEventListener('submit', function (event) {
  event.preventDefault();
  event.stopPropagation();
  
  
 requiredComponents.forEach(function(element){
   element.setAttribute('required', true)
 });
  
  if (contactForm.checkValidity) {
    document.body.classList.add('contact-submitted');
    contactHead.classList.add('contact-submitted');

    const contactContent = {};

    for (let i = 0, j = contactForm.length; i < j; i += 1) {
      const inputElement = contactForm[i];
      if (inputElement.name) {
        contactContent[inputElement.name] = inputElement.value;
      }
    }

    setTimeout(() => {
      const request = new XMLHttpRequest();
      request.open('POST', contactActionUrl, true);
      request.setRequestHeader('Accept', 'application/json; charset=utf-8');
      request.setRequestHeader('Content-Type', 'application/json charset=UTF-8');

      request.onload = () => {
        if (request.status >= 200 && request.status < 400) {
          const resp = request.responseText;
        } else {
          // handle error
        }
      };

      request.onerror = () => {
        // handle connection error
      };

      request.send(JSON.stringify(contactContent));

      contactForm.reset();
      //code pen psuedoreset to get back to initial state
      document.body.classList.remove('contact-submitted');
      contactHead.classList.remove('contact-submitted');  
      requiredComponents.forEach(function(element){
        element.removeAttribute('required');
      });

    }, 2000);
  }
  return false;
});