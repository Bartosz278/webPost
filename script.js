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
    // document.getElementById("sendButton").dadEventListener("click", copyText);l