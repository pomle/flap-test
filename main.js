import {Timer} from "./js/Timer.js";
import {Vec2} from "./js/Math.js";

function Entity() {
    const pos = Vec2();
    const vel = Vec2();
    const acc = Vec2();

    return {
        acc,
        pos,
        vel,
        draw(context) {
            context.fillRect(pos.x, pos.y, 10, 10);
        },
        update(time) {
            vel.x += acc.x * time;
            vel.y += acc.y * time;
            pos.x += vel.x * time;
            pos.y += vel.y * time;
        }
    }
}

function Game() {
    const gravity = Vec2(0, 500);
    const bird = Entity();
    bird.vel.x = 10;

    const entities = [];
    entities.push(bird);

    function update(time) {
        for (const entity of entities) {
            entity.acc.x += gravity.x * time;
            entity.acc.y += gravity.y * time;
            entity.update(time);
        }
    }

    function draw(context) {
        for (const entity of entities) {
            entity.draw(context);
        }
    }

    function handleKey(event) {
        if (event.code === 'Space') {
            bird.vel.y = -140;
            bird.acc.y = 0;
        }
    }

    return {
        handleKey,
        update,
        draw,
    };
}

function main() {
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');

    const timer = Timer();
    const game = Game();

    timer.addListener(step => {
        game.update(step);

        context.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
        game.draw(context);
    });

    window.addEventListener('keydown', game.handleKey);

    timer.start();
}

main();
