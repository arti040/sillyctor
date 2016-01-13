/* This is first and a VERY BAD approch */

var $ = function (selector) {
  var elements = [];

  /* This could be done better ;-) */
  var exprs = {
    "ID": new RegExp('\#[a-zA-Z0-9\-\_]*'),
    "CLASS": new RegExp('\\.[a-zA-Z0-9\-\_]*'),
    "startID": new RegExp('\^#[a-zA-Z0-9\-\_]*'),
    "startCLASS": new RegExp('^\\.[a-zA-Z0-9\-\_]*')
  }

  function findId() {
    var resp = selector.match(exprs['ID']);
    return resp[Object.keys(resp)[0]].replace('#','');
  }

  function findClass() {
    var resp =  selector.match(exprs['CLASS']);
    return resp[Object.keys(resp)[0]].replace('.','');
  }

  function hasDot() {
    return selector.indexOf('.') !== -1;
  }

  function hasHash() {
    return selector.indexOf('#') !== -1;
  }

  function isTag() {
    return !hasDot() && !hasHash();
  }

  function isMixed() {
    if(hasDot() && !hasHash()) {
      var arr = selector.split('.');

      /* First element will be always a TAG */
      var tag = arr.shift().toString();
      var els = document.getElementsByTagName(tag);

      for(var i=0;i<els.length;++i) {
        if(els[i].classList.contains(arr)) { elements.push(els[i]); }
      }
      return;
    }
    if(hasHash() && !hasDot()) {
      var arr = selector.split('#');
      var el = document.getElementById(arr[1]);
      if(el.nodeName == arr[0]) { elements.push(el); }
      return;
    }
    if(hasHash() && hasDot()) {
      var elId = findId();
      var elClasses = findClass();
      var el = document.getElementById(elId);

      /* Nothing to do here... */
      if(typeof el === 'undefined') { return; }
      /* But if...*/
      else {
        if(el.classList.contains(elClasses)) { elements.push(el); }
      }

    }
  }

  function matchSelector(exprs,selector) {
    var els = [];

    /* Check if selector is a TAG */
    if(isTag()) {
      els = document.getElementsByTagName(selector);
      for(var i = 0;i<els.length;++i) {
        elements.push(els[i]);
      }
      return;
    }

    /* Check if selector is an standalone ID */
    if(selector.match(exprs['startID'])) {
      elements.push(document.getElementById(selector.replace('#','')));
      return;
    }

    /* Check if selector is a standalone CLASS */
    if(selector.match(exprs['startCLASS'])) {
      els = document.getElementsByClassName(selector.replace('.',''));
      for(var i = 0;i<els.length;++i) {
        elements.push(els[i]);
      }
      return;
    }

    /* Check if selector is a mix of ID and CLASS(es) */
    isMixed();
  }

  matchSelector(exprs,selector);
  return elements;
}
