import {Timer} from "./js/Timer.js";
import {Vec2} from "./js/Math.js";
import {Entity} from "./js/Entity.js";

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
