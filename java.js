var errs = 0;
var number1 = 0;
var number2 = 0;
var amount = 0;
var wgongs = [];

function getData() {
  amount = document.getElementById("amount").value;
  if (amount === null || amount === "" || amount < 10) {
	amount = 10;
  }
  
  var operator = document.getElementById("plus").checked;
  if (operator === true) {
    operator = "plus";
    } else {
    operator = "minus";
  }
  
  var numbers = document.getElementById("numbers1").selected;
  if (numbers === true) {
    numbers = "numbers1";
  } else {
      numbers = document.getElementById("numbers2").selected;
      if (numbers === true) {
      numbers = "numbers2";
      } else {
          numbers = document.getElementById("numbers3").selected;
          if (numbers === true) {
          numbers = "numbers3";
          } else {
              numbers = document.getElementById("numbers4").selected;
              if (numbers === true) {
              numbers = "numbers4";
              } else {
                  numbers = document.getElementById("numbers5").selected;
                  if (numbers === true) {
                  numbers = "numbers5";
                  }
                }
            }
        }
    }
  setProcess(amount, operator, numbers);
}

function setProcess(amount, operator, numbers) {
  errs = 0;
  wgongs = [];
  
  if (operator === "plus") {
    processPlus(amount, operator, numbers);
  } else {
    processMinus(amount, operator, numbers);
  }
}

document.getElementById("btn").onclick = getData;

function randomNumber(m,n) {
  m = parseInt(m);
  n = parseInt(n);
  return Math.floor( Math.random() * (n - m + 1) ) + m;
}

function printResult (errs,amount) {
  var correct = ((amount - errs) * 100) / amount;
  var mark = null;
  
  if (correct >= 95) {
  	mark = 5;
  } else if (correct >= 80 && correct <= 94) {
      mark = 4;
  } else if (correct >= 50 && correct <= 79) {
      mark = 3;
  } else if (correct >= 15 && correct <= 49) {
      mark = 2;
  } else {
      mark = 1;
  }
  alert("Оценка: " + mark + "\n" + "(неправильно: " + errs + " из " + amount + ")");
  
  wgongs = wgongs.join("<br>")
  var text = document.getElementById("text");
  text.innerHTML = wgongs;
}

function checkAnswer (operator,rightAnswer,yourAnswer,number1,number2) {
  yourAnswer = parseInt(yourAnswer);
  var feedback = "";
  var plusOrMinus = "";
  
  if (operator === "plus") {
    plusOrMinus = " + ";
  } else {
      plusOrMinus = " - ";
  }
  
  var correct = number1 + plusOrMinus + number2 + " = " + rightAnswer;
  
  if (rightAnswer === yourAnswer) {
  	feedback = "Верно! " + correct;
  }
  else {
  	feedback = yourAnswer + " - неверно! " + correct;
    errs++;
  }
  wgongs.push(feedback);
  return feedback;
}

function processPlus (amount, operator, numbers) {
  for (var counter = 0; counter < amount; counter++) {

    setNumbers (operator, numbers);
    
    var rightAnswer = number1 + number2;
    var yourAnswer = prompt((counter + 1) + ") " + number1 + " + " + number2 + " =");

    alert(checkAnswer (operator,rightAnswer,yourAnswer,number1,number2));
  }

  printResult (errs,amount);
}

function processMinus (amount, operator, numbers) {
  for (var counter = 0; counter < amount; counter++) {
    
    setNumbers (operator, numbers);
    
    var rightAnswer = number1 - number2;
    var yourAnswer = prompt((counter + 1) + ") " + number1 + " - " + number2 + " =");

    alert(checkAnswer (operator,rightAnswer,yourAnswer,number1,number2));
  }

  printResult (errs,amount);
}

function setNumbers (operator, numbers) {  
  if (numbers === "numbers1") {
    if (operator === "plus") {
      number1 = randomNumber(1,9);
      number2 = randomNumber(1,9);
    } else {
        number1 = randomNumber(5,9);
        number2 = randomNumber(1,5);
    }
  }
  
  if (numbers === "numbers2") {
    number1 = randomNumber(10,99);
    number2 = randomNumber(1,9);
  }
  
  if (numbers === "numbers3") {
    if (operator === "plus") {
      number1 = randomNumber(10,99);
      number2 = randomNumber(10,99);
    } else {
        number1 = randomNumber(50,99);
        number2 = randomNumber(10,50);
    }
  }
  
  if (numbers === "numbers4") {
    number1 = randomNumber(100,999);
    number2 = randomNumber(10,99);
  }
  
  if (numbers === "numbers5") {
    if (operator === "plus") {
      number1 = randomNumber(100,999);
      number2 = randomNumber(100,999);
    } else {
        number1 = randomNumber(500,999);
        number2 = randomNumber(100,500);
    }
  }
  
  return number1, number2;
}