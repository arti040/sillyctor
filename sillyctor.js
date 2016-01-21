/*
 *
 * It's a simple selector engine for educational purpose ONLY.
 * It supports elements, classes, ids and conjunction of them.
 * It DOES NOT support *, >, +, attributes and pseudo-selectors.
 *
 */

"use strict";
var $ = function (selector) {
  var elements = [],
  el, tag, tmpEl, sLen, parentNode,
  i = 0, j = 0;

  /*
   * Check if hash's location is other than the beginning of the selector
   * and if it's true, get rid of the text (tag) part of the selector.
   */
  if(selector.indexOf('#') > 0) {
    selector = selector.split('#');
    tag = selector[0];
    selector = '#' + selector[selector.length - 1];
    selector = selector.split('.')[0];
  }

  selector = selector.split(' ');
  sLen = selector.length;

  /* Set default context for getElementsByTag/ClassName methods */
  elements = document;

  /* Main match functions */
  var matchSelector = {
    id: function(selector) {
      return document.getElementById(selector);
    },
    get: function(classOrElement,selector,parentNode) {
      var k = 0, m = 0, arr = [], gw = (classOrElement === 'class') ?
        'getElementsByClassName' : 'getElementsByTagName';

      if(parentNode.length) {
        while(parentNode[k]) {
          /* We need to convert NodeList to Array */
          Array.prototype.slice.call(parentNode[i][gw](selector));
          m++;
        }
      }
      /* If parentNode has no length, it's a single element then */
      else { arr = parentNode[gw](selector); }
      return (arr.length === 1) ? arr[0] : arr;
    }
  };

  /* Main loop */
  for (; i < sLen; i++) {
    el = selector[i];
    parentNode = elements;

    /* If selector is an ID: */
    if(el.indexOf('#') === 0){
      if(tag) {
        /* Remove some classes from the tag if there are any */
        tag = tag.split('.')[0];
        tmpEl = matchSelector.id(el.split('#')[1]);
        tmpEl.tagName.toLowerCase() === tag ? elements = tmpEl : elements = [];
      }
      else {
        elements = matchSelector.id(el.split('#')[1]);
      }
    }

    /* If selector is/are class(es): */
    else if(el.indexOf('.') > -1) {
      el = el.split('.');
      if(el[0]) {
        parentNode = matchSelector.get('elements',el[0],parentNode);
        if(parentNode.length) {
          for (;parentNode[j];j++) {
            if(parentNode[j].className.indexOf(el[1]) > -1) {
              elements.push(parentNode[j]);
            }
          }
        }
        else {
          elements = (parentNode.className.indexOf(el[1]) > -1) ?
            parentNode : [];
        }
      }
      else { elements = matchSelector.get('class',el[1],parentNode);}
    }

    /* Finally, if selector is a tag: */
    else { elements = matchSelector.get('elements',el,parentNode); }
  }

  return elements;
}
