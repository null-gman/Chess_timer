const global = {
  time: 10 * 60,
  popupTime: {},
  popupEnd: {}
}
global.popupCreateDom = (what,team) => {
  const input = `
        <section class="main">
          <h3 class="title">Chess timer</h3>
          <div class="form">
            <label for="timeNum">Match time</label>
            <input type="number" value="10" placeholder="by minets" id="input-timeNum" > 
          </div>
          <aside class="btnPopup">
            <button id="btnForPopupNumber">START</button>
          </aside>
      </section>`

  const ends = `
      <section class="main ends">
        <h3 class="title">${team} wins</h3>
        <div class="form">
          <label for="timeNum">rematch?</label>
        </div>
        <aside class="btnPopup">
          <button  id="reYes"> yes</button>
          <button  id="reNo"> no</button>
        </aside>
    </section>`
  let res = document.createElement("aside")
  res.id="popup";
  res.innerHTML= what !== "ends" ? ends : input;
  return res;
}
// 10080 max match time

class Player {
  constructor(team) {
    this.time = global.time;
    this.team = team;
    this.timing; // this contain setInterval fun to clear

    this.btn = document.getElementById(`btn-${this.team}`)
    this.lable = document.getElementById(`timeLable-${this.team}`)
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
    this.btn.classList.remove("wating");
  }

  hidden = () => {
    this.btn.setAttribute("disabled", "true");
    this.btn.classList.add("wating")
  }

  myTurn = () => {
    this.visible()
    this.run()
  }

  setLableTime = () => {
    const min = Math.floor(this.time / 60),
      sec = this.time % 60;
    if (this.time < 30) {
      this.lable.classList.add("losaing");
    }else{
      this.lable.classList.remove("losaing");
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
      this.setLableTime()
      if (this.time <= 0) {
        this.setLableTime()
        this.hidden()
        this.stop()
        root.appendChild(global.popupCreateDom("start",`${this.team === "white" ? "black" : "white" }`))
        global.endEven()
      }
    }, 1000)
  }

}



function popups() {
  const root = document.getElementById("root")

  global.timeEven = function (){
    global.popupTime.input = document.getElementById("input-timeNum")
    global.popupTime.btn = document.getElementById("btnForPopupNumber")
    global.popupTime.fun = () => {
      
      global.time = Math.abs(Number(global.popupTime.input.value)) * 60 || 600 ;

      global.again();
      global.popup = document.getElementById("popup");
      root.removeChild(global.popup);

    }
    global.popupTime.btn.addEventListener("click", global.popupTime.fun)
  }

  global.endEven = function() {
    global.popupEnd.yes = document.getElementById("reYes");
    global.popupEnd.no = document.getElementById("reNo");

    global.popupEnd.fun = (check) => {
      global.popup = document.getElementById("popup");
      root.removeChild(global.popup)
      if (check) {
        root.appendChild(global.popupCreateDom("ends"))
        global.timeEven()
      }
    }
    global.popupEnd.yes.addEventListener("click", () => global.popupEnd.fun(true))
    global.popupEnd.no.addEventListener("click", () => global.popupEnd.fun(false))

  }
  global.timeEven();

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

  global.again = function () {
    white.restart()
    black.restart()
    white.visible()
  }



}


document.body.onload = function () {
  document.body.style.display = "block";
  main();
  popups();

}