//************************************************* Helper Universal Functions *************************************************
function validAmount(money, usedPredefinedAmount) {
    if ((money < 1 || money > playerMoney()) && !usedPredefinedAmount) {
      return false
    }
    return true
  }

  updateInfoAnimation()
function updateInfoAnimation() {
  //'infoButton'
  if (JSON.parse(localStorage.getItem('readInfo'))) {
    document.getElementById('infoButton').classList = "infoButton"
  } else {
    document.getElementById('infoButton').classList = "infoButton sparkling-icon"
  }
}