// Definir variáveis
let bola;
let raqueteJogador;
let raqueteAdversario;
let velocidadeBola = 5;
let velocidadeRaquete = 10;

function setup() {
  createCanvas(600, 400);
  
  // Inicializar bola
  bola = {
    x: width / 2,
    y: height / 2,
    diametro: 20,
    velocidadeX: velocidadeBola,
    velocidadeY: velocidadeBola
  };

  // Inicializar raquete do jogador
  raqueteJogador = {
    x: 20,
    y: height / 2 - 30,
    largura: 10,
    altura: 60
  };

  // Inicializar raquete do adversário
  raqueteAdversario = {
    x: width - 30,
    y: height / 2 - 30,
    largura: 10,
    altura: 60
  };
}

function draw() {
  background(0);

  // Atualizar e desenhar a bola
  bola.x += bola.velocidadeX;
  bola.y += bola.velocidadeY;

  fill(255);
  noStroke();
  ellipse(bola.x, bola.y, bola.diametro);

  // Verificar colisão com o topo e a base
  if (bola.y - bola.diametro / 2 < 0 || bola.y + bola.diametro / 2 > height) {
    bola.velocidadeY *= -1;
  }

  // Verificar colisão com as raquetes
  if (bola.x - bola.diametro / 2 < raqueteJogador.x + raqueteJogador.largura && 
      bola.y > raqueteJogador.y && 
      bola.y < raqueteJogador.y + raqueteJogador.altura) {
    bola.velocidadeX *= -1;
  }

  if (bola.x + bola.diametro / 2 > raqueteAdversario.x && 
      bola.y > raqueteAdversario.y && 
      bola.y < raqueteAdversario.y + raqueteAdversario.altura) {
    bola.velocidadeX *= -1;
  }

  // Atualizar e desenhar a raquete do jogador
  fill(255);
  rect(raqueteJogador.x, raqueteJogador.y, raqueteJogador.largura, raqueteJogador.altura);

  // Atualizar e desenhar a raquete do adversário
  fill(255);
  rect(raqueteAdversario.x, raqueteAdversario.y, raqueteAdversario.largura, raqueteAdversario.altura);

  // Controlar a raquete do jogador
  if (keyIsDown(87)) { // 'W' para subir
    raqueteJogador.y -= velocidadeRaquete;
  }
  if (keyIsDown(83)) { // 'S' para descer
    raqueteJogador.y += velocidadeRaquete;
  }

  // Movimentar a raquete do adversário automaticamente
  raqueteAdversario.y = bola.y - raqueteAdversario.altura / 2;

  // Manter raquetes dentro da tela
  raqueteJogador.y = constrain(raqueteJogador.y, 0, height - raqueteJogador.altura);
  raqueteAdversario.y = constrain(raqueteAdversario.y, 0, height - raqueteAdversario.altura);

  // Verificar se a bola saiu dos limites
  if (bola.x - bola.diametro / 2 < 0 || bola.x + bola.diametro / 2 > width) {
    // Reiniciar a bola
    bola.x = width / 2;
    bola.y = height / 2;
    bola.velocidadeX *= -1;
  }
}