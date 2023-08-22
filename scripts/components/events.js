//************************************************* Button Events *************************************************
let seeOptions = false
let optionsButton = document.getElementById('optionsButton')
optionsButton.addEventListener('click', function () {
  toggleOptionsCollapse()
})

let infoButton = document.getElementById('infoButton')
infoButton.addEventListener('click', function () {
  localStorage.setItem('readInfo', JSON.stringify(true))
  updateInfoAnimation()

  let content = "<h3>¡Bienvenido a la mesa de ruleta!</h3><br>" +
  "Todas las partidas se empiezan con 1000$. Para apostar, usá el <b>slider</b> de arriba de el tablero para seleccionar una cantidad y luego, ¡hacé click en el <b>tablero</b>!<br><br>" +
  "¡Recordá mirar la <b>configuración ⚙️</b> y el <b>historial de apuestas 📋</b> para divertirte más!" +
  "<br><br>Creado por Matías Zuran. <br> matias.zuran@gmail.com"
  alertify.alert(content).set('basic', true); 
})

let seeLogs = false
let logsButton = document.getElementById('logsButton')
logsButton.addEventListener('click', function () {
  toggleLogsCollapse()
})

let resetButton = document.getElementById('restartGameButton')
resetButton.addEventListener('click', function () {
  toastifyAlert('Dinero Restante: 1000', 'notification', true)
  localStorage.setItem('playerMoney', 1000)
  updateSlider()
  output.innerHTML = this.value
  document.getElementById('playerMoneySliderNumberDisplay').innerText = 50

  let newLogObject = emptySavedGame()
  newLogObject.currentMoney = 1000
  localStorage.setItem('gameLog', JSON.stringify(newLogObject))
  loadJsonLog()
  toggleLogsCollapse()

  localStorage.setItem('readInfo', JSON.stringify(false))
  updateInfoAnimation()
})

let exampleLogs = document.getElementById('loadExampleLogs')
exampleLogs.addEventListener('click', function () {
  loadJsonLog(true)
})

//************************************************* Events Helper Functions *************************************************
function isSelectedSquareClass(className, isAdding) {
  let element = document.getElementsByClassName(className)

  if (
    element &&
    !element[0].classList.contains('selected-square') &&
    isAdding
  ) {
    element[0].classList.add('selected-square')
  }

  if (
    element &&
    element[0].classList.contains('selected-square') &&
    !isAdding
  ) {
    element[0].classList.remove('selected-square')
  }
}

function removeAllSelectedSquareClasses() {
  const elements = document.querySelectorAll('.selected-square')
  elements.forEach((element) => {
    element.classList.remove('selected-square')
  })
}

//************************************************* Roulette Events *************************************************
function prepareRouletteEvents() {
  for (let i = 0; i < roulette.rouletteDomElementsClasses.length; i++) {
    let className = roulette.rouletteDomElementsClasses[i]
    let button = document.getElementsByClassName(className)

    button[0].addEventListener('click', function () {
      if (roulette.getSliderNumber()) {
        isSelectedSquareClass(className, true)
      }
    })

    //The first 37 Items (including item number 0) are the single number squares so they all share the same kind of bet
    if (i < 37) {
      let squareNumber = roulette.rouletteDomElementsClasses[i]
      squareNumber = parseInt(squareNumber.replace('square', ''))
      //console.log(button[0])

      //THIS IS WHAT ACTUALLY HAPPENS WHEN YOU CLICK A NUMBER NOW
      button[0].addEventListener('click', function () {
        //console.log(squareNumber)
        let amount = roulette.getSliderNumber()
        roulette.makeBet('number', amount, squareNumber)
      })
    }

    //The items 37 through 39 are the row bets
    if (i >= 37 && i <= 39) {
      let rowNumber = roulette.rouletteDomElementsClasses[i]
      switch (rowNumber) {
        case 'firstRowSquare':
          rowNumber = 1
          break
        case 'secondRowSquare':
          rowNumber = 2
          break
        case 'thirdRowSquare':
          rowNumber = 3
          break
      }
      button[0].addEventListener('click', function () {
        //console.log(rowNumber)
        let amount = roulette.getSliderNumber()
        roulette.makeBet('row', amount, rowNumber)
      })
    }

    //The items 40 through 42 are the dozen bets
    if (i >= 40 && i <= 42) {
      button[0].addEventListener('click', function () {
        let amount = roulette.getSliderNumber()

        switch (this.classList[0]) {
          case 'firstDozenSquare':
            roulette.makeBet('dozen', amount, 1)
            break

          case 'secondDozenSquare':
            roulette.makeBet('dozen', amount, 2)
            break

          case 'thirdDozenSquare':
            roulette.makeBet('dozen', amount, 3)
            break
        }
      })
    }

    //The rest of the unique bets are here
    switch (className) {
      case 'firstHalfSquare':
        button[0].addEventListener('click', function () {
          let amount = roulette.getSliderNumber()
          roulette.makeBet('half', amount, 1)
        })
        break

      case 'secondHalfSquare':
        button[0].addEventListener('click', function () {
          let amount = roulette.getSliderNumber()
          roulette.makeBet('half', amount, 2)
        })
        break

      case 'evenSquare':
        button[0].addEventListener('click', function () {
          let amount = roulette.getSliderNumber()
          roulette.makeBet('even', amount, 'even')
        })
        break

      case 'oddSquare':
        button[0].addEventListener('click', function () {
          let amount = roulette.getSliderNumber()
          roulette.makeBet('odd', amount, 'odd')
        })
        break

      case 'redSquare':
        button[0].addEventListener('click', function () {
          let amount = roulette.getSliderNumber()
          roulette.makeBet('color', amount, 'red')
        })
        break

      case 'blackSquare':
        button[0].addEventListener('click', function () {
          let amount = roulette.getSliderNumber()
          roulette.makeBet('color', amount, 'black')
        })
        break

      default:
        break
    }
  }

  let rouletteButton = document.getElementById('rouletteButton')
  rouletteButton.addEventListener('click', function () {
    roulette.runBet()
    loadJsonLog()
  })

  let rouletteCancelBetButton = document.getElementById('cancelBetButton')
  rouletteCancelBetButton.addEventListener('click', function () {
    playerMoney(true, roulette.sumSecondParameters(betList))
    betList = []
    updateSlider()
    /* alert("Apuestas Canceladas") */
    toastifyAlert('Apuestas Canceladas', 'notification')
    removeAllSelectedSquareClasses()
  })
}
prepareRouletteEvents()