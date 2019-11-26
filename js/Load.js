export function loadImage(url) {
    return new Promise((resolve, reject) => {
        const image = new Image();
        image.addEventListener("load", () => resolve(image));
        image.addEventListener("error", reject);
        image.src = url;
    });
}
