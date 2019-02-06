const app = document.getElementById('root');


const container = document.createElement('div');
container.setAttribute('class', 'container2');

const message = document.createElement('h1');
message.textContent = "Salary Calculator";
app.appendChild(message);

app.appendChild(container);


const message2 = document.createElement('p');
message2.innerHTML = "<h4>Choose Amount: </h4><input type='radio' name='val' value='20' checked = 'checked'> 20%</input><br /> <input type='radio' name='val' value='30'>30%</input><br /><input type='radio' name='val' value='split'> 20/30 </input><br /><input type='radio' name='val' value='15split'> 15/30 </input>";
container.appendChild(message2);


var tableShowing = false;
const button = document.createElement('button');
button.textContent = "Calculate";
button.addEventListener("click", function () {
    if (tableShowing == false)
        calcSalaries();
    else {
        var element = document.getElementById("salaryTable");
        element.parentNode.removeChild(element);
        calcSalaries();
    }
    tableShowing = true;
})
container.appendChild(button);




function calcSalaries() {

    var x = [];
    var i;
    for (i = 0; i < 50; i++) {
        x[i] = i + 1;
    }
    var radios = document.getElementsByName("val")
    var valSelected;
    for (var i = 0, length = radios.length; i < length; i++) {
        if (radios[i].checked) {
            // do whatever you want with the checked radio
            valSelected = (radios[i].value);

            // only one radio can be logically checked, don't check the rest
            break;
        }
    }

    const box = document.createElement('table');
    box.setAttribute("id", "salaryTable");
    var tableFill = "<tr><td class ='bold'>Year One</td><td class ='bold'>Year Two</td><td class ='bold'>Year Three</td><td class ='bold'>Year Four</td><td class ='bold'>Year Five</td><td class ='bold'>Year Six</td><td class ='bold'>Year Seven</td><td class ='bold'>Year Eight</td><td class ='bold'>Year Nine</td><td class ='bold'>Year Ten</td></tr>";
    for (i = 0; i < 50; i++) {
        var j = x[i];


        var cells;
        if (valSelected == "20") {
            cells = twentyPercent(j);
        } else if (valSelected == "30") {

            cells = thirtyPercent(j);
        } else if (valSelected == "15split") {

            cells = fifteenAndThirty(j);
        } else {
            cells = twentyAndThirtyPercent(j);
        }
        tableFill = tableFill + "<tr>" + cells + "</tr>"
        // twentyAndThirtyPercent(j);
    }
    box.innerHTML = tableFill;
    app.appendChild(box);


}


function twentyPercent(x) {
    var curr = x;
    var result = "<td class='bold'>" + x + "</td>";
    var i;
    for (i = 0; i < 9; i++) {
        curr = eval(Math.ceil(.20 * curr) + curr);
        result = result + "<td>" + curr + "</td>";
    }
    return result;
}

function thirtyPercent(x) {
    var curr = x;
    var result = "<td class='bold'>" + x + "</td>";
    var i;
    for (i = 0; i < 9; i++) {
        curr = eval(Math.ceil(.30 * curr) + curr);
        result = result + "<td>" + curr + "</td>";
    }
    return result;
}

function twentyAndThirtyPercent(x) {
    var curr = x;
    var i;
    var result = "<td class='bold'>" + x + "</td>";

    for (i = 0; i < 4; i++) {
        curr = eval(Math.ceil(.20 * curr) + curr);
        result = result + "<td>" + curr + "</td>";
    }
    for (i = 4; i < 9; i++) {
        curr = eval(Math.ceil(.30 * curr) + curr);
        result = result + "<td>" + curr + "</td>";
    }
    return result;
}


function fifteenAndThirty(x) {
    var curr = x;
    var i;
    var result = "<td class='bold'>" + x + "</td>";

    for (i = 0; i < 4; i++) {
        curr = eval(Math.ceil(.15 * curr) + curr);
        result = result + "<td>" + curr + "</td>";
    }
    for (i = 4; i < 9; i++) {
        curr = eval(Math.ceil(.30 * curr) + curr);
        result = result + "<td>" + curr + "</td>";
    }
    return result;
}
