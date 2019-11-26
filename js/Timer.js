export function Timer() {
    const listeners = new Set;
    let frameId = null;
    let step = 1/60;
    let accumulator = 0;
    let lastTime = null;
    let running = false;

    function enqueue() {
        frameId = requestAnimationFrame(update);
    }

    function update(nowTime) {
        if (lastTime !== null) {
            accumulator += (nowTime - lastTime) / 1000;
        }

        while (accumulator > step) {
            listeners.forEach(fn => fn(step));
            accumulator -= step;
        }
        lastTime = nowTime;

        if (running) {
            enqueue();
        }
    }

    return {
        addListener(fn) {
            listeners.add(fn);
        },
        start() {
            running = true;
            enqueue();
        },
        stop() {
            lastTime = null;
            running = false;
            cancelAnimationFrame(frameId);
        },
    };
}
