let handPose;
let video;
let hands = [];

let road;
let cars;

function preload() {
  handPose = ml5.handPose({ flipped: true, runtime: "mediapipe" });
}

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO, { flipped: true });
  video.size(640, 480);
  video.hide();

  // Inicia la detección de manos
  handPose.detectStart(video, gotHands);

  road = new Road(200, 300, 100, height, 400);

  cars = new Cars(road.rails);
  cars.createCars(width / 2, height - 120, 7); // Crear un coche jugador y 5 enemigos

}

function gotHands(results) {
  hands = results;
}

function draw() {
  background(0, 100, 0);
  fill(0, 0, 100)
  noStroke();
  rect(0, 0, width, 100);
  image(video, 0, 0, width / 4, height / 4);

  if (hands.length >= 2) {
    // Obtener las coordenadas de los puntos deseados
    let x1 = hands[0].keypoints[4].x;
    let y1 = hands[0].keypoints[4].y;
    let x2 = hands[1].keypoints[4].x;
    let y2 = hands[1].keypoints[4].y;

    // Calcular la inclinación (ángulo) entre los dos puntos
    let dx = x2 - x1;
    let dy = y2 - y1;
    let angle = atan2(dy, dx);

    // Llamar a la función movePlayer con el ángulo
    cars.movePlayer(angle);
  }

  road.dibujar();

  // Dibuja los puntos clave de las manos detectadas
  for (let i = 0; i < hands.length; i++) {
    let hand = hands[i];
    for (let j = 0; j < hand.keypoints.length; j++) {
      let keypoint = hand.keypoints[j];
      push();
      fill(0, 255, 0);
      noStroke();
      circle(keypoint.x, keypoint.y, 10);
      pop();
    }
  }

  cars.movePlayer();
  cars.display();
  cars.move();
}

function keyPressed() {
}
