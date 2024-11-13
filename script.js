const global = {
  time: 10 * 60,
  speed: 1000
}
// 10080 max match time

global.popupDomRnder = (team = undefined) => {
  const rootDom = document.getElementById("root");

  const mainDom = document.createElement("aside");
  mainDom.setAttribute("id", "popup");

  const popupDom = document.createElement("section");
  popupDom.classList.add("main");

  const h3 = document.createElement("h3");
  h3.classList.add("title");

  const form = document.createElement("div");
  form.classList.add("form");

  const label = document.createElement("label");

  const aside = document.createElement("aside");
  aside.classList.add("btnPopup");

  if (!team) {
    h3.textContent = "Chess timer";
    popupDom.appendChild(h3);
    label.textContent = "Match Time";
    form.appendChild(label);
    const inputNumber = document.createElement("input");
    inputNumber.setAttribute("type", "number");
    inputNumber.setAttribute("placeholder", "by minets");
    inputNumber.setAttribute("id", "inputNumberForTime");

    inputNumber.value = "10"; //default value

    const startGame = () => {
      const root = document.getElementById("popup")
      global.time = getTimeFromInput(inputNumber)
      global.ReMatch();
      rootDom.removeChild(root);
    }

    inputNumber.addEventListener("keydown", (ev) => {
      if (ev.keyCode == 13) {
        startGame()
      }
    });

    form.appendChild(inputNumber);
    popupDom.appendChild(form);
    const btnStart = document.createElement("button");
    btnStart.textContent = "START";
    btnStart.addEventListener("click", startGame);
    aside.appendChild(btnStart);
    popupDom.appendChild(aside);

  }
  else {
    popupDom.classList.add("ends")
    h3.classList.add("title");
    h3.textContent = `${team === "white" ? "black" : "white"} wins`;
    popupDom.appendChild(h3);
    label.textContent = "rematch"
    form.appendChild(label);
    popupDom.appendChild(form);
    endGamePopup = (check) => {
      const root = document.getElementById("popup")
      rootDom.removeChild(root)
      if (check) {
        global.popupDomRnder()
      }
    }
    const yesBtn = document.createElement("button");
    yesBtn.textContent = "yes";
    yesBtn.addEventListener("click", () => endGamePopup(true));
    aside.appendChild(yesBtn);
    const noBtn = document.createElement("button");
    noBtn.textContent = "no";
    noBtn.addEventListener("click", () => endGamePopup(false));
    aside.appendChild(noBtn);
    popupDom.appendChild(aside);
  }

  mainDom.appendChild(popupDom)
  rootDom.appendChild(mainDom)
  !team ? document.getElementById("inputNumberForTime").focus() : null;
  return "Done";
}


function getTimeFromInput(inputEleObj, target) {
  let value = +inputEleObj.value;

  if (value > 999) {
    value = 999;
  } else {
    value = Math.abs(Number(value));
  }
  value = value * 60 || 600
  return value
}

class Player {
  constructor(team) {
    this.time = global.time;
    this.team = team;
    this.timing; // this contain setInterval fun to clear

    this.playerMain = document.getElementById(`player-${this.team}`)
    // console.log(this.playerMain);
    
    // this.btn = document.getElementById(`btn-${this.team}`)
    this.btn = document.getElementById(`btn-${this.team}`)
    this.lable = document.getElementById(`timeLable-${this.team}`)
    this.btn = this.playerMain;
    this.setLableTime();

    this.btn.addEventListener("click", () => {
      this.hidden();
      this.stop();
      global.finishedMyTurn(this.team);

    })
  }

  restart = () => {
    this.time = global.time;
    this.stop()
    this.hidden()
    this.setLableTime()
  }

  visible = () => {
    this.btn.removeAttribute("disabled");
    this.playerMain.classList.remove("wating");
  }

  hidden = () => {
    this.btn.setAttribute("disabled", "true");
    this.playerMain.classList.add("wating")
  }

  myTurn = () => {
    this.visible()
    this.run()
  }

  setLableTime = () => {
    const min = Math.floor(this.time / 60),
      sec = this.time % 60;
    if (this.time < 30) {
      this.playerMain.classList.add("losaing");
    } else {
      this.playerMain.classList.remove("losaing");
    }
    if (this.time < 0) {
      this.lable.textContent = `0 : 0`;
      return;
    }
    this.lable.textContent = `${min} : ${sec}`;
  }

  stop = () => {
    clearInterval(this.timing);
  }

  run = () => {
    this.timing = setInterval(() => {
      this.time--;
      this.setLableTime();
      if (this.time <= 0) {
        this.setLableTime();
        this.hidden();
        this.stop();
        global.popupDomRnder(this.team);
      }
    }, global.speed)
  }

}

function main() {
  const white = new Player("white");
  const black = new Player("black");
  black.hidden()

  global.finishedMyTurn = function (team) {
    if (team == "white") {
      black.myTurn()
    } else {
      white.myTurn()
    }
  }


  global.ReMatch = function () {
    white.restart()
    black.restart()
    white.visible()
  }

}

document.body.onload = function () {
  document.body.style.display = "block";
  global.popupDomRnder();
  main();

}