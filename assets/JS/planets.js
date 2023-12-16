class BouncingPlanets {
  static canvas;
  static ctx;
  static balls = [];
  static applyNewRadius = false;
  static ballImages = [
    '../img/venera.png',
    '../img/pluton.png',
    '../img/mars.png',
    '../img/satrunNo.png',
    '../img/earth.png',
    '../img/mercury1.png',
    '../img/uranus1.png',
    '../img/jupiter.png'
  ];

  static drawBall(ball) {
    const ballImageIndex = this.balls.indexOf(ball) % this.ballImages.length;
    const ballImage = new Image();
    ballImage.src = this.ballImages[ballImageIndex];
    this.ctx.drawImage(ballImage, ball.x - ball.radius, ball.y - ball.radius, ball.radius * 2, ball.radius * 2);
  }

  static update() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (let i = 0; i < this.balls.length; i++) {
      let ball = this.balls[i];

      ball.vy += ball.gravity / 60;
      ball.y += ball.vy;
      ball.x += ball.vx;

      if (ball.y - ball.radius < 0) {
        ball.y = ball.radius;
        ball.vy = -ball.vy * ball.elasticity;
      } else if (ball.y + ball.radius > this.canvas.height) {
        ball.y = this.canvas.height - ball.radius;
        ball.vy = -ball.vy * ball.elasticity;
      }

      if (ball.x - ball.radius < 0) {
        ball.x = ball.radius;
        ball.vx = -ball.vx * ball.elasticity;
      } else if (ball.x + ball.radius > this.canvas.width) {
        ball.x = this.canvas.width - ball.radius;
        ball.vx = -ball.vx * ball.elasticity;
      }

      this.drawBall(ball);
    }

    requestAnimationFrame(() => this.update());
  }

  static init() {
    const radiusInput = document.getElementById('radiusInput');
    radiusInput.addEventListener('change', (event) => {
      const newRadius = Number(event.target.value);
      if (!isNaN(newRadius) && newRadius > 0) {
        this.applyNewRadius = true;
      } else {
        this.applyNewRadius = false;
      }
    });

    this.canvas.addEventListener('click', (event) => {
      const newRadius = this.applyNewRadius ? Number(document.getElementById('radiusInput').value) : 25;

      const newBall = {
        x: event.clientX - this.canvas.getBoundingClientRect().left,
        y: event.clientY - this.canvas.getBoundingClientRect().top,
        radius: newRadius,
        vx: parseFloat(document.getElementById('vxInput').value) || 0,
        vy: parseFloat(document.getElementById('vyInput').value) || 0,
        gravity: parseFloat(document.getElementById('gravityInput').value),
        elasticity: parseFloat(document.getElementById('elasticityInput').value) || 0,
      };

      this.balls.push(newBall);
    });

    this.update();
  }

  static setupPropertiesChange() {
    const propertiesInputs = ['vxInput', 'vyInput', 'gravityInput', 'elasticityInput'];
    propertiesInputs.forEach(inputId => {
      const input = document.getElementById(inputId);
      input.addEventListener('change', () => {
        this.balls.forEach(ball => {
          ball[inputId.substring(0, inputId.indexOf('Input'))] = parseFloat(input.value) || 0;
        });
      });
    });
  }
}

BouncingPlanets.canvas = document.getElementById('myCanvas');
BouncingPlanets.ctx = BouncingPlanets.canvas.getContext('2d');
BouncingPlanets.init();
