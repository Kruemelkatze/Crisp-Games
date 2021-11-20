// The title of the game to be displayed on the title screen
title = "CHARGE RUSH";

// The description, which is also displayed on the title screen
description = `
`;

// The array of custom sprites
characters = [];

const C = {
  WIDTH: 100,
  HEIGHT: 150,
  STAR_SPEED_MIN: 0.5,
  STAR_SPEED_MAX: 1.0
}

// Game runtime options
// Refer to the official documentation for all available options
options = {
  viewSize: { x: C.WIDTH, y: C.HEIGHT },
};

// ~~~~~~~~~~~~~~~~~~~~~~~~~ Objects ~~~~~~~~~~~~~~~~~~~~~~~~~
/**
* @typedef {{
* pos: Vector,
* speed: number,
* }} Star
*/

/**
* @type  { Star [] }
*/
var stars;


/**
* @typedef {{
* pos: Vector,
* }} Player
*/

/**
* @type  { Player }
*/
var player;

var inputWasInRange = false;

// ~~~~~~~~~~~~~~~~~~~~~~~~~ Functions ~~~~~~~~~~~~~~~~~~~~~~~~~
function init() {
  stars = times(20, () => {
    let x = rnd(0, C.WIDTH);
    let y = rnd(0, C.HEIGHT);

    return {
      pos: vec(x, y),
      speed: rnd(C.STAR_SPEED_MIN, C.STAR_SPEED_MAX),
    }
  });

  player = {
    pos: vec(C.WIDTH * 0.5, C.HEIGHT * 0.75)
  }

  inputWasInRange = false;
}

// The game loop function
function update() {
  // The init function
  if (!ticks) {
    init();
  }

  stars.forEach(s => {
    s.pos.y += s.speed;
    s.pos.wrap(0, C.WIDTH, 0, C.HEIGHT);

    color("light_black");
    box(s.pos, 1);
  })

  if (inputWasInRange || input.pos.isInRect(0, 0, C.WIDTH, C.HEIGHT)) {
    player.pos = vec(input.pos.x, input.pos.y)
    clamps(player.pos, 4);
    inputWasInRange = true;
  }

  color("cyan");
  box(player.pos, 4);
}

function wraps(vec, offset, fixedOffset) {
  if (typeof (offset) === "number") {
    if (!fixedOffset) {
      offset = offset / 2;
    }
    vec.wrap(offset, C.WIDTH - offset, offset, C.HEIGHT - offset);
  } else if (offset) {
    if (!fixedOffset) {
      offset.x = offset.x / 2;
      offset.y = offset.y / 2;
    }
    vec.wrap(offset.x, C.WIDTH - offset.y, offset.y, C.HEIGHT - offset.y);
  } else {
    vec.wrap(0, C.WIDTH, 0, C.HEIGHT);
  }
}

function clamps(vec, offset, fixedOffset) {
  if (typeof (offset) === "number") {
    if (!fixedOffset) {
      offset = offset / 2;
    }
    vec.clamp(offset, C.WIDTH - offset, offset, C.HEIGHT - offset);
  } else if (offset) {
    if (!fixedOffset) {
      offset.x = offset.x / 2;
      offset.y = offset.y / 2;
    }
    vec.clamp(offset.x, C.WIDTH - offset.y, offset.y, C.HEIGHT - offset.y);
  } else {
    vec.clamp(0, C.WIDTH, 0, C.HEIGHT);
  }
}
