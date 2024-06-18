const { Engine, Render, Runner, Bodies, World, Body, Events } = Matter;

const engine = Engine.create();
const render = Render.create({
  element: document.body,
  engine: engine,
  options: {
    width: window.innerWidth,
    height: window.innerHeight,
    wireframes: false
  }
});
const runner = Runner.create();

Render.run(render);
Runner.run(runner, engine);

const paddleWidth = 150;
const paddleHeight = 20;
const paddleX = render.options.width / 2;
const paddleY = render.options.height - 50;

const paddle = Bodies.rectangle(paddleX, paddleY, paddleWidth, paddleHeight, {
  isStatic: true,
  render: {
    fillStyle: '#333333'
  }
});

const ball = Bodies.circle(paddleX, paddleY - 100, 20, {
  restitution: 0.9,
  render: {
    fillStyle: '#FFD700'
  }
});

const wallOptions = {
  isStatic: true,
  render: {
    visible: false
  }
};

const leftWall = Bodies.rectangle(0, render.options.height / 2, 20, render.options.height, wallOptions);
const rightWall = Bodies.rectangle(render.options.width, render.options.height / 2, 20, render.options.height, wallOptions);
const topWall = Bodies.rectangle(render.options.width / 2, 0, render.options.width, 20, wallOptions);

World.add(engine.world, [paddle, ball, leftWall, rightWall, topWall]);

document.addEventListener('keydown', event => {
  const { keyCode } = event;
  if (keyCode === 37) {
    Body.translate(paddle, { x: -20, y: 0 }); // Left arrow key
  } else if (keyCode === 39) {
    Body.translate(paddle, { x: 20, y: 0 }); // Right arrow key
  }
});

Events.on(engine, 'collisionStart', event => {
  const pairs = event.pairs;
  pairs.forEach(pair => {
    if (pair.bodyA === ball || pair.bodyB === ball) {
      // Handle collision with ball
    }
  });
});

Engine.run(engine);

// Socket.io setup
const socket = io();

socket.on('connect', () => {
  console.log('Connected to server');
});

socket.on('updatePaddlePosition', newPosition => {
  Body.setPosition(paddle, newPosition);
});

socket.on('updateBallPosition', newPosition => {
  Body.setPosition(ball, newPosition);
});

socket.on('gameOver', () => {
  console.log('Game over');
});

