const object: HTMLElement = document.getElementById('ball');
const object2: HTMLElement = document.getElementById('lewo');
let valueX: number = Math.floor(Math.random()*-260)-10;
let valueY: number = Math.floor(Math.random()*-260)-10;
let counter: number = 0;
object.style.bottom = `${valueY}px`;
object.style.right = `${valueX}px`;
document.onkeydown = function(e) {
    switch (e.keyCode) {
        case 65:
            if(valueX>-10){
                break;
            }
            valueX = valueX+10;
            object.style.right = `${valueX}px`;
            break;
        case 87:
            if(valueY>-10){
                break;
            }
            valueY = valueY+10;
            object.style.bottom = `${valueY}px`;
            break;
        case 68:
            if(valueX<-270){
                break;
            }
            valueX = valueX-10;
            object.style.right = `${valueX}px`;
            break;
        case 83:
            if(valueY<-270){
                break;
            }
            valueY = valueY-10;
            object.style.bottom = `${valueY}px`;
            break;  
        }
    }

function leftButton(){
    if(valueX>-10){
        stop
    }
    valueX = valueX+10;
    object.style.right = `${valueX}px`;
}
function rightButton(){
    if(valueX<-270){
        stop
    }
    valueX = valueX-10;
    object.style.right = `${valueX}px`;
}
function upButton(){
    if(valueY>-10){
        stop
    }
    valueY = valueY+10;
    object.style.bottom = `${valueY}px`;
}
function bottomButton(){
    if(valueY<-270){
        stop
    }
    valueY = valueY-10;
    object.style.bottom = `${valueY}px`;
}
document.getElementById('lewo').addEventListener('click',leftButton);
document.getElementById('prawo').addEventListener('click',rightButton);
document.getElementById('gora').addEventListener('click',upButton);
document.getElementById('dol').addEventListener('click',bottomButton)

function changePosition(){
    let valueX: number = Math.floor(Math.random()*-260)-10;
    let valueY: number = Math.floor(Math.random()*-260)-10;
    object.style.bottom = `${valueY}px`;
    object.style.right = `${valueX}px`;
    counter = counter+1;
    document.getElementById('counter').innerHTML = `${counter}`;
}   
object.addEventListener('click', changePosition)
document.querySelector('button').addEventListener('click',()=>{
    document.getElementById('counter').innerHTML = '0';
    counter = 0;
})

