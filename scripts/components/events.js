//************************************************* Events *************************************************
roulette.prepareEvents()

let seeOptions = false
let optionsButton = document.getElementById('optionsButton')
optionsButton.addEventListener('click', function () {
  toggleOptionsCollapse()
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
})

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