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