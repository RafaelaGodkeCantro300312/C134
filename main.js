img="";
status="";
objects=[];
function preload() {
    img=loadImage('eletronicos.avif');
}

function setup() {
    canvas=createCanvas(640, 420);
    canvas.position(320, 135);
    video=createCapture(VIDEO);
    video.size(380,380);
    video.hide();
}

function start() {
    objectDetector=ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML="Status: detectando objetos";
}

function draw() {
    image(video, 0, 0, 640, 420);
    if (status!="") {
        r=random(255);
        g=random(255);
        b=random(255);
        objectDetector.detect(video, gotResult);
        for (i=0;i<objects.length;i++) {
            document.getElementById("status").innerHTML="Status: objetos detectados";
            document.getElementById("numberOfObjects").innerHTML="Quantidade de objetos detectados: "+objects.length;
            fill(r,g,b);
            percent=floor(objects[i].confidence*100);
            text(objects[i].label+" "+percent+"%", objects[i].x, objects[i].y);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}

function modelLoaded() {
    console.log("Model Loaded!");
    status=true;
    objectDetector.detect(video, gotResult);
}

function gotResult(error, results) {
    if (error) {
        console.log(error);
    }
    console.log(results);
    objects=results;
}