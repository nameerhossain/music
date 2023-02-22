song_1="";
song_2="";
song_1_status="";
song_2_status="";
rightWristX=0;
rightWristY=0;
leftWristX=0;
leftWristY=0;

scoreLeftWrist=0;
scoreRightWrist=0;
function setup(){
    canvas= createCanvas(500,600);
    canvas.center();

    video= createCapture(VIDEO);
    video.hide();

    posenet=ml5.poseNet(video,modelLoaded);
posenet.on("pose",gotPoses);
}
function modelLoaded(){
    console.log("posenet is initialized");
}

function gotPoses(results){
    if(results.length>0){
        console.log(results);
        scoreRightWrist=results[0].pose.keypoints[10].score;
        scoreLeftWrist=results[0].pose.keypoints[9].score;
        console.log("scoreLeftWrist="+scoreLeftWrist+"scoreRightWrist="+scoreRightWrist);
        
        leftWristX=results[0].pose.leftWrist.x;
        leftWristY=results[0].pose.leftWrist.y;
        console.log("left wrist X is: "+leftWristX+"left wrist Y is: "+leftWristY);
        rightWristX=results[0].pose.rightWrist.x;
        rightWristY=results[0].pose.rightWrist.y;
        console.log("right wrist X is: "+rightWristX+"right wrist Y is: "+rightWristY);
    }
}



function preload(){
    song_1=loadSound("music.mp3");
    song_2=loadSound("song2.mp3");
}

function draw(){
    image(video,0,0,600,500);
    song_1_status=song_1.isPlaying()
    song_2_status=song_2.isPlaying()
    fill("#FF0000");
    stroke("#FF0000");
    if(scoreRightWrist>0.2){
circle(rightWristX,rightWristY,20);
    song_2.stop()
    if(song_1_status==false){
        song_1.play()
        document.getElementById("song").innerHTML="playing Song 1 "
    }
    }
    if(scoreLeftWrist>0.2){
    circle(leftWristX,leftWristY,20);
    song_1.stop()
    if(song_2_status==false){
        song_2.play()
        document.getElementById("song").innerHTML="playing Song 2 "
    }
}
}
function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}
