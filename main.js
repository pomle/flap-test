import {Timer} from "./js/Timer.js";
import {Vec2} from "./js/Math.js";
import {Entity} from "./js/Entity.js";
import {loadImage} from "./js/Load.js";

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

    const outOfBoundsY = 400;

    mon.update = function(time, world) {
        if (player.pos.y > outOfBoundsY) {
            console.log("AAAA");
        }
    };

    return mon;
}

async function Game() {
    const gravity = Vec2(0, 2000);

    const bird = await createBirdEntity();
    const monitor = await createEndStateMonitor(bird);

    const entities = [];
    entities.push(bird, monitor);

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
        for (const entity of entities) {
            entity.draw(context);
        }
    }

    function handleKey(event) {
        if (event.code === 'Space') {
            bird.vel.y = -200;
            bird.acc.y = 0;
        }
    }

    return {
        handleKey,
        update,
        draw,
    };
}

async function main() {
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');

    const gameSimTimer = Timer();
    const game = await Game();

    gameSimTimer.addListener(step => {
        game.update(step);

        context.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
        game.draw(context);
    });

    window.addEventListener('keydown', game.handleKey);

    gameSimTimer.start();
}

main();
