"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var global = {
  time: 10 * 60
};
var Player = /*#__PURE__*/_createClass(function Player(team, checkTeurn) {
  var _this = this;
  _classCallCheck(this, Player);
  _defineProperty(this, "disable", function () {
    _this.btn.setAttribute("disabled", "true");
    _this.btn.classList.add("wating");
  });
  _defineProperty(this, "allowed", function () {
    _this.btn.removeAttribute("disabled");
    _this.btn.classList.remove("wating");
    _this.run();
  });
  _defineProperty(this, "setLableTime", function () {
    var min = Math.floor(_this.time / 60),
      sec = _this.time % 60;
    if (_this.time < 30) {
      _this.lable.classList.add("losaing");
    }
    _this.lable.textContent = "".concat(min, " : ").concat(sec);
  });
  _defineProperty(this, "stop", function () {
    _this.timing && clearInterval(_this.timing);
    // this.time = this.time + 10;
    // this.setLableTime();
  });
  _defineProperty(this, "run", function () {
    _this.timing = setInterval(function () {
      _this.time--;
      _this.setLableTime();
      if (_this.time == 0) {
        _this.disable();
        _this.stop();
        alert("".concat(_this.team === "white" ? "black" : "white", " wins"));
        if (confirm("play againe")) {
          location.reload();
        }
      }
    }, 1000);
  });
  this.time = global.time;
  this.checkTeurn = checkTeurn;
  this.team = team;
  this.btn = document.getElementById("btn-".concat(team));
  this.lable = document.getElementById("timeLable-".concat(team));
  this.setLableTime();
  this.timing;
  this.btn.addEventListener("click", function () {
    _this.disable();
    _this.stop();
    disable(_this.team);
  });
});
function disable(team) {
  if (team == "white") {
    black.allowed();
  } else {
    white.allowed();
  }
}
function main() {
  global.time = prompt("time by minutes", "10") * 60;
  var white = new Player("white", false);
  var black = new Player("black", true);
  black.disable();
}
document.body.onload = function () {
  document.body.style.display = "block";
  setTimeout(main, 0);
};