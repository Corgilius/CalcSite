let result = 0; let workingSwitch = 0;
document.addEventListener('keypress', (event) => {
    const keyName = event.key;
    if (keyName === "Enter"){
        buttonPress("=");
    }
    else{
        buttonPress(keyName);
    }
  });
function buttonPress(value) {
    if (workingSwitch == 0){
        if (value == "OFF"){
            workingSwitch = 1;
            alert("Калькулятор включен.")
        }
    }
    else{
        switch(value){
            case "OFF":
                workingSwitch = 0;
                alert("Калькулятор выключен.");
                document.getElementById("calculation").innerHTML = "";
                document.getElementById("saved-number").innerHTML = "";
                document.getElementById("operation").innerHTML = "";
                break;
            case "MRC":
                document.getElementById("calculation").innerHTML = "";
                document.getElementById("saved-number").innerHTML = "";
                document.getElementById("operation").innerHTML = "";
                break;
            case "+":
                operationFunction("+");
                break;
            case "-":
                operationFunction("-");
                break;
            case "*":
                if ( document.getElementById("calculation").innerHTML.length != "" || document.getElementById("saved-number").innerHTML.length != "") {
                    operationFunction("*");
                }
                break;
            case "sqrt":
                sqrtFunction(document.getElementById("calculation").innerHTML);
                break;
            case "=":
                equalFunction();
                break;
            case "/":
                if ( document.getElementById("calculation").innerHTML.length != "" || document.getElementById("saved-number").innerHTML.length != "") {
                    operationFunction("/");
                }
                break;
            case "%":
                if (document.getElementById("saved-number").innerHTML != ""){
                    percentageFunction(document.getElementById("calculation").innerHTML,document.getElementById("saved-number").innerHTML);
                }
                break;
            case "+/-":
                if (document.getElementById("calculation").innerHTML != ""){
                    negativeFunction();
                }
                break;
            case ".":
                if (document.getElementById("calculation").innerHTML != "" && !document.getElementById("calculation").innerHTML.includes(".") ){
                    document.getElementById("calculation").innerHTML += "."
                }
                break;
            case "1":
            case "2":
            case "3":
            case "4":
            case "5":
            case "6":
            case "7":
            case "8":
            case "9":
            case "0":
                if (document.getElementById("calculation").innerHTML.length <= 8){
                    document.getElementById("calculation").innerHTML += value; 
                }
                else (alert("Число слишком большое!"));
                break;
        }
    }    
}
function simpleOperation(_value,_value2,operation){
            switch (operation){
                case "+":
                    result = Number(_value) + Number(_value2);
                    break;
                case "-":
                    result = Number(_value) - Number(_value2);
                    break;
                case "*":
                    result = Number(_value) * Number(_value2);
                    break;
                case "/":
                    if (_value === "0"){
                        alert ("Деление на 0!");
                        result = "";
                    }
                    else{
                        result = Number(_value) / Number(_value2);
                    }
                    break;
        }
        const outOfRangeNumber = result.toString().length - 6;
        if (outOfRangeNumber > 0){
            document.getElementById("calculation").innerHTML = result.toString().slice(0,6) + "e+" + outOfRangeNumber;
        }
        else{
            document.getElementById("calculation").innerHTML = result.toString().slice(0,6);
        }
        document.getElementById("saved-number").innerHTML = "";
        document.getElementById("operation").innerHTML = "";
}
function sqrtFunction(_value){
    result = Math.sqrt(Number(_value));
    document.getElementById("calculation").innerHTML = result.toString().slice(0,6);
}

function operationFunction(operation){
    if (document.getElementById("operation").innerHTML == "")
    { 
        document.getElementById("operation").innerHTML = operation;
        if (document.getElementById("calculation").innerHTML === ""){
            document.getElementById("saved-number").innerHTML = "0"; 
        }
        else { 
            document.getElementById("saved-number").innerHTML = document.getElementById("calculation").innerHTML
            document.getElementById("calculation").innerHTML = "";
        }
    }
    else if (document.getElementById("operation").innerHTML != "" && document.getElementById("calculation").innerHTML === ""){
        document.getElementById("operation").innerHTML = operation;
    }
    else {
        simpleOperation(document.getElementById("saved-number").innerHTML,document.getElementById("calculation").innerHTML,document.getElementById("operation").innerHTML);
    }
}
function equalFunction(){
    if (document.getElementById("operation").innerHTML != "" && document.getElementById("calculation").innerHTML != "" && document.getElementById("saved-number").innerHTML != ""){
        operationFunction(document.getElementById("operation").innerHTML);
    }
    
}
function percentageFunction(_value,_value2){
    document.getElementById("calculation").innerHTML = ((Number(_value)/100)*Number(_value2));
}
function negativeFunction(){
    if (Number(document.getElementById("calculation").innerHTML) < 0){
        document.getElementById("calculation").innerHTML = document.getElementById("calculation").innerHTML.slice(1,document.getElementById("calculation").innerHTML.length);
    }
    else{
        document.getElementById("calculation").innerHTML = "-" + document.getElementById("calculation").innerHTML;
    }
}