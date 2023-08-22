//************************************************* LocalStorage *************************************************
/* let playerMoney = parseInt(1000) */
function playerMoney(isAdding, amount) {
    if (isAdding) {
      let money = JSON.parse(localStorage.getItem('playerMoney'))
      money = money + amount
      localStorage.setItem('playerMoney', JSON.stringify(money))
    } else {
      let money = JSON.parse(localStorage.getItem('playerMoney'))
  
      if (!money && money != 0) {
        let newAmount = JSON.stringify(1000)
        localStorage.setItem('playerMoney', newAmount)
      }
  
      return JSON.parse(localStorage.getItem('playerMoney'))
    }
  }
  
  function emptySavedGame() {
    return {
      currentMoney: 0,
      acquiredMoney: 0,
      lostMoney: 0,
      betResults: [],
      successfulBets: 0,
      failedBets: 0,
    }
  }

  function addSpunNumberLog(number) {
    let gameLog = JSON.parse(localStorage.getItem('gameLog'))
    if (!gameLog) {
        gameLog = emptySavedGame()
    }

    gameLog.betResults.push({
        "number": number,
        "betList": []
    })

    localStorage.setItem('gameLog', JSON.stringify(gameLog))
  }

  function addBetToSpunNumberLog(bet, isWinner) {
    let gameLog = JSON.parse(localStorage.getItem('gameLog'))

    spunGameNumber = gameLog.betResults.length - 1

    if (!gameLog || spunGameNumber < 0) {
        console.log("Invalid gamelog error!")
        return 1
    }

    bet.push(isWinner)

    gameLog.betResults[spunGameNumber].betList.push(bet)

    if(isWinner) {
      gameLog.acquiredMoney += bet[1]
      gameLog.successfulBets += 1
    } else {
      gameLog.lostMoney += bet[1]
      gameLog.failedBets += 1
    }

    gameLog.currentMoney = playerMoney()

    localStorage.setItem('gameLog', JSON.stringify(gameLog))
  }