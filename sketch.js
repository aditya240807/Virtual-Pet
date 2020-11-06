//Create variables here
var dog,happyDog,database,foodS,foodStock
var dogIMG,happyDogImg
function preload()
{
  dogIMG=loadImage("dogImg.png")
 happyDogImg=loadImage("dogImg1.png")
}

function setup() {
	createCanvas(500, 500);
  dog = createSprite(370,200,30,30)
  dog.addImage(dogIMG)
  dog.scale = 0.2

 
  database = firebase.database()
  foodStock=database.ref('Food')
  foodStock.on("value",readStock)
}


function draw() {  
  background(46, 139, 87)
  drawSprites();
  textSize(20)
  fill("red")
  stroke("black")
  text("remaining milk :"+foodS,240,20)
  textSize(15)
  fill("white")
  stroke("red")
  text("Note : Press up arrow to feed the milk",200,70)
  if(keyWentDown(UP_ARROW)){
     writeStock(foodS);
     dog.addImage(happyDogImg)
  }
  //add styles here

}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){
  if(x<=0){
    x=0;
  }else{
    x=x-1
  }
  database.ref('/').update({
    Food:x
  })
}



