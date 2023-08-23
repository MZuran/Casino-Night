//************************************************* Loading JSON *************************************************
function existingSave() {
    if (localStorage.getItem('savedGame')) {
      return true
    } else {
      return false
    }
  }
  
  async function loadJsonLog(isLocalGame) {

    let json
    let gameLog = JSON.parse(localStorage.getItem('gameLog'))

    if (isLocalGame) {
      let address = 'savedGame.json'

      await fetch(address)
      .then((response) => response.json())
      .then((data) => (json = data))
      .catch((error) => console.error(error))

      
      localStorage.setItem('playerMoney', JSON.stringify(json.currentMoney))
    } else {
      json = gameLog
    }

    if (!gameLog && !isLocalGame) {
      json = emptySavedGame()
      json.currentMoney = 1000
      localStorage.setItem('playerMoney', JSON.stringify(1000))
    }
  
    let betListContainer = document.getElementById('logsContainerBetList')
  
    let container = document.getElementById('logsContainer')

    let balanceColor
    if (json.acquiredMoney - json.lostMoney < 0) {
      balanceColor = "red"
    } else {
      balanceColor = "green"
    }
  
    //console.log(json)
    let message = "<p class='logsText'>"
    message = message + `Dinero Restante: ${json.currentMoney}$<br>`
    message = message + '<br>'
    message = message + `Cantidad de Apuestas Ganadas: <span class="hilight-green">${json.successfulBets}</span><br>`
    message = message + `Dinero Ganado: <span class="hilight-green">${json.acquiredMoney}$</span><br>`
    message = message + '<br>'
    message = message + `Cantidad de Apuestas Perdidas: <span class="hilight-red">${json.failedBets}</span><br>`
    message = message + `Dinero Perdido: <span class="hilight-red">${json.lostMoney}$</span><br>`
    message = message + '<br>'
    message = message + `Cantidad de Apuestas Totales: ${json.failedBets + json.successfulBets}<br>`
    message = message + `Balance neto: <span class="hilight-${balanceColor}">${json.acquiredMoney - json.lostMoney}$</span><br>`
    message = message + '</p>'
  
    container.innerHTML = message
  
    let parsedList = "<p class='logsText'>"
    //For Each time the wheel spun
    for (let i = 0; i < json.betResults.length; i = i + 1) {
      if (i > 0) {
        parsedList = parsedList + '<br>'
      }
      parsedList =
        parsedList + `Número Resultado: ${json.betResults[i].number}<br>`
  
      //For each bet made on this particular spin of the wheel
      for (let b = 0; b < json.betResults[i].betList.length; b = b + 1) {
        let color
        //Set result color
        if (json.betResults[i].betList[b][3]) {
          color = 'green'
        } else {
          color = 'red'
        }
  
        parsedList =
          parsedList +
          `<span class="hilight-${color}">
        ${json.betResults[i].betList[b][1]}$ al ${json.betResults[i].betList[b][0]} tipo ${json.betResults[i].betList[b][2]}
        </span><br>`
      }
    }
    parsedList = parsedList + '</p>'
  
    betListContainer.innerHTML = parsedList
    //localStorage.setItem('playerMoney', JSON.stringify(json.currentMoney))
    //toastifyAlert(`Dinero restante: ${playerMoney()}`, "notification", true);
    betList = [];
    updateSlider();
  }
  loadJsonLog()
  //json.betResults[0].betList.length

