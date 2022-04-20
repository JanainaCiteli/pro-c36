const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;

var PLAY = 1;
var END = 0;
var WIN = 2;
var gameState = PLAY;

var mario, mario_running, mario_jumping, mario_stop;

var plantsGroup, plant_eating;

var coinsGroup, coins_img;

var star_png, one_star, two_satar, tree_star;
var zero_star;

var cloud_img, cloudsGroup;

var groud, invisible_ground, ground_img;

var surpriseGroup, surprise_img;

var coin1, coin2, coin3;

var touches = [0, 1, 2];

function preload() {

    mario_running = loadAnimation("assets/mariogif-1.png", "assets/mariogif-2.png", "assets/mariogif-3.png");
    mario_jumping = loadImage("./assets/mariojump.png");
    mario_stop = loadImage("./assets/mariogif-1.png.png");

    plant_eating = loadAnimation("./assets/Plantagif-1.png.png", "./assets/Plantagif-2.png.png");
    surprise_img = loadImage("./assets/Surprise.png");
    coins = loadImage("./assets/Coins.png");

    one_star = loadImage("./assets/1star(2).png");
    two_star = loadImage("./assets/2star(2).png");
    tree_star = loadImage("./assets/3star(2).png");
    zero_star = loadImage("./assets/0star(2).png");

    cloud_img = loadImage("./assets/Cloud.png");

    ground_img = loadImage("./assets/Ground.png");

};

function setup() {

    createCanvas(windowWidth, windowHeight);

    engine = Engine.create();
    world = engine.world;

    var message = "OIIII";
    console.log(message)

    mario = createSprite(50, windowHeight - 170, 20, 50);
    mario.addAnimation("running", mario_running);
    mario.addImage("jumping", mario_jumping);
    mario.addImage("stop", mario_stop);
    mario.addImage("stop");
    mario.setCollider("rectangle", 0, 0, mario.width, mario.height);

    ground = createSprite(windowWidth / 2, windowHeight - 20, 400, 20);
    ground.addImage("ground", ground_img);
    ground.x = ground.width / 2;

    var star_display = createSprite(50, 20, 30, 30);
    star_display.scale = 0.2;
    star_display.addImage('zero', zero_star);
    star_display.addImage('one', one_star);
    star_display.addImage('two', two_star);
    star_display.addImage('tree', tree_star);
    star_display.addImage('empty');

    invisibleGround = createSprite(50, windowHeight - 10, 400, 10);
    invisibleGround.visible = false;
    console.log(invisibleGround.y);

    plantsGroup = createGroup();
    cloudsGroup = createGroup();
    surpriseGroup = createGroup();
    coinsGroup = createGroup();

};

function draw() {
    background("lightBlue");
    if (gameState === PLAY) {

        ground.velocityX = -3;
        mario.addAnimation("running");

        if (ground.x < 0) {
            ground.x = ground.width / 2;
        };

        if (keyDown("space") && mario.y >= windowHeight - 39 || touches.length > 0 || touches.length > 0) {
            mario.velocityY = -12;
            mario.addImage("jumping");
        };

        mario.velocityY = mario.velocityY + 0.8;

        if (plantsGroup.isTouching(mario)) {
            gameState = END;
        };

        if (surpriseGroup.isTouching(mario) && touches[0]) {
            coinsGroup();
            star_display.addImage('one');
            touches[1];
        };

        if (surpriseGroup.isTouching(mario) && touches[1]) {
            coinsGroup();
            star_display.addImage('two');
            touches[2];
        };

        if (surpriseGroup.isTouching(mario) && touches[1]) {
            coinsGroup();
            star_display.addImage('tree');
            gameState = WIN;
        };

    } 
    else if (gameState === WIN){
        win();
    }
    else if (gameState === END){
        gameOver();
    };

};

function spawPlants() {
    if (frameCount % 60 === 0) {
        var obstacle = createSprite(windowWidth, windowHeight - 35, 10, 40);
        obstacle.velocityX = -3;
        obstacle.addAnimation("death", plant_eating);
        obstacle.scale = 0.5;
        obstacle.lifetime = 300;
        plantsGroup.add(obstacle);
    }
};

function spawClouds() {
    if (frameCount % 60 === 0) {
        var cloud = createSprite(windowWidth, 120, 40, 10);
        cloud.y = Math.round(random(90, 110));
        cloud.addImage(cloudImage);
        cloud.scale = 0.5;
        cloud.velocityX = -2;
        cloud.lifetime = windowWidth;
        cloud.depth = mario.depth;
        mario.depth = mario.depth + 1;
        cloudsGroup.add(cloud);
    }
};

function spawSurprise() {
    var gift = createSprite(windowWidth, windowHeight - 35, 20, 20);
    gift.y = Math.round(random(90, 150));
    gift.addImage(surprise_img);
    gift.scale = 0.5;
    gift.velocityX = -3;
    gift.lifetime = 300;
    surpriseGroup.add(gift);
};

function spawCoins() {
    var options = {
        restitution: 0.5,
        frictionAir: 0,
        friction: 0.02
    }
    coin1 = Bodies.circle(300, 300, 20, options);
    coin1.addImage("coin", coins_img);
    coin1.scale = 0.5;
    coin2 = Bodies.circle(300, 300, 20, options);
    coin2.addImage("coin", coins_img);
    coin2.scale = 0.5;
    coin3 = Bodies.circle(300, 300, 20, options);
    coin3.addImage("coin", coins_img);
    coin3.scale = 0.5;
};

function win() {
    swal(
        {
            title: `YOU WIN!!`,
            text: "Obrigado por jogar!!",
            imageUrl:
                "https://o.remove.bg/downloads/98a5c951-a2d2-4e57-ad6f-bfd3e6fe764e/image-removebg-preview.png",
            imageSize: "150x150",
            confirmButtonText: "Jogar Novamente"
        },
        function (isConfirm) {
            if (isConfirm) {
                location.reload();
            }
        }
    );
}

function gameOver() {
  swal(
    {
     title: `GAME OVER!!`,
      text: "Obrigado por jogar!!",
      imageUrl:
        "https://o.remove.bg/downloads/8751b30c-085b-46d5-b3a5-179c768e10cb/image-removebg-preview.png",
      imageSize: "150x150",
      confirmButtonText: "Jogar Novamente"
    },
    function(isConfirm) {
      if (isConfirm) {
        location.reload();
      }
    }
  );
}