//************************************************* Sliders *************************************************
//||||||||||||||||||||||Player Money Slider||||||||||||||||||||||
let playerMoneySlider = document.getElementById('playerMoneySlider')
let output = document.getElementById('playerMoneySliderNumberDisplay')
let board = document.getElementById('rouletteParent')
output.innerHTML = playerMoneySlider.value

document.getElementById('playerMoneySlider').max = playerMoney()

// Update the current slider value (each time you drag the slider handle)
playerMoneySlider.oninput = function () {
  updateSlider()
  output.innerHTML = this.value
}

// Update the current slider value anytime the board is clicked anywhere
board.onclick = function () {
  updateSlider()
  output.innerHTML = playerMoneySlider.value
}

function updateSlider() {
  let money = playerMoney()
  playerMoneySlider.max = money
  if (output.innerHTML > money) {
    output.innerHTML = money
  }
  if (playerMoneySlider.value > money) {
    playerMoneySlider.value = money
    output.innerHTML = money
  }

  if (money < 100) {
    output.classList = 'hilight-red'
  } else {
    output.classList = ''
  }

  if (money == 0) {
    playerMoneySlider.classList = 'display-none'
  } else {
    playerMoneySlider.classList = 'slider'
  }
}
updateSlider()
//||||||||||||||||||||||Scale Slider||||||||||||||||||||||
let scaleSlider = document.getElementById('scaleSlider')
scaleSlider.value = 30

function updateScaleSlider() {
  let scaleValue = scaleSlider.value
  //577.5 / 172
  let parent = document.getElementById('rouletteParent')

  parent.style.width = `${scaleValue * 1.5}vw`
  parent.style.height = `${scaleValue}vh`
}
updateScaleSlider()
scaleSlider.onclick = function () {
  updateScaleSlider()
}
