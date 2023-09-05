const textField = document.getElementById("textField");
let copyCache = undefined;

function openNav() {
    document.getElementById("mContent").style.marginTop = "200px"
    document.getElementById("topNav").style.height = "200px";
}

function closeNav() {
    document.getElementById("topNav").style.height = "0px;";
    document.getElementById("mContent").style.marginTop = "0px";
}
TODO:

    function copyText() {
        document.getElementById("innerOutput").value = textField.innerText;
    }
    // 


function solution(number) {
    const abc = [];
    let x = 0;
    for (i = number; i--; i > 0) {
        abc.push(i + 1);
        if (i % 3 == 0 || i % 5 == 0) {
            x = x + i;
        }
    }
    return x
}