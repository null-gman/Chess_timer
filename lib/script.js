"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var global = {
  time: 10 * 60,
  speed: 1000
};
// 10080 max match time

global.popupDomRnder = function () {
  var team = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;
  var rootDom = document.getElementById("root");
  var mainDom = document.createElement("aside");
  mainDom.setAttribute("id", "popup");
  var popupDom = document.createElement("section");
  popupDom.classList.add("main");
  var h3 = document.createElement("h3");
  h3.classList.add("title");
  var form = document.createElement("div");
  form.classList.add("form");
  var label = document.createElement("label");
  var aside = document.createElement("aside");
  aside.classList.add("btnPopup");
  if (!team) {
    h3.textContent = "Chess timer";
    popupDom.appendChild(h3);
    label.textContent = "Match Time";
    form.appendChild(label);
    var inputNumber = document.createElement("input");
    inputNumber.setAttribute("type", "number");
    inputNumber.setAttribute("placeholder", "by minets");
    inputNumber.setAttribute("value", "10");
    var _fun = function _fun() {
      var root = document.getElementById("popup");
      global.time = Math.abs(Number(inputNumber.value)) * 60 || 600;
      global.ReMatch();
      rootDom.removeChild(root);
    };
    form.appendChild(inputNumber);
    popupDom.appendChild(form);
    var btnStart = document.createElement("button");
    btnStart.textContent = "START";
    btnStart.addEventListener("click", _fun);
    aside.appendChild(btnStart);
    popupDom.appendChild(aside);
  } else {
    popupDom.classList.add("ends");
    h3.classList.add("title");
    h3.textContent = "".concat(team === "white" ? "black" : "white", " wins");
    popupDom.appendChild(h3);
    label.textContent = "rematch";
    form.appendChild(label);
    popupDom.appendChild(form);
    var fun = function fun(check) {
      var root = document.getElementById("popup");
      rootDom.removeChild(root);
      if (check) {
        global.popupDomRnder();
      }
    };
    var yesBtn = document.createElement("button");
    yesBtn.textContent = "yes";
    yesBtn.addEventListener("click", function () {
      return fun(true);
    });
    aside.appendChild(yesBtn);
    var noBtn = document.createElement("button");
    noBtn.textContent = "no";
    noBtn.addEventListener("click", function () {
      return fun(false);
    });
    aside.appendChild(noBtn);
    popupDom.appendChild(aside);
  }
  mainDom.appendChild(popupDom);
  rootDom.appendChild(mainDom);
  return "Done";
};
var Player = /*#__PURE__*/_createClass(function Player(team) {
  var _this = this;
  _classCallCheck(this, Player);
  _defineProperty(this, "restart", function () {
    _this.time = global.time;
    _this.stop();
    _this.hidden();
    _this.setLableTime();
  });
  _defineProperty(this, "visible", function () {
    _this.btn.removeAttribute("disabled");
    _this.btn.classList.remove("wating");
  });
  _defineProperty(this, "hidden", function () {
    _this.btn.setAttribute("disabled", "true");
    _this.btn.classList.add("wating");
  });
  _defineProperty(this, "myTurn", function () {
    _this.visible();
    _this.run();
  });
  _defineProperty(this, "setLableTime", function () {
    var min = Math.floor(_this.time / 60),
      sec = _this.time % 60;
    if (_this.time < 30) {
      _this.lable.classList.add("losaing");
    } else {
      _this.lable.classList.remove("losaing");
    }
    if (_this.time < 0) {
      _this.lable.textContent = "0 : 0";
      return;
    }
    _this.lable.textContent = "".concat(min, " : ").concat(sec);
  });
  _defineProperty(this, "stop", function () {
    clearInterval(_this.timing);
  });
  _defineProperty(this, "run", function () {
    _this.timing = setInterval(function () {
      _this.time--;
      _this.setLableTime();
      if (_this.time <= 0) {
        _this.setLableTime();
        _this.hidden();
        _this.stop();
        global.popupDomRnder(_this.team);
      }
    }, global.speed);
  });
  this.time = global.time;
  this.team = team;
  this.timing; // this contain setInterval fun to clear

  this.btn = document.getElementById("btn-".concat(this.team));
  this.lable = document.getElementById("timeLable-".concat(this.team));
  this.setLableTime();
  this.btn.addEventListener("click", function () {
    _this.hidden();
    _this.stop();
    global.finishedMyTurn(_this.team);
  });
});
function main() {
  var white = new Player("white");
  var black = new Player("black");
  black.hidden();
  global.finishedMyTurn = function (team) {
    if (team == "white") {
      black.myTurn();
    } else {
      white.myTurn();
    }
  };
  global.ReMatch = function () {
    white.restart();
    black.restart();
    white.visible();
  };
}
document.body.onload = function () {
  global.popupDomRnder();
  document.body.style.display = "block";
  main();
};