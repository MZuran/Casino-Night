//************************************************* Programmer's Thought Log *************************************************
/*
 PLAN ABOUT HOW WOULD THIS IDEALLY WORK:
 The player will make a number of bets based on color (Done), column, rows, number (Done) or dozens.
 These bets will be saved somewhere with all the necessary paremeters. Maybe an array will work?
 Once the player is done placing bets, he will call for a function to spin the roulette wheel which will return a single result.
 This result will be the final parameter required for all the bets, and will dictate wether the player will win or lose his money.
 What I need to do now is to figure out how to have a list or array of incomplete functions that are lacking "rouletteNumber".
 And then next thing I need to do is to have them all be called once one single "rouletteNumber" is generated for them all.

 TO DO:
 -Google or find out how to do that. (Done)

 POTENTIAL SOLUTIONS:
 -I found out about something called partialApply. 
  (Solution discarded, not practical for this issue.)

 -Make a function containing all possible bets, a fixed number of parameters and a switch case to select which bet has the player made.
  We can make a list of parameters to represent all the bets (betList) and once it's done, roll a number and use the list to check the result of the bets.
  This will be done in two functions; one to make the list (roulette.makeBet) and another to run the list with all of its parameters and one result (roulette.runBet).
  (This solution was the perfect one to keep)
 */

//************************************************* Globally Accessible Variables *************************************************
var playerMoney = parseInt(1000)

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

  askForBettedAmount: function () {
    let amount = prompt(
      '¿Cuánto dinero desea apostar? Dinero Disponible: ' +
        playerMoney +
        '\n\nRecuerde que una vez que apueste, se le retirará el dinero hasta saber si su apuesta ganó o perdió',
      100,
    )

    if (!amount) {
      amount = 0
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
    } else if (rouletteNumber % 2 === 0) {
      return 'black'
    } else if (!(rouletteNumber % 2 === 0)) {
      return 'red'
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
        'La bola cae en ' +
          rouletteNumber +
          '\n¡La apuesta de ' +
          bettedAmount +
          '$ al al número ' +
          bettedNumber +
          ' ganó $' + bettedAmount * 35
      )
      bettedAmount = bettedAmount * 36
      playerMoney = playerMoney + bettedAmount
    } else {
      alert(
        'La bola cae en ' +
          rouletteNumber +
          '\n¡La apuesta de ' +
          bettedAmount +
          '$ al al número ' +
          bettedNumber +
          ' perdió!',
      )
    }
  },

  colorBet: function (rouletteNumber, bettedAmount, bettedColor) {
    landedColor = this.color(rouletteNumber)
    bettedColor = this.convertColorToEnglish(bettedColor)

    if (landedColor == bettedColor) {
      alert(
        'La bola cae en ' +
          landedColor +
          '\n¡La apuesta de ' +
          bettedAmount +
          '$ al color ' +
          bettedColor +
          ' ganó $' + bettedAmount * 2
      )
      playerMoney = playerMoney + bettedAmount * 3
    } else {
      alert(
        'La bola cae en ' +
          landedColor +
          '\n¡La apuesta de ' +
          bettedAmount +
          '$ al color ' +
          bettedColor +
          ' perdió!',
      )
    }
  },

  //Making the bets, storing them on an array and running them
  makeBet: function () {
    let betType = prompt(
      '¿Qué tipo de apuesta desea hacer?\n\nTambién puede cancelar la apuesta',
      'color',
    )

    let amount = this.askForBettedAmount()

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
          this.makeBet()
        }
        //********************************End of Casetype Color ********************************
        break

      case 'number':
      case 'numero':
      case 'número':
        //********************************Start of Casetype Number ********************************
        let number = prompt('¿A qué número desea apostar? Default: 0', 0)
        if (!number) {
          number = 0
        }
        number = parseInt(number)

        if (validAmount(amount) && this.validNumber(number)) {
          betList.push([betType, amount, number])
          alert('¡Apuesta aceptada!')
          console.log(betList)
        } else {
          alert('¡Datos Inválidos!')
          this.makeBet()
        }

        //********************************Start of Casetype Number ********************************
        break

      case 'cancel':
      case 'cancelar':
      case null:
        alert('Apuesta cancelada')
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
    alert('¡La bola cayó en ' + rouletteNumberResult + '!')

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
      }
    }
    alert("Dinero restante: " + playerMoney)
    betList = []
  },
}