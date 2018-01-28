const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;
const game = new Phaser.Game(WIDTH, HEIGHT, Phaser.CANVAS, "gameArea");
let stage;
let hero;
let cursors;
let music;

const idle = [...Array(10).keys()].map(num => `Idle${num}`);
const walk = [...Array(10).keys()].map(num => `Walk${num}`);
const jump = [...Array(10).keys()].map(num => `Jump${num}`);
const jumpAttack = [...Array(10).keys()].map(num => `JumpAttack${num}`);
const attack = [...Array(10).keys()].map(num => `Attack${num}`);
const dead = [...Array(10).keys()].map(num => `Dead${num}`);

const mainState = {
  preload: function() {
    game.load.image("stage", "images/bg.jpg");
    game.load.atlasJSONHash("hero", "images/hero.png", "images/hero.json");
  },

  create: function() {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    // game.scale.setMaximum();
    // game.scale.setScreenSize(true);

    stage = game.add.tileSprite(0, 0, WIDTH, HEIGHT, "stage");
    stage.scale.y = 1;
    stage.scale.x = 1;
    hero = game.add.sprite(200, 0, "hero", "Walk1");
    hero.width = 90;
    hero.height = 120;
    hero.animations.add("walk", walk, 20, true, false);
    hero.animations.add("idle", idle, 20, true, false);
    hero.animations.add("jump", jump, 20, true, false);
    hero.animations.add("attack", attack, 20, true, false);
    hero.animations.add("dead", dead, 20, true, false);
    game.physics.arcade.enable(hero);
    hero.body.bounce.y = 0.1;
    hero.body.gravity.y = 300;
    hero.body.collideWorldBounds = true;
    hero.anchor.set(0.5);
    cursors = game.input.keyboard.createCursorKeys();
    stage.events.onInputDown.add(listener, this);
  },

  update: function() {
    hero.body.velocity.x = 0;
    if (cursors.left.isDown) {
      hero.body.velocity.x = -30;
      hero.animations.play("walk");
      stage.tilePosition.x += 2;
    } else if (cursors.right.isDown) {
      hero.body.velocity.x = 30;
      hero.animations.play("walk");
      stage.tilePosition.x -= 2;
    } else {
      hero.animations.play("idle");
    }

    if (cursors.up.isDown) {
      hero.animations.play("jump");
      hero.body.velocity.y = -250;
    }
  },
  render: function() {}
};

function listener() {
  console.log("wtf");
}

game.state.add("mainState", mainState);
game.state.start("mainState");
