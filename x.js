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


const isNumber = (str) => !isNaN(str) && !isNaN(parseFloat(str));


allDocumentEls.forEach(documentEl => {
  // data-* will go here..
  let shareVariablesScope = false;
  
  if (documentEl.getAttribute("data-for")) {
    shareVariablesScope = true;
    const dataForVal = documentEl.getAttribute("data-for").split("in").map(str => str.trim()); // split by in, remove whitespaces from start and end only
    
    let count = 0;
    const children = [...documentEl.children];
    
    documentEl.innerHTML = ``; // we will render it later on..
    
    const elObj = { 
      name: dataForVal[1].split('.')[0],
      varName: dataForVal[1].split('.')[1] 
    }
    
    // hobby in hobbies 
    // -- here the value of `hobbies` is the `targetValue`
    const targetValue = window[elObj.name][elObj.varName]
    
    log(targetValue)
    
    // NOW render the new children
    for (let i = 0; i < targetValue.length; i++) {
      children.forEach(child => {
        if (child.getAttribute("data-text")) {
          // now we will set the data-text generated value
        }
        
        documentEl.innerHTML += child.outerHTML;
      })
    }
  }
})
