let handPose;
let video;
let hands = [];
let isDetecting = true; 
let connections = [];

function preload() {
  // Load the handPose model
  handPose = ml5.handPose(modelReady); 
}

function modelReady() {
  console.log('HandPose model loaded!');
}

function setup() {
  createCanvas(640, 480);
  
//used to access webcam
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();
  
  //used to detect hands
  handPose.detect(video, gotHands);

  //hand keypoint connections
  connections = handPose.getConnections();
}

function draw() {
  image(video, 0, 0, width, height);


  for (let i = 0; i < hands.length; i++) {
    let hand = hands[i];
    

    for (let j = 0; j < hand.keypoints.length; j++) {
      let keypoint = hand.keypoints[j];
      fill(0, 255, 0);
      noStroke();
      circle(keypoint.x, keypoint.y, 10);
    }


    for (let k = 0; k < connections.length; k++) {
      let [startIdx, endIdx] = connections[k];
      let start = hand.keypoints[startIdx];
      let end = hand.keypoints[endIdx];
      stroke(255, 0, 0);
      line(start.x, start.y, end.x, end.y);
    }
  }
}


function gotHands(results) {
  hands = results; 
}


function mousePressed() {
  toggleDetection();
}

function toggleDetection() {
  if (isDetecting) {
    handPose.detectStop(); // Stop handPose 
    isDetecting = false;
  } else {
    handPose.detect(video, gotHands); // Start handPose 
    isDetecting = true;
  }
}
