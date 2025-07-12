let bgheight = 624;
let bgwidth = 336;
let context;
let flappy;


//backgrounds
let backgrounds = [new Image(), new Image()];
backgrounds[0].src = "./assets/background-day.png";
backgrounds[1].src= "./assets/background-night.png";

let crIndx = 0;
let bgimg = backgrounds[crIndx];

//physics
let velocityx = -2;//pipe speed
let velocityY = 0;// bird jump speed
let gravity = 0.4;

//mechanics
let gameover = false;
let score = 0;

const flappy_bird= {
    width : 34,
    height : 24,
    x: bgwidth/8,
    y:bgheight/2,
}

let pipeArray = [];
let pipeHeight = 512;
let pipeWidth = 64;
let pipex = bgwidth;
let pipey = 0;


let pic = new Image();
let up_pipe = new Image();
let down_pipe = new Image();


window.onload = function(){
    flappy = document.getElementById('Flappy');
    flappy.height = bgheight;
    flappy.width = bgwidth;
    context = flappy.getContext("2d");
//bird
    pic.onload = function(){
    context.drawImage(pic,flappy_bird.x,flappy_bird.y, flappy_bird.width, flappy_bird.height);
    }
    pic.src="./assets/bluebird.png";

//pipes
    up_pipe.src = "./assets/up_pipe.png";
    down_pipe.src = "./assets/down_pipe.png";

    context.drawImage(up_pipe, 3*(bgwidth/4), 10, 320, 52);
    
    requestAnimationFrame(update);
    setInterval(placePipes, 1500);
    document.addEventListener("keydown", birdJump);
    document.addEventListener("click", birdJump);
    document.addEventListener("touchstart", birdJump);
}

function update(){
    requestAnimationFrame(update);
    if(gameover){
        return;
    }
    context.clearRect(0,0,bgwidth, bgheight);

// bg
    context.drawImage(bgimg, 0,0, bgwidth,bgheight);

//bird
    velocityY += gravity;
    //flappy_bird.y += velocityY; contantly goes up
    flappy_bird.y = Math.max(0, velocityY+flappy_bird.y);
    context.drawImage(pic, flappy_bird.x, flappy_bird.y, flappy_bird.width, flappy_bird.height)

    if (flappy_bird.y>bgheight){
        gameover = true;
    }

//pipe
    for(let i=0; i < pipeArray.length; i++){
        let pipe = pipeArray[i];
        pipe.x += velocityx;
        context.drawImage(pipe.img, pipe.x, pipe.y, pipe.width, pipe.height);

        if(!pipe.passed && flappy_bird.x > pipe.x + pipeWidth){
            score += 0.5;
            pipe.passed = true;

            changebg();
        }

        if(collide(flappy_bird, pipe)){
            gameover = true;
        }
    }

    while(pipeArray.length >0 && pipeArray[0].x < 0-pipeWidth){
        pipeArray.shift();// removes the out of frame pipes
    }

    context.fillStyle = "white";
    context.font = " 45px sans-serif";
    context.fillText(score, 5, 45);

    if(gameover){
        let go = new Image;
        go.src = "./assets/gameover.png";
        context.drawImage(go,(bgwidth -192)/2 , (bgheight-42)/2 , 192, 42 );
        bgimg = backgrounds[0];
        crIndx = 0;
    }
}

function changebg() {
    // Change background every time score reaches a multiple of 10
    if (Math.floor(score) % 10 === 0) {
        let newIndex = (Math.floor(score / 10)) % backgrounds.length;
        if (newIndex !== crIndx) {
            crIndx = newIndex;
            bgimg = backgrounds[crIndx];
        }
    }
}


function placePipes(){
    if(gameover){
        return;
    }

    let randomPipeY = pipey - (pipeHeight/4) - Math.random()*(pipeHeight/2);
    let openingSpace = bgheight/4;

    let top = {
        img: up_pipe,
        x: pipex,
        y:randomPipeY,
        width: pipeWidth,
        height: pipeHeight,
        passed: false,
    }

    pipeArray.push(top);

    let down = {
        img: down_pipe,
        x: pipex,
        y:randomPipeY + pipeHeight + openingSpace,
        width: pipeWidth,
        height: pipeHeight,
        passed: false,

    }

    pipeArray.push(down);
}

function birdJump(event){
    if(event.code == "Space" || event.code == "ArrowUp"){
        velocityY =-6;
    }

    else if(event.type == "click" || event.type == "touchstart"){
        velocityY =-6;
    }

    // reset
    if(gameover){
        flappy_bird.y = bgheight/2;
        pipeArray = [];
        score = 0;
        gameover = false;
    }
}

function collide(a,b){
    return a.x < b.x+b.width &&
           a.x + a.width > b.x &&
           a.y < b.y + b.height &&
           a.y + a.height > b.y; 
}