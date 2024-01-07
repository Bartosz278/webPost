const ball: HTMLElement = document.getElementById('ball');
let mainWidth: number = document.getElementById("main").offsetWidth-25;
let mainHeight: number = document.getElementById("main").offsetHeight-25;
let counter: number = 0;

changePosition();

function changePosition(){
    let valueX: number = Math.floor(Math.random()*-mainWidth)-10;
    let valueY: number = Math.floor(Math.random()*-mainHeight)-10;
    ball.style.bottom = `${valueY}px`;
    ball.style.right = `${valueX}px`;
    counter = counter+1;
    document.getElementById('counter').innerHTML = `${counter}`;
}   

ball.addEventListener('click', changePosition)
document.querySelector('button').addEventListener('click',()=>{
    document.getElementById('counter').innerHTML = '0';
    counter = 0;
})

function generateBall(){

}


