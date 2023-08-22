//************************************************* Helper Universal Functions *************************************************
function validAmount(money, usedPredefinedAmount) {
    if ((money < 1 || money > playerMoney()) && !usedPredefinedAmount) {
      return false
    }
    return true
  }