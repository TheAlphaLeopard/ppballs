// Initialize Matter.js
const { Engine, Render, Runner, Bodies, World, Body, Events } = Matter;

// Create an engine
const engine = Engine.create();

// Create a renderer
const render = Render.create({
  element: document.body,
  engine: engine,
  options: {
    width: window.innerWidth,
    height: window.innerHeight,
    wireframes: false  // Set to true for wireframe mode
  }
});

// Create a runner
const runner = Runner.create();

// Add the renderer to the DOM
Render.run(render);

// Add the runner to the engine
Runner.run(runner, engine);

// Create game objects (e.g., paddles, bumpers, ball)
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

// Add all of the bodies to the world
World.add(engine.world, [paddle, ball, leftWall, rightWall, topWall]);

// Keyboard controls for paddle
document.addEventListener('keydown', event => {
  const { keyCode } = event;
  if (keyCode === 37) {
    Body.translate(paddle, { x: -20, y: 0 }); // Left arrow key
  } else if (keyCode === 39) {
    Body.translate(paddle, { x: 20, y: 0 }); // Right arrow key
  }
});

// Collision events
Events.on(engine, 'collisionStart', event => {
  const pairs = event.pairs;
  pairs.forEach(pair => {
    // Example collision handling
    if (pair.bodyA === ball || pair.bodyB === ball) {
      // Handle collision with ball
    }
  });
});

// Run the engine
Engine.run(engine);
