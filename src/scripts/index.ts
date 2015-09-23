/// <reference path="./typings/tsd.d.ts" />
/// <reference path="./index.d.ts" />
/// <reference path="coordinates.ts"/>

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// handler for smoke testing
/*document.onkeydown = function (e) {
    var player = game.player.model;
    var offset = 0.1;
    if (e.keyCode == 37) {//left
        player.translateZ(offset);
    } else if (e.keyCode == 38) {//up
        player.translateX(-offset);
    } else if (e.keyCode == 39) {//right
        player.translateZ(-offset);
    } else if (e.keyCode == 40) {//down
        player.translateX(offset);
    }
};*/
document.onkeydown = function (e) {
    var angle = Math.PI / 30;
    var line = (<THREE.Line>game.ball.model.children[1]);
    var lineGeometry = line.geometry;
    var vector1 = <THREE.Vector3>line.geometry.vertices[1];
    vector1.applyMatrix4(line.matrix);
    if (e.keyCode == 37) {//left
        line.rotation.x += angle;
    } else if (e.keyCode == 38) {//up
        line.rotation.z += angle;
    } else if (e.keyCode == 39) {//right
        line.rotation.x -= angle;
    } else if (e.keyCode == 40) {//down
        line.rotation.z -= angle;
    } else {
        var vector1 = <THREE.Vector3>line.geometry.vertices[1];
        vector1.applyMatrix4(line.matrix);
        var vector0 = <THREE.Vector3>line.geometry.vertices[0];
        vector1.applyMatrix4(line.matrix);
        console.log(vector1);
        console.log(vector0);
        var vector = vector1.clone().sub(vector0);
        vector.multiplyScalar(5);
        console.log(vector);
        game.ball.v.copy(vector);
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