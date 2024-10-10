const global = {
  time : 10 * 60 ,
  disable : undefined
}



class  Player {
  constructor(team,checkTeurn) {
    this.time = global.time;
    this.checkTeurn = checkTeurn;
    this.team = team;
    this.btn = document.getElementById(`btn-${team}`)
    this.lable = document.getElementById(`timeLable-${team}`)
    this.setLableTime()
    this.timing ;
    this.btn.addEventListener("click",()=>{
      this.disable();
      this.stop();
      global.disable(this.team)

    })
  }

  disable = ()=>{
    this.btn.setAttribute("disabled","true");
    this.btn.classList.add("wating")
  }
  allowed = ()=>{
    this.btn.removeAttribute("disabled");
    this.btn.classList.remove("wating");
    this.run()
 
  }

  setLableTime = ()=>{
    const min = Math.floor(this.time/60),
          sec = this.time%60;
    if (this.time < 30) {
         this.lable.classList.add("losaing");
    }
    if (this.time < 0) {
      this.lable.textContent=`0 : 0`;
      return;
    }
    this.lable.textContent=`${min} : ${sec}`;

  }

  stop = ()=>{
    this.timing && clearInterval(this.timing);

  }
  run = ()=>{
    this.timing = setInterval(()=>{
      this.time--;
      this.setLableTime()
      if (this.time <= 0) {
        this.setLableTime()
        this.disable()
        this.stop()
        alert(`${this.team === "white" ? "black" : "white" } wins`)
        if(confirm("play againe")){
          location.reload()
        }
      }
    } , 1000)
  }

}



global.time = prompt("time by minutes" , "10") * 60;



function main(){
  const white = new Player("white",false);
  const black = new Player("black",true);

  black.disable()
  global.disable = function (team){
    if (team == "white") {
      black.allowed()
    } else {
      white.allowed()
    }
  }
}


document.body.onload = function(){
  document.body.style.display="block";
  setTimeout( main, 0);
}