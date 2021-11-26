status = "";
seng="";
objects = [];
function preload()
{
    seng=loadSound("bad_to_the_bone.mp3");
}
function setup() {
    canvas = createCanvas(380,380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380,380);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Decting Objects"
}
function modelLoaded() {
    console.log("MODEL LOADED WAJIDIJOWAJID");
    status = true;
}
function gotResult(error, results) {
    if (error) {
        console.log(error);//eringeringer
    }
    console.log(results);
    objects = results;//eringeringeringeringeringeringeringeringeringereringeringeringeringeringeringeringeringeringeringeringeringeringeringeringeringeringeringeringeringeringeringeringeringeringeringer
}
function draw() {
    image(video,0,0,380,380);
    if (status != "") {
        r = random(255);
        g = random(255);
        b = random(255);
        objectDetector.detect(video,gotResult);
        for (i=0; i<objects.length; i++) 
        {
            document.getElementById("status").innerHTML = "Status: Object Dected";
            document.getElementById("numobj").innerHTML = "Number of Objects detected are:" + objects.length;
            fill(r,g,b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);//eringeringeringeringer
            if(objects[i].label=="person")
            {
                document.getElementById("status").innerHTML="Baby Has Been Dected";
                seng.stop();
            }
            else
             {
                 document.getElementById("status").innerHTML="Baby has not been Dected";
                 seng.play();
             }
        }
        
        
    }
    if(objects.length=0)
   {
        document.getElementById("status").innerHTML="Baby has not been Dected";
    seng.play();
}
}