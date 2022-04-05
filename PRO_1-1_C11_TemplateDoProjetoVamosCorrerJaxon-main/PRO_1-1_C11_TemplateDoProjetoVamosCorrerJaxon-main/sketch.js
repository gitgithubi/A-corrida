var path, boy, leftBoundary, rightBoundary, city, energyDrink, coin, bomb, efect;
var pathImg, boyImg, cityImg, energyImg, coinImg, bombImg, efectImg, boyWin;
var energy, coinGP, bombGP;
var pontuacao = "Pontos: ";
var pontos = 0;
var gameState;
var frames = 105;

function preload() {
 pathImg = loadImage("path.png");
 boyImg = loadAnimation("Runner-1.png","Runner-2.png");
 boyWin = loadAnimation("Runner-1.png");
 cityImg = loadImage("city.jpg");
 energyImg = loadImage("energyDrink.png");
 coinImg = loadImage("coin.png");
 bombImg = loadImage("bomb.png");
 efectImg = loadImage("power.png");
}

function setup() {
 createCanvas(400,400);

 city = createSprite(200,200);
 city.addImage(cityImg);
 city.scale = 0.8;
 city.depth = 0;

 path = createSprite(200,200);
 path.addImage(pathImg);
 path.velocityY = 7;

 boy = createSprite(200,360);
 boy.addAnimation("meninocorrendo",boyImg);
 boy.addAnimation("meninoganhou",boyWin);
 boy.scale = 0.05;

 leftBoundary = createSprite(0,0,100,800);
 leftBoundary.visible = false;

 rightBoundary = createSprite(400,0,100,800);
 rightBoundary.visible = false;

 energy = new Group();

 coinGP = new Group();

 bombGP = new Group();
}

function draw() {
 background(0);

 edges = createEdgeSprites();
 boy.collide(edges[3]);

 if (path.y >= 400) {
     path.y = path.width/2;
 }

 if (frames <= 60) {
     frames = 60;
 }

 if (pontos >= 3) {
     gameState = "win";
 } else if (pontos < 3) {
     gameState = "play";
 }

 if (path.velocityY >= 37) {
     path.velocityY = 37;
 }

 boy.velocityY = boy.velocityY +0.5;

 spawObjects();

 drawSprites();

 if (coinGP.isTouching(boy)) {
    coinGP.destroyEach();
    pontos = pontos +1;
    stroke(rgb(150,100,200));
    textFont("Arial");
    text(pontuacao + pontos,200,200);
 }

 if (gameState === "win") {
    path.velocityY = 0;
    fill("red");
    textFont("Arial");
    textSize(13);
    textAlign("center");
    text("Você venceu!!", 204,200);
    } else if (gameState === "play") {
    if (keyDown(LEFT_ARROW) && boy.x === 200) {
        boy.x = 110;   
    } else if (boy.x === 110 && keyDown(RIGHT_ARROW)) {
        boy.x = 200;
    } else if (keyDown(RIGHT_ARROW) && boy.x === 200) {
        boy.x = 300;
    } else if (keyDown(LEFT_ARROW) && boy.x === 300) {
        boy.x = 200;
    }
 }

 if (energy.isTouching(boy)) {
    energy.destroyEach();
    boy.velocityY = -10;
    path.velocityY = path.velocityY +10;
    frames = frames -15;
    } else if (bombGP.isTouching(boy)) {
    boy.remove();
    bombGP.destroyEach();
    path.velocityY = 0;
    pontos = 0;
    efeito();
    fill("red");
    textFont("Arial");
    textSize(13);
    textAlign("center");
    text("Você perdeu!!", 204,200);
 }
}

function spawObjects() {
    var opcoes = Math.round(random(1,3));

    if (frameCount % frames === 0 && path.velocityY >0) {
        switch(opcoes) {
            case 1: energyDrink = createSprite(Math.round(random(110,300)),20);
            energyDrink.addImage(energyImg);
            energyDrink.scale = 0.07;
            energyDrink.velocityY = 8;
            energyDrink.lifetime = 50;
            energyDrink.depth = boy.depth +1;
            energy.add(energyDrink);
            break;

            case 2: coin = createSprite(Math.round(random(110,300)),20);
            coin.addImage(coinImg);
            coin.scale = 0.20;
            coin.velocityY = 8;
            coin.lifetime = 50;
            coin.depth = boy.depth +1;
            coinGP.add(coin);
            break;

            case 3: bomb = createSprite(Math.round(random(110,300)),30);
            bomb.addImage(bombImg);
            bomb.scale = 0.05;
            bomb.velocityY = 8;
            bomb.lifetime = 50;
            bomb.depth = boy.depth +1;
            bombGP.add(bomb);
            break;
        }
    }
}

function efeito() {
    efect = createSprite(bomb.x,bomb.y)
    efect.addImage(efectImg);
    efect.scale = bomb.scale*2;
    efect.depth = boy.depth +1;
    efect.lifetime = 1;
}