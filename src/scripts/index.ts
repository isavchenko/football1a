/// <reference path="./typings/tsd.d.ts" />
/// <reference path="./index.d.ts" />
/// <reference path="coordinates.ts"/>

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var game = new Game();
game.initGame();

var render = function () {
    requestAnimationFrame(render);

    if (game.isLoaded()) {
        game.update();
    }

    renderer.render(game.scene, game.camera);
};
render();