//Cómo generar un número al azar y cómo saber si un número era par o no lo busqué en google

var playerMoney = 1000

function numberOfColor(roulletteNumber) {
  if (roulletteNumber == 0) {
    return 'green'
  } else if (roulletteNumber % 2 === 0) {
    return 'black'
  } else if (!(roulletteNumber % 2 === 0)) {
    return 'red'
  }

  return 'error'
}

function isEven(roulletteNumber) {
  if (roulletteNumber == 0) {
    return false
  }

  if (roulletteNumber % 2 === 0) {
    return true
  } else {
    return false
  }
}

function spinRoullette() {
  return Math.floor(Math.random() * 37)
}

function nonRepeatingSingleNumberBet(amount, number) {
  let result = spinRoullette()

  console.log('Se apostaron ' + amount + '$ de los ' + playerMoney + '$')
  console.log('La ruleta gira y cae en ' + result)
  console.log(' ')

  if (number == result) {
    amount = amount * 35
    console.log('Se han ganado ' + amount + '$')
    playerMoney = playerMoney + amount
    console.log('Pozo del jugador: ' + playerMoney + '$')
    console.log(' ')
  } else {
    console.log('Se han perdido ' + amount + '$')
    playerMoney = playerMoney - amount
    console.log('Pozo del jugador: ' + playerMoney + '$')
    console.log(' ')
  }
}

function singleNumberBet(amount, number, times) {
  if (times) {
    for (i = 0; i < times; i++) {
      nonRepeatingSingleNumberBet(amount, number)
    }
  } else {
    nonRepeatingSingleNumberBet(amount, number)
  }
}
