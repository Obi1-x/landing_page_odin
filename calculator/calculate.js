'use strict';

var displayRef, orders, operations;
var isOperated = false;
var term = 0;

function operating(operation){
 operations[term] = operation;
 //console.log(operations);
 term++;
 displayEntry(operation, "oper");
}

function displayEntry(entry, type){
  if(isOperated){
     clearDisplay();
     isOperated = false;
  }
  if((displayRef.value == '0') && (entry != '.')) displayRef.value = "";
  displayRef.value += entry;

  if(!orders[term] && type != "oper") orders[term] = entry;
  else if(orders[term] && type != "oper") orders[term] += entry;

  //console.log(orders);
}

function clearDisplay(){
  displayRef.value = 0;
  var count = 0;
  while(count <= term){
        orders.pop();
        operations.pop();
        count++;
  }
  term = 0;
}

function backspace(){
   if(displayRef.value){
      const editing = displayRef.value;
      displayRef.value = editing.substring(0, editing.length -1); //Erase display.
      var form = editing.charAt(editing.length - 1);
      if(isOperator(form)){
         operations.pop();
         term--;
      }
      else if(!isOperator(form)){
         var wholeTerm = orders[term];
         var cleared = wholeTerm.substring(0, wholeTerm.length -1);
         if(cleared == '') orders.pop();
         else orders[term] = wholeTerm.substring(0, wholeTerm.length -1);
      }
   }
}

function enterDecimal(){
  if(!(displayRef.value.includes('.'))) displayEntry('.', "num");
}

function computeAll(){
  if(orders[0] > 0){
    var answer=0;
    var i=0;
    while(i <= term){
        if(i == 0) answer += parseInt(orders[i]);
        else if(i > 0){
            var theOperator = operations[i - 1];
            switch(theOperator){
                case '+': answer += parseInt(orders[i]);
                  break;
                case '-': answer -= parseInt(orders[i]);
                  break;
                case '*': answer *= parseInt(orders[i]);
                  break;
                case '/': answer /= parseInt(orders[i]);
                  break;
            }
        }  
        i++;
    }
    clearDisplay();
    displayEntry(answer, "num");
    isOperated = true;
  }
}

function isOperator(opToCheck){
    var result = false;
    if((opToCheck.charCodeAt() == 42) || (opToCheck.charCodeAt() == 43) || (opToCheck.charCodeAt() == 45) || (opToCheck.charCodeAt() == 47)) result = true;
    return result;
}

//===========================================================================
document.addEventListener('DOMContentLoaded', function(p) {
    displayRef = document.querySelector('#dis-entry');
    orders = new Array();
    operations = new Array();
});


document.addEventListener('keydown', (keyInfo) => {
    const someCode = keyInfo.code;
    const actualCode = someCode.substring(0, someCode.length - 1);
    if(actualCode == "Digit" && !keyInfo.shiftKey){
       displayEntry(keyInfo.key, 'num');
    }else{
       switch(someCode){
            case "Enter": computeAll();
              break;
            case "Slash": operating('/');
              break;
            case "Minus": operating('-');
              break;
            case "Backspace": backspace();
              break;
            case "Period": enterDecimal();
              break;
            case "Escape": clearDisplay(); 
              break;
            case 'Equal': if(keyInfo.shiftKey) operating('+');
                          else if(!keyInfo.shiftKey) computeAll();
              break;
            case 'Digit8': operating('*');
              break;
       }
    }
});