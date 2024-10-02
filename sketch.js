let fly; // Instancia de mosca
let isAlive = true; // Variable para saber si la mosca ha muerto  
let message = "Mata a la mosca"; // Texto de la mosca 

function setup() {
  createCanvas(windowWidth, windowHeight);
  fly = new Fly(); // crea un nuevo atributo de la clase Fly
  // Configura el botón de reinicio
  let restartButton = document.getElementById("restartButton");
  restartButton.addEventListener("click", resetGame);
  cursor(ARROW);
}

function draw() {
  background(246, 216, 185);
  fill(30, 62, 98);
  textFont('Arial', 40); // Establece la fuente y el tamaño del texto
  textStyle(BOLD); // Establece el estilo del texto en negrita
  textAlign(CENTER, CENTER); 
  text(message, width / 2, 60); 

  if (isAlive) { // si la mosca no ha muerto
    fly.update(); // actualiza la posición de la mosca
    fly.display(); // muestra la mosca
    if (fly.isHit(mouseX, mouseY)) {
      cursor('pointer'); // Cambia el cursor a puntero si el mouse está sobre la mosca
    } else {
      cursor(ARROW); // Cambia el cursor de nuevo a la flecha si no lo está
    }
  } else { // si la mosca ha muerto
    text("R.I.P MOSQUITA MUERTA", width / 2, height / 2); // muestra el texto
    document.getElementById("restartButton").style.display = "block"; // Muestra el botón de reinicio
  }
}

function mousePressed() { // cuando se presiona el mouse
  if (isAlive && fly.isHit(mouseX, mouseY)) { // si la mosca no ha muerto y el mouse se encuentra en la mosca
    isAlive = false; // la mosca ha muerto
  }
}

function resetGame() {
  isAlive = true;
  fly = new Fly();
  document.getElementById("restartButton").style.display = "none"; // Oculta el botón de reinicio
}

class Fly { // Clase de la mosca
  constructor() { // Constructor de la mosca
    this.x = random(width); // Posicion inicial aleatoria
    this.y = random(height); // Posicion inicial aleatoria
    this.size = 50; // Tamaño de la mosca
    this.speed = 10; // Velocidad de la mosca
  }

  update() { // Actualiza la velocidad
    this.x += random(-this.speed, this.speed); // Acelera la mosca
    this.y += random(-this.speed, this.speed); // Acelera la mosca
    this.x = constrain(this.x, 0, width);  // Limita la mosca a la pantalla
    this.y = constrain(this.y, 0, height);  // Limita la mosca a la pantalla
  }

  display() { // Muestra la mosca
    fill(0);  // Color de la mosca
    
    // Dibuja el cuerpo
    ellipse(this.x, this.y, this.size, this.size); 
    
    // Dibuja la cabeza
    ellipse(this.x, this.y - this.size / 2, this.size / 2, this.size / 2);
    
    // Dibuja las alas
    fill(100, 100, 255, 150); // Color de las alas con transparencia
    ellipse(this.x - this.size / 4, this.y - this.size / 4, this.size, this.size / 2);
    ellipse(this.x + this.size / 4, this.y - this.size / 4, this.size, this.size / 2);
  }

  isHit(px, py) { // Verifica si el mouse se encuentra en la mosca
    let d = dist(px, py, this.x, this.y); // Distancia entre el mouse y la mosca
    return d < this.size / 2; // Retorna true si el mouse se encuentra en la mosca
  }
}