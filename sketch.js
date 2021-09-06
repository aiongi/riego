let fondo = [205, 199, 175];

let campoDeRiego = {
  X: 0,
  Y: 0,
  diametro: 0,

  // Distribuye los puntos de origen para la modulación en grilla y llama a la función que dibuja el sistema.
  loteo: function () {
    this.diametro = Math.floor(random(20, 100));
    this.X -= this.diametro / 2;
    for (let i = 0; i < width / this.diametro; i++) {
      if (this.X < width - this.diametro) {
        this.Y = this.diametro / 2;
        this.X += this.diametro;
        lote.regar(this.X, this.Y, this.diametro);
        noFill();
        stroke(fondo);
        strokeWeight(this.diametro / 40);
        circle(this.X, this.Y, this.diametro);
        for (let j = 0; j < height / this.diametro; j++) {
          if (this.Y < height - this.diametro) {
            this.Y += this.diametro;
            lote.regar(this.X, this.Y, this.diametro);
            noFill();
            stroke(fondo);
            strokeWeight(this.diametro / 40);
            circle(this.X, this.Y, this.diametro);
          }
        }
      }
    }
    this.X = 0;
    this.Y = 0;
  },
};

// Dibuja un módulo aleatorio entre tres posibilidades: círculo entero, dividido en dos al medio, o en hasta cuatro fracciones, variando el color.
let lote = {
  regar: function (X, Y, diametro) {
    noStroke();
    let verde = [26, 84, 25];
    let amarillo = [196, 180, 155];
    let marron = [80, 83, 56];
    let colores = [verde, amarillo, marron];

    let estados = () => Math.floor(Math.random() * 3);

    switch (estados()) {
      case 0:
        let seed = () => Math.floor(Math.random() * 8);
        let angulo45 = [
          0,
          QUARTER_PI,
          HALF_PI,
          HALF_PI + QUARTER_PI,
          PI,
          PI + QUARTER_PI,
          PI + HALF_PI,
          PI + HALF_PI + QUARTER_PI,
        ];
        fill(amarillo);
        circle(X, Y, diametro);
        fill(marron);
        arc(X, Y, diametro, diametro, angulo45[seed()], angulo45[seed()], PIE);
        fill(verde);
        arc(X, Y, diametro, diametro, angulo45[seed()], angulo45[seed()], PIE);
        break;

      case 1:
        let color = () => Math.floor(Math.random() * 3);
        fill(colores[color()]);
        circle(X, Y, diametro);
        fill(colores[color()]);
        arc(X, Y, diametro, diametro, HALF_PI, PI + HALF_PI, PIE);
        break;

      case 2:
        fill(26, 84, 25);
        circle(X, Y, diametro);
        break;
    }
  },
};

function setup() {
  console.log(campoDeRiego.diametro);
  createCanvas(windowWidth, windowHeight);
  background(fondo);
}

function draw() {
  noLoop();
  campoDeRiego.loteo();
}

function mousePressed() {
  background(fondo);
  campoDeRiego.loteo();
  console.log(campoDeRiego .diametro);
}
