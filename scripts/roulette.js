//************************************************* Objects *************************************************
let betList = [];

const roulette = {
  validColorList: ["rojo", "negro", "verde", "red", "black", "green"],

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

  numberRows: [
    [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36],
    [2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35],
    [1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34],
  ],

  rouletteDomElementsClasses: [
    "square1",
    "square2",
    "square3",
    "square4",
    "square5",
    "square6",
    "square7",
    "square8",
    "square9",
    "square10",
    "square11",
    "square12",
    "square13",
    "square14",
    "square15",
    "square16",
    "square17",
    "square18",
    "square19",
    "square20",
    "square21",
    "square22",
    "square23",
    "square24",
    "square25",
    "square26",
    "square27",
    "square28",
    "square29",
    "square30",
    "square31",
    "square32",
    "square33",
    "square34",
    "square35",
    "square36",
    "square0",
    "firstRowSquare",
    "secondRowSquare",
    "thirdRowSquare",
    "firstDozenSquare",
    "secondDozenSquare",
    "thirdDozenSquare",
    "firstHalfSquare",
    "evenSquare",
    "redSquare",
    "blackSquare",
    "oddSquare",
    "secondHalfSquare",
  ],

  //||||||||||||||||||||||Helper roulette functions||||||||||||||||||||||
  betRewards: function (
    rouletteNumber,
    betType,
    bettedAmount,
    bettedParameter,
    rewardMultiplier,
    winnerBet
  ) {

    if (winnerBet) {
      toastifyAlert(
        `La bola cae en ${rouletteNumber}\nLa apuesta de tipo ${betType} al ${bettedParameter} ganó ${
          bettedAmount * rewardMultiplier
        }$`,
        "winner"
      );
      playerMoney(true, bettedAmount * rewardMultiplier);
    } else {
      toastifyAlert(
        `La bola cae en ${rouletteNumber}\nLa apuesta de tipo ${betType} al ${bettedParameter} perdió ${bettedAmount}$`,
        "loser"
      );
    }
    removeAllSelectedSquareClasses();

    //Keyword OBJECTARRAY
    addBetToSpunNumberLog([betType,bettedAmount,bettedParameter], winnerBet)
  },

  sumSecondParameters: function (betList) {
    let sum = 0;
    for (const bet of betList) {
      sum += bet[1];
    }
    return sum;
  },

  getSliderNumber: function () {
    let amount = parseInt(
      document.getElementById("playerMoneySliderNumberDisplay").innerText
    );
    return amount;
  },

  validColor: function (color) {
    //color = prompt()
    color = color.toLowerCase();
    return this.validColorList.includes(color);
  },

  validNumber: function (number) {
    if (0 <= number <= 36) {
      return true;
    } else {
      return false;
    }
  },

  askForBettedAmount: function (predefinedAmount) {
    let amount;
    if (!predefinedAmount) {
      amount = prompt(
        "¿Cuánto dinero desea apostar? Dinero Disponible: " +
          playerMoney() +
          "\n\nRecuerde que una vez que apueste, se le retirará el dinero hasta saber si su apuesta ganó o perdió",
        100
      );
    } else {
      amount = predefinedAmount;
    }

    if (!amount) {
      amount = 0;
    }
    if (amount > playerMoney()) {
      alert("Error in askForBettedAmount");
    }
    amount = parseInt(amount);

    playerMoney(true, -amount);

    return amount;
  },

  spin: function () {
    return Math.floor(Math.random() * 37);
  },

  color: function (rouletteNumber) {
    if (rouletteNumber == 0) {
      return "green";
    } else if (this.redColorList.includes(rouletteNumber)) {
      return "red";
    } else if (this.blackColorList.includes(rouletteNumber)) {
      return "black";
    }

    alert("Error en roulette.color()");
    console.log("Error en roulette.color()");
    return "error";
  },

  row: function (rouletteNumber) {
    if (rouletteNumber == 0) {
      return 0;
    } else if (this.numberRows[0].includes(rouletteNumber)) {
      return 1;
    } else if (this.numberRows[1].includes(rouletteNumber)) {
      return 2;
    } else if (this.numberRows[2].includes(rouletteNumber)) {
      return 3;
    }

    alert("Error in roulette.row()");
    console.log("Error in roulette.row()");
    return "error";
  },

  whichHalf: function (rouletteNumber) {
    if (rouletteNumber === 0) {
      return 0;
    } else if (rouletteNumber >= 1 && rouletteNumber <= 18) {
      return 1;
    } else if (rouletteNumber >= 19 && rouletteNumber <= 36) {
      return 2;
    } else {
      return "error";
    }
  },

  convertColorToEnglish: function (color) {
    switch (color) {
      case "rojo":
      case "red":
        return "red";
      case "verde":
      case "green":
        return "green";
      case "negro":
      case "black":
        return "black";
      default:
        alert("Error en roulette.convertColorToEnglish()");
        console.log("Error en roulette.convertColorToEnglish()");
        break;
    }
  },

  oddEven: function (x) {
    if (x === 0) {
      return "zero";
    } else if (x % 2 === 0) {
      return "even";
    } else {
      return "odd";
    }
  },

  //||||||||||||||||||||||Specific bet types||||||||||||||||||||||
  singleNumberBet: function (rouletteNumber, bettedAmount, bettedNumber) {
    if (rouletteNumber == bettedNumber) {
      roulette.betRewards(
        rouletteNumber,
        "number",
        bettedAmount,
        bettedNumber,
        35,
        true
      );
    } else {
      roulette.betRewards(
        rouletteNumber,
        "number",
        bettedAmount,
        bettedNumber,
        35,
        false
      );
    }
  },

  colorBet: function (rouletteNumber, bettedAmount, bettedColor) {
    let landedColor = this.color(rouletteNumber);
    bettedColor = this.convertColorToEnglish(bettedColor);

    if (landedColor == bettedColor) {
      roulette.betRewards(
        rouletteNumber,
        "color",
        bettedAmount,
        bettedColor,
        2,
        true
      );
    } else {
      roulette.betRewards(
        rouletteNumber,
        "color",
        bettedAmount,
        bettedColor,
        2,
        false
      );
    }
  },

  dozenBet: function (rouletteNumber, bettedAmount, bettedDozen) {
    let isBettedDozenCorrect = false;
    if (bettedDozen == 1 && 1 <= rouletteNumber && rouletteNumber <= 12) {
      isBettedDozenCorrect = true;
    } else if (
      bettedDozen == 2 &&
      13 <= rouletteNumber &&
      rouletteNumber <= 24
    ) {
      isBettedDozenCorrect = true;
    } else if (
      bettedDozen == 3 &&
      25 <= rouletteNumber &&
      rouletteNumber <= 36
    ) {
      isBettedDozenCorrect = true;
    }

    if (isBettedDozenCorrect) {
      roulette.betRewards(
        rouletteNumber,
        "dozen",
        bettedAmount,
        bettedDozen,
        2,
        true
      );
    } else {
      roulette.betRewards(
        rouletteNumber,
        "dozen",
        bettedAmount,
        bettedDozen,
        2,
        false
      );
    }
  },

  oddEvenBet: function (rouletteNumber, bettedAmount, bettedOddEven) {
    let result = roulette.oddEven(rouletteNumber);
    if (result == bettedOddEven) {
      roulette.betRewards(
        rouletteNumber,
        "odd or even",
        bettedAmount,
        bettedOddEven,
        2,
        true
      );
    } else {
      roulette.betRewards(
        rouletteNumber,
        "odd or even",
        bettedAmount,
        bettedOddEven,
        2,
        false
      );
    }
  },

  rowBet: function (rouletteNumber, bettedAmount, bettedRow) {
    let resultRow = roulette.row(rouletteNumber);
    if (bettedRow == resultRow) {
      roulette.betRewards(
        rouletteNumber,
        "row",
        bettedAmount,
        bettedRow,
        2,
        true
      );
    } else {
      roulette.betRewards(
        rouletteNumber,
        "row",
        bettedAmount,
        bettedRow,
        2,
        false
      );
    }
  },

  halvesBet: function (rouletteNumber, bettedAmount, bettedHalf) {
    let resultHalf = this.whichHalf(rouletteNumber);
    if (resultHalf == bettedHalf) {
      roulette.betRewards(
        rouletteNumber,
        "half",
        bettedAmount,
        bettedHalf,
        2,
        true
      );
    } else {
      roulette.betRewards(
        rouletteNumber,
        "half",
        bettedAmount,
        bettedHalf,
        2,
        false
      );
    }
  },

  //||||||||||||||||||||||Making the bets, storing them on an array and running them||||||||||||||||||||||
  makeBet: function (predefinedBetType, predefinedAmount, predefinedParameter) {
    let betType;
    let amount;

    if (!predefinedBetType) {
      betType = prompt(
        "¿Qué tipo de apuesta desea hacer?\n\nTambién puede cancelar la apuesta",
        "color"
      );
    } else {
      betType = predefinedBetType;
    }

    if (predefinedAmount === 0) {
      toastifyAlert("¡Apuesta Rechazada!", "loser");
      return "Player Selected 0 dollars";
    }
    amount = this.askForBettedAmount(predefinedAmount);

    let usedPredefinedAmount = false;
    if (predefinedAmount) {
      usedPredefinedAmount = true;
    }

    switch (betType) {
      case "color":
        //********************************Start of Casetype Color ********************************
        let color;

        if (!predefinedParameter) {
          color = prompt(
            "¿Desea apostar al rojo, al negro o al verde? (Default: Rojo)",
            "rojo"
          );
        } else {
          color = predefinedParameter;
        }

        if (color === null) {
          color = "red";
        }

        if (
          validAmount(amount, usedPredefinedAmount) &&
          this.validColor(color)
        ) {
          betList.push([betType, amount, color]);
          /* alert('¡Apuesta aceptada!') */
          toastifyAlert("¡Apuesta Aceptada!", "notification");
          console.log(betList);
        } else {
          alert("¡Datos Inválidos!");
          playerMoney(true, amount);
          this.makeBet();
        }
        //********************************End of Casetype Color ********************************
        break;

      case "half":
      case "halves":
      case "mitad":
        //********************************Start of Casetype Half ********************************
        if (validAmount(amount, usedPredefinedAmount)) {
          //halvesBet: function (rouletteNumber, bettedAmount, bettedHalf)
          betList.push([betType, amount, predefinedParameter]);
          /* alert('¡Apuesta aceptada!') */
          toastifyAlert("¡Apuesta Aceptada!", "notification");
          console.log(betList);
        } else {
          alert("¡Datos Inválidos!");
          playerMoney(true, amount);
          this.makeBet();
        }
        //********************************End of Casetype Half ********************************
        break;

      case "number":
      case "numero":
      case "número":
        //********************************Start of Casetype Number ********************************
        let number;

        if (!predefinedParameter && predefinedParameter != 0) {
          number = prompt("¿A qué número desea apostar? Default: 0", 0);
          if (!number) {
            number = 0;
          }
          number = parseInt(number);
        } else {
          number = predefinedParameter;
        }

        if (
          validAmount(amount, usedPredefinedAmount) &&
          this.validNumber(number)
        ) {
          betList.push([betType, amount, number]);
          /* alert('¡Apuesta aceptada!') */
          toastifyAlert("¡Apuesta Aceptada!", "notification");
          console.log(betList);
          updateSlider();
        } else {
          alert("¡Datos Inválidos!");

          console.log(amount);
          console.log(number);

          playerMoney(true, amount);
          updateSlider();
          this.makeBet();
        }

        //********************************Start of Casetype Number ********************************
        break;

      case "dozen":
      case "dozens":
      case "docena":
      case "docenas":
        //********************************Start of Casetype Dozen ********************************
        let dozen;
        if (!predefinedParameter) {
          dozen = prompt(
            "¿A cuál docena desea apostar?\n\n1: Primera docena\n2: Segunda docena\n3: Tercer docena",
            1
          );
          dozen = parseInt(dozen);
        } else {
          dozen = predefinedParameter;
        }
        if (
          (dozen == 1 || dozen == 2 || dozen == 3) &&
          validAmount(amount, usedPredefinedAmount)
        ) {
          //dozenBet: function(rouletteNumber, bettedAmount, bettedDozen)
          betList.push([betType, amount, dozen]);
          /* alert('¡Apuesta aceptada!') */
          toastifyAlert("¡Apuesta Aceptada!", "notification");
          console.log(betList);
        } else {
          alert("¡Datos Inválidos!");
          playerMoney(true, amount);
          this.makeBet();
        }
        //********************************End of Casetype Dozen ********************************
        break;

      case "odd":
      case "impar":
        //********************************Start of Casetype odd ********************************
        if (validAmount(amount, usedPredefinedAmount)) {
          //evenOddBet: function(rouletteNumber, bettedAmount, bettedEvenOdd)
          betList.push([betType, amount, "odd"]);
          /* alert('¡Apuesta aceptada!') */
          toastifyAlert("¡Apuesta Aceptada!", "notification");
          console.log(betList);
        } else {
          alert("¡Datos Inválidos!");
          playerMoney(true, amount);
          this.makeBet();
        }
        //********************************End of Casetype odd ********************************
        break;

      case "even":
      case "par":
        //********************************Start of Casetype odd ********************************
        if (validAmount(amount, usedPredefinedAmount)) {
          //evenOddBet: function(rouletteNumber, bettedAmount, bettedEvenOdd)
          betList.push([betType, amount, "even"]);
          /* alert('¡Apuesta aceptada!') */
          toastifyAlert("¡Apuesta Aceptada!", "notification");
          console.log(betList);
        } else {
          alert("¡Datos Inválidos!");
          playerMoney(true, amount);
          this.makeBet();
        }
        //********************************End of Casetype odd ********************************
        break;

      case "row":
      case "fila":
      case "filas":
      case "rows":
        //********************************Start of Casetype row ********************************
        if (validAmount(amount, usedPredefinedAmount)) {
          //rowBet: function (rouletteNumber, bettedAmount, bettedRow)
          betList.push([betType, amount, predefinedParameter]);
          /* alert('¡Apuesta aceptada!') */
          toastifyAlert("¡Apuesta Aceptada!", "notification");
          console.log(betList);
        } else {
          alert("¡Datos Inválidos!");
          playerMoney(true, amount);
          this.makeBet();
        }
        //********************************End of Casetype row ********************************
        break;

      case "cancel":
      case "cancelar":
      case null:
        alert("Apuesta cancelada");
        playerMoney(true, amount);
        break;

      default:
        alert(
          "¡" +
            betType +
            " no es un tipo de apuesta aceptada!. Asegúrese de escribir bien."
        );
        this.makeBet();
        break;
    }
  },

  runBet: function () {
    let rouletteNumberResult = this.spin();
    toastifyAlert(
      `¡La bola cayó en ${rouletteNumberResult}!`,
      "notification",
      true
    );

    //Here I'll need to generate a new object in the array of objects with a new number result
    //Keyword OBJECTARRAY
    addSpunNumberLog(rouletteNumberResult);

    let localSavedGame = localStorage.getItem("savedGame");
    if (localSavedGame) {
    } else {
      //Creating new empty save game if there isn't any inside localstorage
      localSavedGame = emptySavedGame();
    }

    //betList formatting:
    //betList[Bet Index][The Type of Bet, Betted Amount, Parameter Of Bet]

    for (let i = 0; i < betList.length; i++) {
      switch (betList[i][0]) {
        case "color":
          //colorBet: function(rouletteNumber, bettedAmount, bettedColor)
          this.colorBet(rouletteNumberResult, betList[i][1], betList[i][2]);
          break;

        case "half":
        case "halves":
        case "mitad":
          //halvesBet: function (rouletteNumber, bettedAmount, bettedHalf)
          this.halvesBet(rouletteNumberResult, betList[i][1], betList[i][2]);
          break;

        case "number":
        case "numero":
        case "número":
          //singleNumberBet: function (rouletteNumber, bettedAmount, bettedNumber)
          this.singleNumberBet(
            rouletteNumberResult,
            betList[i][1],
            betList[i][2]
          );
          break;

        case "par":
        case "even":
        case "odd":
        case "impar":
          //oddEvenBet: function (rouletteNumber, bettedAmount, bettedOddEven)
          this.oddEvenBet(rouletteNumberResult, betList[i][1], betList[i][2]);
          break;

        case "row":
        case "fila":
        case "filas":
        case "rows":
          //rowBet: function (rouletteNumber, bettedAmount, bettedRow)
          this.rowBet(rouletteNumberResult, betList[i][1], betList[i][2]);
          break;

        case "dozen":
        case "dozens":
        case "docena":
        case "docenas":
          //dozenBet: function (rouletteNumber, bettedAmount, bettedDozen)
          this.dozenBet(rouletteNumberResult, betList[i][1], betList[i][2]);
          break;
      }
    }
    toastifyAlert(`Dinero restante: ${playerMoney()}`, "notification", true);
    betList = [];
    updateSlider();
  },
};
