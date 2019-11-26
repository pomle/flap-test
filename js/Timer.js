export function Timer() {
    const listeners = new Set;
    let frameId = null;
    let step = 1/60;
    let accumulator = 0;
    let lastTime = null;

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
        enqueue();
    }

    return {
        addListener(fn) {
            listeners.add(fn);
        },
        start() {
            enqueue();
        },
        stop() {
            lastTime = null;
            cancelAnimationFrame(frameId);
        },
    };
}
