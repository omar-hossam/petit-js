// CLASS
function togClass(el, val) {
  if (typeof(el) === "string") {
    [...document.querySelectorAll(el)].forEach(e => e.classList.toggle(val))
    return;
  }
  el.classList.toggle(val)
}

function addClass(el, val) {
  if (typeof(el) === "string") {
    [...document.querySelectorAll(el)].forEach(e => e.classList.add(val))
    return;
  }
  el.classList.add(val)
}

function remClass(el, val) {
  if (typeof(el) === "string") {
    [...document.querySelectorAll(el)].forEach(e => e.classList.remove(val))
    return;
  }
  el.classList.remove(val)
}

// ATTRIBUTES
function togAttr(el, attr) {
  if (typeof(el) === "string") {
    [...document.querySelectorAll(el)].forEach(e => e.toggleAttribute(attr))
    return;
  }
  el.toggleAttribute(attr)
}

function setAttr(el, attr, val) {
  if (typeof(el) === "string") {
    [...document.querySelectorAll(el)].forEach(e => e.setAttribute(attr, val))
    return;
  }
  el.toggleAttribute(attr, val)
}

function log(val) { console.log(val) }

/*
TODOS:

## Functions

- [X] Classes
- [X] Attributes

- [ ] data-for
- [ ] data-if, data-elseif, data-else
- [ ] data-text (= reactive to variable value) loads TEXT ONLY NOT HTML!
- [ ] data-while

*/

// APP OBJECTS MUST START WITH 'my' e.g. 'myApp', 'myProgram', 'mySystem' etc..
const appObjects = Object.keys(window).filter(ob => ob.startsWith("my"));
const allDocumentEls = [...document.querySelectorAll("body *")].filter(el => el.tagName.toLowerCase() !== "script");

allDocumentEls.forEach(documentEl => {
  // data-* will go here..
})
