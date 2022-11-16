var Main = /** @class */ (function () {
    function Main() {
        var _this = this;
        document.getElementById("hasTimeLimit").addEventListener("change", function () { _this.HasTimeLimit_Changed(); });
        document.getElementById("btn").addEventListener("click", function () { _this.Start(); });
        this.resultEl = document.getElementById("text");
        this.markEl = document.getElementById("mark");
    }
    Main.prototype.HasTimeLimit_Changed = function () {
        document.getElementsByClassName("time-limit-wrapper")[0].classList.toggle("expanded");
    };
    Main.prototype.Start = function () {
        this.errorsCount = 0;
        this.resultEl.innerHTML = "";
        this.markEl.innerHTML = "";
        this.counter = 0;
        this.amount = parseInt(document.getElementById("amount").value);
        this.operation = (document.getElementById("plus").checked) ? "+" : "-";
        var numberDigit = document.getElementById("numberDigit").value.split(".");
        this.maxLeftNumber = parseInt(numberDigit[0]);
        this.maxRightNumber = parseInt(numberDigit[1]);
        this.timeLimitMSec = 0;
        if (document.getElementById("hasTimeLimit").checked) {
            this.timeLimitMSec = parseInt(document.getElementById("restriction").value) * 1000;
        }
        this.NextStep();
    };
    Main.prototype.NextStep = function () {
        var _this = this;
        this.counter++;
        if (this.counter > this.amount) {
            this.End();
            return;
        }
//        var minLeft = 1;
//        var maxLeft = this.maxLeftNumber;
//        var minRight = 1;
//        var maxRight = this.maxRightNumber;
//        if (this.operation == "-") {
//            var minLeft = Math.floor(maxLeft / 2);
//            var maxRight = minLeft;
//        }
        this.leftNumber = 0;
        this.rightNumber = 0;
      
        if (this.maxRightNumber === 9 && this.maxLeftNumber === 9) {
          if (this.operation == "+") {
            this.leftNumber = this.randomNumber(1,9);
            this.rightNumber = this.randomNumber(1,9);
          } else {
              this.leftNumber = this.randomNumber(5,9);
              this.rightNumber = this.randomNumber(1,5);
          }
        }
  
        if (this.maxRightNumber === 9 && this.maxLeftNumber === 99) {
          this.leftNumber = this.randomNumber(10,99);
          this.rightNumber = this.randomNumber(1,9);
        }
  
        if (this.maxRightNumber === 99 && this.maxLeftNumber === 99) {
          if (this.operation == "+") {
            this.leftNumber = this.randomNumber(10,99);
            this.rightNumber = this.randomNumber(10,99);
          } else {
              this.leftNumber = this.randomNumber(50,99);
              this.rightNumber = this.randomNumber(10,50);
          }
        }
  
        if (this.maxRightNumber === 99 && this.maxLeftNumber === 999) {
          this.leftNumber = this.randomNumber(100,999);
          this.rightNumber = this.randomNumber(10,99);
        }
  
        if (this.maxRightNumber === 999 && this.maxLeftNumber === 999) {
          if (this.operation == "+") {
            this.leftNumber = this.randomNumber(100,999);
            this.rightNumber = this.randomNumber(100,999);
          } else {
              this.leftNumber = this.randomNumber(500,999);
              this.rightNumber = this.randomNumber(100,500);
          }
        }

        this.answer = this.operation === "+" ? this.leftNumber + this.rightNumber : this.leftNumber - this.rightNumber;
        this.InsertQuestion();
        if (this.timeLimitMSec > 0) {
            this.time = 0;
            this.timer = setInterval(function () { _this.Interval(); }, 100);
        }
    };
    Main.prototype.InsertQuestion = function () {
        var _this = this;
        var html = "<div>" + (this.counter) + ") &nbsp;&nbsp;&nbsp;&nbsp;" + this.leftNumber + " " + this.operation + " " + this.rightNumber + " = <input type='number' id='userAnswer'>&nbsp;&nbsp;&nbsp;&nbsp;<span id='timer'></span></div>";
        this.resultEl.innerHTML = this.resultEl.innerHTML + html;
        this.timerEl = document.getElementById("timer");
        this.userAnswerInput = document.getElementById("userAnswer");
        this.userAnswerInput.addEventListener("keyup", function (e) { _this.UserAnswer_Enter(e); });
        this.userAnswerInput.focus();
    };
    Main.prototype.InsertAnswer = function () {
        var _this = this;
        var userAnswer = parseInt(this.userAnswerInput.value) || -1;
        var html = (this.counter) + ") &nbsp;&nbsp;&nbsp;&nbsp;" + this.leftNumber + " " + this.operation + " " + this.rightNumber + " = ";
        if (userAnswer === this.answer) {
            html += this.answer + "<span class='correct_answer'> &#10004;</span>";
        }
        else {
            this.errorsCount++;
            html += "<span class='uncorrect_answer'>" + userAnswer + "</span>" + "<span class='corrected_answer'> = " + this.answer + "</span>";
        }
        html = "<div>" + html + "</div>";
        this.userAnswerInput.removeEventListener("keyup", function (e) { _this.UserAnswer_Enter(e); });
        this.userAnswerInput.parentElement.remove();
        this.resultEl.innerHTML = this.resultEl.innerHTML + html;
    };
    Main.prototype.Interval = function () {
        if (this.time < this.timeLimitMSec) {
            this.timerEl.innerText = ((this.timeLimitMSec - this.time) / 1000).toString();
            this.time += 100;
        }
        else {
            clearInterval(this.timer);
            this.InsertAnswer();
            this.NextStep();
        }
    };
    Main.prototype.End = function () {
        clearInterval(this.timer);
        var correct = ((this.amount - this.errorsCount) * 100) / this.amount;
        var mark = null;
        if (correct >= 95) {
            mark = 5;
        }
        else if (correct >= 80 && correct <= 94) {
            mark = 4;
        }
        else if (correct >= 50 && correct <= 79) {
            mark = 3;
        }
        else if (correct >= 15 && correct <= 49) {
            mark = 2;
        }
        else {
            mark = 1;
        }
        this.markEl.innerHTML = "<span class='score'>" + mark + "</span>" + "<br>" + "( " + (this.amount - this.errorsCount) + " из " + this.amount + " )";
    };
    Main.prototype.ShowResult = function () {
    };
    Main.prototype.UserAnswer_Enter = function (ev) {
        if (ev.keyCode == 13) {
            clearInterval(this.timer);
            this.InsertAnswer();
            this.NextStep();
        }
    };
    Main.prototype.randomNumber = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    return Main;
}());
window.addEventListener("load", function () {
    var main = new Main();
});
//# sourceMappingURL=main.js.map