//************************************************* Globally Accessible Variables *************************************************
let playerMoney = parseInt(1000)

//************************************************* Helper Universal Functions *************************************************
function isEven(number) {
  if (number == 0) {
    return false
  }

  if (number % 2 === 0) {
    return true
  } else {
    return false
  }
}

function validAmount(money) {
  if (money < 1 || money > playerMoney) {
    return false
  }
  return true
}
//************************************************* Objects *************************************************
let betList = []

const roulette = {
  validColorList: ['rojo', 'negro', 'verde', 'red', 'black', 'green'],

  redColorList: [
    1,
    3,
    5,
    7,
    9,
    12,
    14,
    16,
    18,
    19,
    21,
    23,
    25,
    27,
    30,
    32,
    34,
    36,
  ],

  blackColorList: [
    2,
    4,
    6,
    8,
    10,
    11,
    13,
    15,
    17,
    20,
    22,
    24,
    26,
    28,
    29,
    31,
    33,
    35,
  ],

  rouletteDomElementsClasses: [
    'square1',
    'square2',
    'square3',
    'square4',
    'square5',
    'square6',
    'square7',
    'square8',
    'square9',
    'square10',
    'square11',
    'square12',
    'square13',
    'square14',
    'square15',
    'square16',
    'square17',
    'square18',
    'square19',
    'square20',
    'square21',
    'square22',
    'square23',
    'square24',
    'square25',
    'square26',
    'square27',
    'square28',
    'square29',
    'square30',
    'square31',
    'square32',
    'square33',
    'square34',
    'square35',
    'square36',
    'square0',
    'firstRowSquare',
    'secondRowSquare',
    'thirdRowSquare',
    'firstDozenSquare',
    'secondDozenSquare',
    'thirdDozenSquare',
    'firstHalfSquare',
    'evenSquare',
    'redSquare',
    'blackSquare',
    'oddSquare',
    'secondHalfSquare',
  ],

  //Helper roulette functions
  validColor: function (color) {
    //color = prompt()
    color = color.toLowerCase()
    return this.validColorList.includes(color)
  },

  validNumber: function (number) {
    if (0 <= number <= 36) {
      return true
    } else {
      return false
    }
  },

  askForBettedAmount: function (predefinedAmount) {
    let amount
    if (!predefinedAmount) {
      amount = prompt(
        '¿Cuánto dinero desea apostar? Dinero Disponible: ' +
          playerMoney +
          '\n\nRecuerde que una vez que apueste, se le retirará el dinero hasta saber si su apuesta ganó o perdió',
        100,
      )
    } else {
      amount = predefinedAmount
    }

    if (!amount) {
      amount = 0
    }
    if (amount > playerMoney) {
      alert('Error in askForBettedAmount')
    }
    amount = parseInt(amount)

    playerMoney = playerMoney - amount

    return amount
  },

  spin: function () {
    return Math.floor(Math.random() * 37)
  },

  color: function (rouletteNumber) {
    if (rouletteNumber == 0) {
      return 'green'
    } else if (this.redColorList.includes(rouletteNumber)) {
      return 'red'
    } else if (this.blackColorList.includes(rouletteNumber)) {
      return 'black'
    }

    alert('Error en roulette.color()')
    console.log('Error en roulette.color()')
    return 'error'
  },

  convertColorToEnglish: function (color) {
    switch (color) {
      case 'rojo':
      case 'red':
        return 'red'
      case 'verde':
      case 'green':
        return 'green'
      case 'negro':
      case 'black':
        return 'black'
      default:
        alert('Error en roulette.convertColorToEnglish()')
        console.log('Error en roulette.convertColorToEnglish()')
        break
    }
  },

  //Specific bet types
  singleNumberBet: function (rouletteNumber, bettedAmount, bettedNumber) {
    if (rouletteNumber == bettedNumber) {
      alert(
        `La bola cae en ${rouletteNumber}\n¡La apuesta de ${bettedAmount}$ al número ${bettedNumber} ganó $ ${
          bettedAmount * 35
        }!`,
      )
      bettedAmount = bettedAmount * 36
      playerMoney = playerMoney + bettedAmount
    } else {
      console.log('Bet Lost')
      alert(
        `La bola cae en ${rouletteNumber}\n¡La apuesta de ${bettedAmount}$ al número ${bettedNumber} perdió!`,
      )
    }
  },

  colorBet: function (rouletteNumber, bettedAmount, bettedColor) {
    let landedColor = this.color(rouletteNumber)
    bettedColor = this.convertColorToEnglish(bettedColor)

    if (landedColor == bettedColor) {
      alert(
        `La bola cae en ${landedColor}\n¡La apuesta de ${bettedAmount}$ al color ${bettedColor} ganó $ ${
          bettedAmount * 2
        }!`,
      )
      playerMoney = playerMoney + bettedAmount * 3
    } else {
      alert(
        `La bola cae en ${landedColor}\n¡La apuesta de ${bettedAmount}$ al color ${bettedColor} perdió!`,
      )
    }
  },

  dozenBet: function (rouletteNumber, bettedAmount, bettedDozen) {
    let isBettedDozenCorrect = false
    if (bettedDozen == 1 && 1 <= rouletteNumber && rouletteNumber <= 12) {
      isBettedDozenCorrect = true
    } else if (
      bettedDozen == 2 &&
      13 <= rouletteNumber &&
      rouletteNumber <= 24
    ) {
      isBettedDozenCorrect = true
    } else if (
      bettedDozen == 3 &&
      25 <= rouletteNumber &&
      rouletteNumber <= 36
    ) {
      isBettedDozenCorrect = true
    }

    if (isBettedDozenCorrect) {
      alert(
        `La bola cae en ${rouletteNumber}\n¡La apuesta de ${bettedAmount}$ a la ${bettedDozen}º docena ganó $ ${
          bettedAmount * 2
        }!`,
      )
      playerMoney = playerMoney + bettedAmount * 3
    } else {
      alert(
        `La bola cae en ${rouletteNumber}\n¡La apuesta de ${bettedAmount}$ a la ${bettedDozen}º docena perdió!`,
      )
    }
  },

  //Adding Event Listeners to DOM
  prepareEvents: function () {
    for (let i = 0; i < roulette.rouletteDomElementsClasses.length; i++) {
      let className = roulette.rouletteDomElementsClasses[i]
      let button = document.getElementsByClassName(className)

      //The first 37 Items (including item number 0) are the single number squares so they all share the same kind of bet
      if (i < 37) {
        let squareNumber = roulette.rouletteDomElementsClasses[i]
        squareNumber = parseInt(squareNumber.replace('square', ''))
        //console.log(button[0])

        //THIS IS WHAT ACTUALLY HAPPENS WHEN YOU CLICK A NUMBER NOW
        button[0].addEventListener('click', function () {
          console.log(squareNumber)
          let amount = parseInt(document.getElementById('demo').innerText)
          roulette.makeBet('number', amount, squareNumber)
        })
      }

      //The items 37 through 39 are the row bets
      if (i >= 37 && i <= 39) {
        button[0].addEventListener('click', function () {
          console.log('Im a row!')
        })
      }

      //The items 40 through 42 are the dozen bets
      if (i >= 40 && i <= 42) {
        button[0].addEventListener('click', function () {
          console.log('Im a dozen!')
        })
      }

      //The rest of the unique bets are here
      switch (className) {
        case 'firstHalfSquare':
          button[0].addEventListener('click', function () {
            console.log("Im the first half square!")
          })
          break

          case 'secondHalfSquare':
          button[0].addEventListener('click', function () {
            console.log("Im the second half square!")
          })
          break

          case 'evenSquare':
          button[0].addEventListener('click', function () {
            console.log("Im the even square!")
          })
          break

          case 'oddSquare':
          button[0].addEventListener('click', function () {
            console.log("Im the odd square!")
          })
          break

          case 'redSquare':
          button[0].addEventListener('click', function () {
            console.log("Im the red square!")
          })
          break

          case 'blackSquare':
          button[0].addEventListener('click', function () {
            console.log("Im the black square!")
          })
          break

        default:
          break
      }
    }
  },

  //Making the bets, storing them on an array and running them
  makeBet: function (predefinedBetType, predefinedAmount, predefinedParameter) {
    let betType
    let amount

    if (!predefinedBetType) {
      betType = prompt(
        '¿Qué tipo de apuesta desea hacer?\n\nTambién puede cancelar la apuesta',
        'color',
      )
    } else {
      betType = predefinedBetType
    }

    amount = this.askForBettedAmount(predefinedAmount)

    switch (betType) {
      case 'color':
        //********************************Start of Casetype Color ********************************
        let color = prompt(
          '¿Desea apostar al rojo, al negro o al verde? (Default: Rojo)',
          'rojo',
        )

        if (color === null) {
          color = 'red'
        }

        if (validAmount(amount) && this.validColor(color)) {
          betList.push([betType, amount, color])
          alert('¡Apuesta aceptada!')
          console.log(betList)
        } else {
          alert('¡Datos Inválidos!')
          playerMoney = playerMoney + amount
          this.makeBet()
        }
        //********************************End of Casetype Color ********************************
        break

      case 'number':
      case 'numero':
      case 'número':
        //********************************Start of Casetype Number ********************************
        let number
        let usedPredefinedAmount = false

        if (predefinedAmount) {
          usedPredefinedAmount = true
        }

        if (!predefinedParameter && predefinedParameter != 0) {
          number = prompt('¿A qué número desea apostar? Default: 0', 0)
          if (!number) {
            number = 0
          }
          number = parseInt(number)
        } else {
          number = predefinedParameter
        }

        if (
          (validAmount(amount) || usedPredefinedAmount) &&
          this.validNumber(number)
        ) {
          betList.push([betType, amount, number])
          alert('¡Apuesta aceptada!')
          console.log(betList)
          updateSlider()
        } else {
          alert('¡Datos Inválidos!')

          console.log(amount)
          console.log(number)

          playerMoney = playerMoney + amount
          updateSlider()
          this.makeBet()
        }

        //********************************Start of Casetype Number ********************************
        break

      case 'dozen':
      case 'dozens':
      case 'docena':
      case 'docenas':
        //********************************Start of Casetype Dozen ********************************
        let dozen = prompt(
          '¿A cuál docena desea apostar?\n\n1: Primera docena\n2: Segunda docena\n3: Tercer docena',
          1,
        )
        dozen = parseInt(dozen)
        if ((dozen == 1 || dozen == 2 || dozen == 3) && validAmount(amount)) {
          //dozenBet: function(rouletteNumber, bettedAmount, bettedDozen)
          betList.push([betType, amount, dozen])
          alert('¡Apuesta aceptada!')
          console.log(betList)
        } else {
          alert('¡Datos Inválidos!')
          playerMoney = playerMoney + amount
          this.makeBet()
        }
        //********************************End of Casetype Dozen ********************************
        break

      case 'cancel':
      case 'cancelar':
      case null:
        alert('Apuesta cancelada')
        playerMoney = playerMoney + amount
        break

      default:
        alert(
          '¡' +
            betType +
            ' no es un tipo de apuesta aceptada!. Asegúrese de escribir bien.',
        )
        this.makeBet()
        break
    }
  },

  runBet: function () {
    let rouletteNumberResult = this.spin()
    alert(`¡La bola cayó en ${rouletteNumberResult}!`)

    //betList formatting:
    //betList[Bet Index][The Type of Bet, Betted Amount, Parameter Of Bet]

    for (let i = 0; i < betList.length; i++) {
      switch (betList[i][0]) {
        case 'color':
          //colorBet: function(rouletteNumber, bettedAmount, bettedColor)
          this.colorBet(rouletteNumberResult, betList[i][1], betList[i][2])
          break

        case 'number':
        case 'numero':
        case 'número':
          //singleNumberBet: function (rouletteNumber, bettedAmount, bettedNumber)
          this.singleNumberBet(
            rouletteNumberResult,
            betList[i][1],
            betList[i][2],
          )
          break

        case 'dozen':
        case 'dozens':
        case 'docena':
        case 'docenas':
          //dozenBet: function (rouletteNumber, bettedAmount, bettedDozen)
          this.dozenBet(rouletteNumberResult, betList[i][1], betList[i][2])
          break
      }
    }
    alert(`Dinero restante: ${playerMoney}`)
    betList = []
    updateSlider()
  },
}

//************************************************* Events *************************************************
roulette.prepareEvents()

//************************************************* Slider *************************************************
let slider = document.getElementById('myRange')
let output = document.getElementById('demo')
let board = document.getElementById('rouletteParent')
output.innerHTML = slider.value

document.getElementById('myRange').max = playerMoney

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function () {
  updateSlider()
  output.innerHTML = this.value
}

// Update the current slider value anytime the board is clicked anywhere
board.onclick = function () {
  updateSlider()
  output.innerHTML = slider.value
}

function updateSlider() {
  slider.max = playerMoney
  if (slider.value > playerMoney) {
    slider.value = playerMoney
    output.innerHTML = playerMoney
  }

  if (playerMoney < 100) {
    output.classList = 'hilight-red'
  } else {
    output.classList = ''
  }

  if (playerMoney == 0) {
    slider.classList = 'display-none'
  } else {
    slider.classList = 'slider'
  }
}
