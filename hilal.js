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

function getStrQuotes(str) {
  let strQuotes = [];
  let startQuote = -5;
  let endQuote = -5;
  
  for (let i = 0; i < str.length; i++) {
    if (str[i] === '"' || str[i] === "'") {
      if ( (i === 0 && startQuote === -5) || (i > 0 && startQuote === -5 && endQuote === -5) ) {
        startQuote = i
      } else if (startQuote !== -5 && endQuote === -5) {
        endQuote = i
      } 
    }
    
    if (startQuote !== -5 && endQuote !== -5) {
      strQuotes.push([startQuote + 1, endQuote]);
      startQuote = -5;
      endQuote = -5;
    }
  }
  
  return strQuotes;
}

function setElText(el) {
  /* h-text= 
      "myApp.count" ||
      "myApp.count + 1" ||
      "myApp.count + ' clicks'" ||
      "(myApp.count === 1) ? myApp.count + ' click' : myApp.count + ' clicks'" ||
      "'Thanks'",
      "'Thanks' + ' God!'",
  */
  const hText = el.getAttribute("h-text").split("").map(str => str.trim());
  let vars = [];
  let final = ""; // hText.slice(strQuotes[0][0], strQuotes[0][1])
  const strQuotes = getStrQuotes(hText).flat();
  const mathOperators = ["+", "-", "/", "*", "%", "**"]
  
  // we will loop through hText till we find startQuote 
  
  let parts = [] // [ {"var": "count", "op": "+", "num": "5"} ]
  
  if (!strQuotes.length) {
    // now it's either a variable alone OR a variable with an operator and number
    for (let i = 0; i < hText.length; i++) {
      // count + 1545
      // c -> o -> u -> n -> t -> + -> 1 -> 5 -> 4 -> 5
      let partObj = {} // {"var": "count", "op": "+", "num": "5"}
      let partNum = ""
      let partVar = ""
      
      if (!isNumber(hText[i]) && !mathOperators.includes(hText[i])) {
        // THEN that's a variable name!
        partVar += hText[i]
        for (let j = i + 1; j < hText.length; j++) {
          if (!isNumber(hText[j]) || !mathOperators.includes(hText[j])) {
            partVar += hText[j];
            i = j
          }
        }
      }
      
      else if (isNumber(hText[i])) {
        partNum = hText[i]
        for (let j = i + 1; j < hText.length; j++) {
          if (isNumber(hText[j])) { 
            partNum += hText[j] 
            i = j
          }
        } 
      }
      
      else if (mathOperators.includes(hText[i])) {
      
        mathOperators.forEach(op => {
          if (hText[i] === op) {
            partObj.operator = op
          }
        })

      }
      
      partObj.variable = partVar;
      partObj.number = partNum;
      parts.push(partObj)
    }
  }
  
  log(parts)
  
}


forElements.forEach(el => {
  const value = el.getAttribute("h-for").split("in").map(str => str.trim()); // split by in, remove whitespaces from start and end only
  const children = [...el.children];
  el.innerHTML = '';
  
  if (isNumber(value[0])) { 
    
    let numeralFor = []
    
    if (value[1].includes("by")) { // for 1 in 10 by 2
      const arr = [...value[1].split("by")]
      numeralFor = [...value[0], ...arr].map(s => Number(s));
    } else {
      numeralFor = [...value, ..."1"].map(s => Number(s));  
    }
    // for 1 in 10
    log(numeralFor)
    
    for (let i = numeralFor[0]; i < numeralFor[1]; i += numeralFor[2]) {
      children.forEach(child => {
        el.innerHTML += child.outerHTML
      })
    }
    
    
  } else { // loop through an array
    const elObj = { 
      name: value[1].split('.')[0],
      varName: value[1].split('.')[1] 
    }
    // hobby in hobbies 
    // -- here the value of `hobbies` is the `targetValue`
    const targetValue = window[elObj.name][elObj.varName]
    
    for (let i = 0; i < targetValue.length; i++) {
      children.forEach(child => {
        if (child.getAttribute("h-text")) {
          // now we will set the data-text generated value
          setElText(child)
        }
        
        el.innerHTML += child.outerHTML;
      })
    }
  }
})
