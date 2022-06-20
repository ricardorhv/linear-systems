const system = [
  [1, -1, -1, 0, 0, 0],
  [5, 2, 0, 0, 0, 5],
  [0, -2, 5, 2, 0, 5],
  [0, 0, 1, -1, -1, 0],
  [0, 0, 0, 2, -5, 1],
]
/*
const system = [
  [1, -1, -1, 0,],
  [0, -2, 5, 4,],
  [3, 2, 0, 21,],
]
*/ 
//system[row][col]

// Linha 1 coluna 1 tem que ser um valor diferente de 0  e de preferência 1
// Substituir os resultados

//ORG-EQ
function verifyTheFirstColumn() {
  if (system[0][0] === 0) {
    for (let index = system.length-1; index > 0; index--) {
      if ( system[index][0] === 1 ) {
        [system[0], system[index]] = [system[index], system[0]]
        return
      }
    }
  }
}

function findTheColumnWithMoreZeros() {
  let quantityOfZerosByLine = []
  
  for (let line = 0; line < system.length; line++) {
    let countZeros = 0
    for (let col = 0; col < system[line].length; col++) {
      if (system[line][col] === 0) {
        countZeros++
      }
    }
    quantityOfZerosByLine.push(countZeros)
  }
  return quantityOfZerosByLine
}

function equation(lineUsed, lineMain) {
  const value = lineMain.find((x) => x !== 0)
  const col = lineMain.indexOf(value)
  let lineTemporary = []
  let lineTemporaryTwo = []
  let newLineMain = []
  let lineIndex = system.findIndex(line => line === lineMain)

  if (lineUsed[col] / value === 1 || lineUsed[col] / value === -1) {
    for (let index = 0; index < lineMain.length; index++) {
      newLineMain.push((lineUsed[col] > 0 && value > 0) || (lineUsed[col] < 0 && value < 0) 
      ? lineMain[index] - lineUsed[index]
      : lineMain[index] + lineUsed[index])
    }
  }
  else if (lineUsed[col] > value || (lineUsed[col] * -1) > value) {
    if (lineUsed[col] % value === 0) {
      let mult = lineUsed[col] > 0 ? lineUsed[col] / value : (lineUsed[col] * -1) / value
      lineTemporary = lineMain.map(el => el * mult)
      for (let index = 0; index < lineMain.length; index++) {
        newLineMain.push(lineUsed[col] > 0 
          ? lineTemporary[index] - lineUsed[index]
          : lineTemporary[index] + lineUsed[index])
      }
    }
    else if (lineUsed[col] % value !== 0) {
      lineTemporary = lineMain.map(el => el * lineUsed[col])
      lineTemporaryTwo = lineUsed.map(el => el * value)

      for (let index = 0; index < lineMain.length; index++) {
        newLineMain.push((lineTemporary[col] < 0 && lineTemporaryTwo[col] < 0)
         || (lineTemporary[col] > 0 && lineTemporaryTwo[col] > 0) 
         ? lineTemporary[index] - lineTemporaryTwo[index]
         : lineTemporary[index] + lineTemporaryTwo[index])
      }
    }
  }
  else if (lineUsed[col] < value || (lineUsed[col] * -1) < value) {
    if (value % lineUsed[col] === 0) {
      let mult = lineUsed[col] > 0 ? value / lineUsed[col] : value / (lineUsed[col] * -1)
      lineTemporary = lineUsed.map(el => el * mult)
      for (let index = 0; index < lineMain.length; index++) {
        newLineMain.push(lineTemporary[col] > 0 
          ? lineMain[index] - lineTemporary[index] 
          : lineMain[index] + lineTemporary[index])
      }
    }
    else if (value % lineUsed[col] !== 0) {
      lineTemporary = lineMain.map(el => el * lineUsed[col])
      lineTemporaryTwo = lineUsed.map(el => el * value)

      for (let index = 0; index < lineMain.length; index++) {
        newLineMain.push((lineTemporary[col] < 0 && lineTemporaryTwo[col] < 0)
         || (lineTemporary[col] > 0 && lineTemporaryTwo[col] > 0) 
         ? lineTemporary[index] - lineTemporaryTwo[index]
         : lineTemporary[index] + lineTemporaryTwo[index])
      }
    }
  }
  system.forEach(line => {
    if (line === lineMain) {
      system.splice(lineIndex, 1, newLineMain)
    }
  })
}

// equation(system[0], system[2])

function findNumberOne(lines, col) {
  for (let index = 0; index < lines.length; index++) {

    if(lines[index][col] === 1 || lines[index][col] === -1) {
      return lines[index]
    }
  }
  return null
}

function findTheNumberEasiest(lines, col, lineMain) {
  return lines.find(line => {
    if (line[col] / lineMain[col] === 1 || line[col] / lineMain[col] === -1) {
      return line
    }
  }) ||
  lines.find(line => {
    if (line[col] % lineMain[col] === 0 || line[col] % lineMain[col] === -0) {
      return line
    }
  }) ||
  lines[0]
}

function findTheLinesWithoutZeroBeforeTheCol(line, col) {
  let linesWithoutZeroBefore = []
  let itHasZero
  let count

  for (let lineSystem = 0; lineSystem < system.length; lineSystem++) {
    itHasZero = false
    count = 0
    if (system[lineSystem] !== line && system[lineSystem][col] !== 0) {
      for (let index = (col - 1); index >= 0; index--) {
        if (system[lineSystem][index] === 0) {
          count++
        } 
      }
      itHasZero = count === col ? true : false
      if(itHasZero === true)
      linesWithoutZeroBefore.push(system[lineSystem])
    }
  }
  return linesWithoutZeroBefore
}

function findTheLinesToBeUsed(line, col) {
  let linesToBeUsed = []
  if (col !== 0) {
    linesToBeUsed = findTheLinesWithoutZeroBeforeTheCol(line, col)
  } else {
    linesToBeUsed = system.filter(lineSystem => {
      if (lineSystem[col] !== 0 && lineSystem !== line) {
        return lineSystem
      }
    })
  }
  return linesToBeUsed
}

//Find the columns that the algorithm must zero
function findTheColumnsToZero() {
  let count = 1
  for (let col = 0; col < count; col++) {
    for (let line = count; line < system.length; line++) {
      if (system[line][col] !== 0) {
        //Found the values that must to be equals zero
        console.log(`Valor a ser zerado: ${system[line][col]}`);
        calculate(system[line], col)
        showSystem()
      }
    }

    if(count !== system.length)
    count++
  }
  
}

function calculate(line, col) {
  let lines = findTheLinesToBeUsed(line, col)
  console.log(lines);
  let lineUsed = findNumberOne(lines, col) ?? findTheNumberEasiest(lines, col, line)
  console.log(`Usamos a linha:[${lineUsed}]`);
  equation(lineUsed, line)
}

function calcTheResults() {
  
}

function showSystem() {
  system.forEach(row => console.log(row))
}
showSystem()
findTheColumnsToZero()
calcTheResults()