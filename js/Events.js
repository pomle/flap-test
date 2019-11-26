export function Events() {
    const events = new Map();

    const emit = (name, data) => {
        if (events.has(name)) {
            events.get(name).forEach(fn => fn(data));
        }
    };

    const on = (name, fn) => {
        if (!events.has(name)) {
            events.set(name, new Set());
        }
        events.get(name).add(fn);
    };

    return {
        emit,
        on,
    };
}
