function Timer() {
    const listeners = new Set;
    let frameId = null;
    let step = 1000/60;
    let accumulator = 0;
    let lastTime = null;

    function enqueue() {
        frameId = requestAnimationFrame(update);
    }

    function update(nowTime) {
        //console.log(accumulator, lastTime);
        if (lastTime !== null) {
            const diff = nowTime - lastTime;
            accumulator += diff;
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

function createGame() {

}

function main() {
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');

    const timer = Timer();
    timer.addListener(step => {
        console.log(step);
    });
    window.timer = timer;

}

main();
