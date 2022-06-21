import { findTheColumnsToZero, createSystem, getResults, clearSystem } from "./algorithm.js";
let line

function closeModal(){
  let modal = document.getElementById('modal');
  let moreResults = document.getElementById('more-results');

  if (!moreResults.classList.contains('hidden')){
      moreResults.classList.add('hidden');
  }
  if (typeof modal == 'undefined' || modal === null)
      return;
  modal.style.display = 'none'
}

function getValues() {
  let system = document.querySelectorAll('.system-x')
 
  for (let index = 0; index < system.length; index++) {
    line = []
    for (let value = 0; value < system[index].childNodes.length; value++) {
      if(system[index].childNodes[value].nodeName === 'INPUT') {
        let inputValue = system[index].childNodes[value].value
        if (inputValue.length === 0) {
          alert('Insira as equações!')
          closeModal()
          return false;
        }
        else if(Number.isNaN(parseInt(inputValue))) {
          alert('Insira apenas números!')
          closeModal()
          return false
        }
        else {
          line.push(parseInt(inputValue))
        }
      }
    }
    createSystem(line)
  }
  return true
}

function showResults() {
  const results = getResults()
  let resultInput = document.querySelectorAll('.underline')
  for (let index = 0; index < results.length; index++) {
    if(!Number.isInteger(results[results.length - (index + 1)].value)) {
      resultInput[index].textContent = results[results.length - (index + 1)].value.toFixed(2)
    }
    else
    resultInput[index].textContent = results[results.length - (index + 1)].value
  }
}

btnSolve.addEventListener('click', () => {
    if(getValues()) {
      findTheColumnsToZero()
      showResults()
    }
    clearSystem()
})