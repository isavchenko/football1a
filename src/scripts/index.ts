/// <reference path="./typings/tsd.d.ts" />
/// <reference path="./index.d.ts" />
/// <reference path="coordinates.ts"/>

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// handler for smoke testing
document.onkeydown = function (e) {
    if (e.keyCode == 37) {//left
        game.ball.a = new THREE.Vector3(0, 0, 5);
        game.ball.v = new THREE.Vector3(0, 0, 5);
    } else if (e.keyCode == 38) {//up

    } else if (e.keyCode == 39) {//right

    } else if (e.keyCode == 40) {//down

    }
};

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