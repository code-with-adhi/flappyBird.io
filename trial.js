let bgheight = 624;
let bgwidth = 336;
let context;

const flappy_bird = {
    width: 24,
    height: 34,
    x: bgwidth / 8,
    y: bgheight / 2,
};

let flappy;
let pic = new Image();
pic.src = "./assets/bluebird.png"; // ✅ Add correct extension

window.onload = function () {
    flappy = document.getElementById("Flappy");
    flappy.height = bgheight;
    flappy.width = bgwidth;
    context = flappy.getContext("2d");

    pic.onload = function () {
        // ✅ Correct usage of drawImage(image, dx, dy, dWidth, dHeight)
        context.drawImage(pic, flappy_bird.x, flappy_bird.y, flappy_bird.width, flappy_bird.height);
    };
};
