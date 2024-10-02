<font color="#F6DCAC">

# Condicionales: Mata a la mosca

#### v.0.01

</font>

Este es un proyecto para aprender a usar condicionales.

```html
<video width="640" height="480" controls autoplay>
  <source src="files/intro.mp4" type="video/mp4">
  Tu navegador no soporta el elemento de video.
</video>
```

Adicionalmente hemos aprendido a usar el CND de p5.js incluyendo el siguiente código dentro del `head` del arch. index.html de la siguiente manera:

```html
  <script src="https://cdn.jsdelivr.net/npm/p5@1.11.0/lib/p5.min.js"></script>
```

# Desarrollo

1.  Se declaran variables de la mosca y textos en pantalla: 

```js
let fly; // Instancia de mosca
let isAlive = true; // Variable para saber si la mosca ha muerto  
let message = "Mata a la mosca"; // Texto de la mosca 
```

2. Se genera el espacio en donde estará ubicado el diseño (visualización de código):

```js
function setup() {
  createCanvas(windowWidth, windowHeight);
  fly = new Fly(); // crea un nuevo atributo de la clase Fly
  // Configura el botón de reinicio
  let restartButton = document.getElementById("restartButton");
  restartButton.addEventListener("click", resetGame);
  cursor(ARROW); //establece el cursor
}
```

3. Se declaran variables de fondo, tipografía y atributos de condición:

```js
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
```

4. Se declaran variables de mouse sobre la mosca:

```js
function mousePressed() { // cuando se presiona el mouse
  if (isAlive && fly.isHit(mouseX, mouseY)) { // si la mosca no ha muerto y el mouse se encuentra en la mosca
    isAlive = false; // la mosca ha muerto
  }
}
```

5. Cuando la mosca está viva se muestra en pantalla y el botón de reinicio se mantiene oculto

```js
function resetGame() {
  isAlive = true;
  fly = new Fly();
  document.getElementById("restartButton").style.display = "none"; // Oculta el botón de reinicio
}
```


6. Se genera la mosca: 

```js
class Fly { // Clase de la mosca
  constructor() { // Constructor de la mosca
    this.x = random(width); // Posicion inicial aleatoria
    this.y = random(height); // Posicion inicial aleatoria
    this.size = 50; // Tamaño de la mosca
    this.speed = 10; // Velocidad de la mosca
  }
```

7. Actualiza atributos de la mosca y mantiene la misma en la pantalla: 

```js
update() { // Actualiza la velocidad
    this.x += random(-this.speed, this.speed); // Acelera la mosca
    this.y += random(-this.speed, this.speed); // Acelera la mosca
    this.x = constrain(this.x, 0, width);  // Limita la mosca a la pantalla
    this.y = constrain(this.y, 0, height);  // Limita la mosca a la pantalla
  }
  ```

8. Muestra la mosca en pantalla y sus atributos:

```js
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
```

8. Verifica el estado del mouse

```js
isHit(px, py) { // Verifica si el mouse se encuentra en la mosca
    let d = dist(px, py, this.x, this.y); // Distancia entre el mouse y la mosca
    return d < this.size / 2; // Retorna true si el mouse se encuentra en la mosca
  }
}
```
>Esta función isHit(px, py) es un método de la clase Fly que verifica si el mouse está sobre la mosca. Aquí está el desglose de lo que hace:

- **let d** = dist(px, py, this.x, this.y);: Calcula la distancia d entre la posición del mouse (px, py) y la posición de la mosca (this.x, this.y) usando la función dist, que es una función de p5.js para calcular la distancia euclidiana.

- **return d** < this.size / 2;: Retorna true si la distancia d es menor que el radio de la mosca (this.size / 2), lo que significa que el mouse está sobre la mosca. Si no, retorna false.

<font color="FF6500">

# Glosario

</font>

## THIS

En *JavaScript*, **this** es una palabra clave que se refiere al objeto desde el cual se invocó la función actual. Su valor depende del contexto en el que se usa. Aquí hay algunos ejemplos comunes:

- **En un método de un objeto:** this se refiere al objeto propietario.

- **En una función regular:** this se refiere al objeto global (window en navegadores).

- **En un constructor de clase:** this se refiere a la nueva instancia del objeto.

- **En funciones flecha:** this se hereda del contexto léxico en el que se define.

## CONSTRUCTOR

El **constructor** se utiliza para inicializar las propiedades del objeto en este caso **Fly** con valores específicos o calculados. Cada vez que se crea una nueva instancia de Fly, se ejecuta el constructor, asegurando que la mosca tenga una posición aleatoria en la pantalla, un tamaño fijo de 50, y una velocidad de 15.
