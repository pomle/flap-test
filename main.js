import {Timer} from "./js/Timer.js";
import {Vec2} from "./js/Math.js";
import {Camera} from "./js/Camera.js";
import {Entity} from "./js/Entity.js";
import {loadImage} from "./js/Load.js";

async function createBackground() {
    const sprite = await loadImage("./img/ground.png");
    const size = Vec2(100, 100);

    return function draw(context) {
        for (let x = 0; x < context.canvas.width; x += 100) {
            context.drawImage(sprite, x, 300, 100, 100);
        }
    };
}

async function createBirdEntity() {
    const sprite = await loadImage("./img/bird.png");

    const bird = Entity();
    bird.vel.x = 100;

    bird.draw = function(context) {
        context.drawImage(sprite, bird.pos.x, bird.pos.y, 80, 100);
    };

    return bird;
}

async function createEndStateMonitor(player) {
    const mon = Entity();

    const outOfBoundsY = 200;

    mon.update = function(time, world) {
        if (player.pos.y > outOfBoundsY) {
            mon.events.emit('collide');
        }
    };

    return mon;
}

async function Game() {
    const gravity = Vec2(0, 2000);

    const drawBackground = await createBackground();

    const entities = [];

    const camera = new Camera();

    const world = {
        entities,
    };

    function update(time) {
        for (const entity of entities) {
            entity.acc.x += gravity.x * time;
            entity.acc.y += gravity.y * time;
            entity.update(time, world);
        }
    }

    function draw(context) {
        drawBackground(context);
        for (const entity of entities) {
            entity.draw(context, camera);
        }
    }

    return {
        entities,
        update,
        draw,
    };
}

async function main() {
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');

    const gameSimTimer = Timer();


    const game = await Game();

    const bird = await createBirdEntity();
    const monitor = await createEndStateMonitor(bird);

    monitor.events.on('collide', () => {
        console.log("stop");
        void gameSimTimer.stop();
    });

    game.entities.push(bird, monitor);

    gameSimTimer.addListener(step => {
        game.update(step);

        context.clearRect(0, 0, canvas.width, canvas.height);
        game.draw(context);
    });

    function handleKey(event) {
        if (event.code === 'Space') {
            bird.vel.y = -200;
            bird.acc.y = 0;
        }
    }

    window.addEventListener('keydown', handleKey);

    gameSimTimer.start();
}

main();
