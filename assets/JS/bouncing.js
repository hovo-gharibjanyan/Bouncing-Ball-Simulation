class BouncingBall {
    constructor(imageSrc, defaultRadius, defaultElasticity) {
        this.canvas = document.getElementById('myCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.balls = []; 
        this.applyNewRadius = false; 

        this.ballImage = new Image();
        this.ballImage.src = imageSrc; 

        this.init(defaultRadius, defaultElasticity);
        this.setupRadiusChange();
    }

    drawBall(ball) {
        this.ctx.drawImage(this.ballImage, ball.x - ball.radius, ball.y - ball.radius, ball.radius * 2, ball.radius * 2);
    }

    update() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        for (let i = 0; i < this.balls.length; i++) {
            let ball = this.balls[i];

            ball.vy += ball.gravity;
            ball.y += ball.vy;
            ball.x += ball.vx;

            if (ball.y + ball.radius > this.canvas.height) {
                ball.y = this.canvas.height - ball.radius;
                ball.vy = -ball.vy * ball.elasticity;
            }

            this.drawBall(ball);
        }

        requestAnimationFrame(() => this.update());
    }

    init(defaultRadius, defaultElasticity) {
        this.canvas.addEventListener('click', (event) => {
            const newBall = {
                x: event.clientX - this.canvas.getBoundingClientRect().left,
                y: event.clientY - this.canvas.getBoundingClientRect().top,
                radius: this.applyNewRadius ? parseInt(document.getElementById('radiusInput').value) : defaultRadius,
                vx: 0,
                vy: 0,
                gravity: 0.4,
                elasticity: defaultElasticity,
            };
            this.balls.push(newBall);
        });

        this.update();
    }

    setupRadiusChange() {
        const radiusInput = document.getElementById('radiusInput');
        radiusInput.addEventListener('change', (event) => {
            const newRadius = Number(event.target.value);
            if (!isNaN(newRadius) && newRadius > 0) {
                this.applyNewRadius = true;
            } else {
                this.applyNewRadius = false;
            }
        });
    }
}

export default BouncingBall;
