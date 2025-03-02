var firstnumber = '';
var operator = null;
var secondnumberr = '';
var result = 0;
const historyarray = [];
var i = 0;
let displayfield = document.querySelector(".displayfield");
const appendnumber = (number) => {
    if (operator == null) {
        firstnumber += number;
        displayfield.value = firstnumber;
    }

    else {
        secondnumberr += number;
        displayfield.value = firstnumber + operator + secondnumberr;
    }
};

const appendoperator = (op) => {
    if (firstnumber !== "" && operator == null) {
        operator = op;
        displayfield.value = firstnumber + operator;
    }
    else if (operator != null && secondnumberr == "") {
        alert("Enter second number");
    }

    else {
        calculate();

    }

};


const calculate = () => {
    if (firstnumber === '' || secondnumberr === '') {
        alert("Enter number");
    }

    let num1 = Number(firstnumber);
    let num2 = Number(secondnumberr);

    if (operator == "+") {
        result = num1 + num2;
    } else if (operator == "-") {
        result = num1 - num2;
    } else if (operator == "*") {
        result = num1 * num2;
    } else if (operator == "/") {
        result = num1 / num2;
    } else if (operator == "%") {
        result = num1 % num2;
    }
    displayfield.value = result;
    var history = (firstnumber + ' ' + operator + ' ' + secondnumberr + ' = ' + result).toString();
    historyarray[i] = history;
    i++;

    firstnumber = result.toString();

    operator = null;
    secondnumberr = '';
    result = null;
};
const clearDisplay = () => {
    firstnumber = '';
    operator = null;
    secondnumberr = '';
    displayfield.value = '';
    clearhistory();
};
const backspace = () => {
    if (operator == null) {
        firstnumber = firstnumber.slice(0, -1);
        displayfield.value = firstnumber;
    }
    else if (secondnumberr == '') {
        operator = null;
        displayfield.value = firstnumber;
    }
    else {
        secondnumberr = secondnumberr.slice(0, -1);
        displayfield.value = firstnumber + operator + secondnumberr;
    }
}
const appendsign = () => {
    if (operator == null) {
        firstnumber = firstnumber.charAt(0) === '-' ? firstnumber.slice(1) : '-' + firstnumber;
        displayfield.value = firstnumber;
    } else {
        secondnumberr = secondnumberr.charAt(0) === '-' ? secondnumberr.slice(1) : '-' + secondnumberr;
        displayfield.value = firstnumber + operator + secondnumberr;
    }
}
const history = () => {
    let icon = document.querySelector(".icon");
    let existingHistory = document.querySelector(".history-display");

    if (existingHistory) {
        // If history is already displayed, remove it to toggle off
        existingHistory.remove();
        return;
    }

    // Create and style div for history
    let elementinsert = document.createElement("div");
    elementinsert.classList.add("history-display");
    elementinsert.style.overflow = "auto";
    elementinsert.style.border = "1px solid #ccc";
    elementinsert.style.padding = "10px";
    elementinsert.style.backgroundColor = "#f9f9f9";
    elementinsert.setAttribute("readonly", true);

    // Append history items to textarea
    historyarray.forEach((value, index) => {
        let historyItem = document.createElement("div");
        historyItem.innerText = (index + 1) + ". " + value;
        elementinsert.appendChild(historyItem);

    });
    let button = document.createElement("button");
    button.innerText = "Clear History";
    button.style.display = "flex";
    button.style.width = "38%";
    button.style.marginLeft = "180px";
    button.style.border = "none";

    button.onclick = clearhistory;
    elementinsert.appendChild(button);

    // Add the textarea to the icon container
    icon.append(elementinsert);
};

const clearhistory = () => {
    historyarray.length = 0; // Clear the array
    i = 0; // Reset the index
    alert("History cleared!");
};
