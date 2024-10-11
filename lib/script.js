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
  popupTime: {},
  popupEnd: {}
};
global.popupCreateDom = function (what, team) {
  var input = "\n        <section class=\"main\">\n          <h3 class=\"title\">Chess timer</h3>\n          <div class=\"form\">\n            <label for=\"timeNum\">Match time</label>\n            <input type=\"number\" value=\"10\" placeholder=\"by minets\" id=\"input-timeNum\" > \n          </div>\n          <aside class=\"btnPopup\">\n            <button id=\"btnForPopupNumber\">START</button>\n          </aside>\n      </section>";
  var ends = "\n      <section class=\"main ends\">\n        <h3 class=\"title\">".concat(team, " wins</h3>\n        <div class=\"form\">\n          <label for=\"timeNum\">rematch?</label>\n        </div>\n        <aside class=\"btnPopup\">\n          <button  id=\"reYes\"> yes</button>\n          <button  id=\"reNo\"> no</button>\n        </aside>\n    </section>");
  var res = document.createElement("aside");
  res.id = "popup";
  res.innerHTML = what !== "ends" ? ends : input;
  return res;
};
// 10080 max match time
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
        root.appendChild(global.popupCreateDom("start", "".concat(_this.team === "white" ? "black" : "white")));
        global.endEven();
      }
    }, 1000);
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
function popups() {
  var root = document.getElementById("root");
  global.timeEven = function () {
    global.popupTime.input = document.getElementById("input-timeNum");
    global.popupTime.btn = document.getElementById("btnForPopupNumber");
    global.popupTime.fun = function () {
      global.time = Math.abs(Number(global.popupTime.input.value)) * 60 || 600;
      global.again();
      global.popup = document.getElementById("popup");
      root.removeChild(global.popup);
    };
    global.popupTime.btn.addEventListener("click", global.popupTime.fun);
  };
  global.endEven = function () {
    global.popupEnd.yes = document.getElementById("reYes");
    global.popupEnd.no = document.getElementById("reNo");
    global.popupEnd.fun = function (check) {
      global.popup = document.getElementById("popup");
      root.removeChild(global.popup);
      if (check) {
        root.appendChild(global.popupCreateDom("ends"));
        global.timeEven();
      }
    };
    global.popupEnd.yes.addEventListener("click", function () {
      return global.popupEnd.fun(true);
    });
    global.popupEnd.no.addEventListener("click", function () {
      return global.popupEnd.fun(false);
    });
  };
  global.timeEven();
}
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
  global.again = function () {
    white.restart();
    black.restart();
    white.visible();
  };
}
document.body.onload = function () {
  document.body.style.display = "block";
  main();
  popups();
};