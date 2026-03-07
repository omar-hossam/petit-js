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

- [ ] h-for
- [ ] h-if, h-elseif, h-else
- [ ] h-text (= reactive to variable value) loads TEXT ONLY NOT HTML!
- [ ] h-while

*/


// APP OBJECTS MUST START WITH 'my' e.g. 'myApp', 'myProgram', 'mySystem' etc..
const appObjects = Object.keys(window).filter(ob => ob.startsWith("my"));
const forElements = [...document.querySelectorAll("[h-for]")];


const isNumber = (str) => !isNaN(str) && !isNaN(parseFloat(str));


forElements.forEach(el => {
  const value = el.getAttribute("h-for").split("in").map(str => str.trim()); // split by in, remove whitespaces from start and end only
  const children = [...el.children];
  el.innerHTML = '';
  const elObj = { 
    name: value[1].split('.')[0],
    varName: value[1].split('.')[1] 
  }
  // hobby in hobbies 
  // -- here the value of `hobbies` is the `targetValue`
  const targetValue = window[elObj.name][elObj.varName]
  
  for (let i = 0; i < targetValue.length; i++) {
    children.forEach(child => {
      if (child.getAttribute("data-text")) {
        // now we will set the data-text generated value
      }
      
      el.innerHTML += child.outerHTML;
    })
  }
})
