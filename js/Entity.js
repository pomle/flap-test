import {Vec2} from "./Math.js";

export function Entity() {
    const pos = Vec2();
    const vel = Vec2();
    const acc = Vec2();

    return {
        acc,
        pos,
        vel,
        draw(context) {
            //context.fillRect(pos.x, pos.y, 10, 10);
        },
        update(time) {
            vel.x += acc.x * time;
            vel.y += acc.y * time;
            pos.x += vel.x * time;
            pos.y += vel.y * time;
        }
    }
}
