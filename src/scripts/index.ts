/// <reference path="./typings/tsd.d.ts" />
/// <reference path="./index.d.ts" />

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
var geometry = new THREE.BoxGeometry(1, 1, 1);
var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
var cube = new THREE.Mesh(geometry, material);

camera.position.x = 3;
camera.position.y = 3;
camera.position.z = 3;
camera.lookAt(new THREE.Vector3(0, 0, 0));

var directionalLight = new THREE.DirectionalLight(0xffffff);
directionalLight.position.set(2, 2, 2).normalize();
scene.add(directionalLight);
// coordinate system
function drawCoordinateLine(vector, color) {
    var lineMaterial = new THREE.LineBasicMaterial({
        color: color
    });
    var lineEnd = new THREE.Geometry();
    lineEnd.vertices.push(new THREE.Vector3(0, 0, 0));
    lineEnd.vertices.push(vector);
    var linex = new THREE.Line(lineEnd, lineMaterial);
    scene.add(linex);
}

drawCoordinateLine(new THREE.Vector3(10, 0, 0),  0x0000ff);
drawCoordinateLine(new THREE.Vector3(0, 10, 0),  0x00ff00);
drawCoordinateLine(new THREE.Vector3(0, 0, 10),  0xff0000);

var loader = new THREE.ColladaLoader();
var localObject;
loader.options.convertUpAxis = true;
loader.load( '../models/ball.dae', function ( collada ) {
    localObject = collada.scene.children[0];
    localObject.updateMatrix();
    localObject.position.x = localObject.position.y = localObject.position.z = 0;
    localObject.position.x = 0;
    localObject.position.y = 0;
    localObject.position.z = 0;
    scene.add(localObject);
    console.log('BAll', localObject);

    var startBall = false;
    renderer.domElement.onclick = function (e) {
        x = e.x / window.innerWidth;
        y = e.y / window.innerHeight;

        var mouse3D = new THREE.Vector3( ( event.clientX / window.innerWidth ) * 2 - 1,   //x
            -( event.clientY / window.innerHeight ) * 2 + 1,
            0.5 );
        console.log(mouse3D);
        mouse3D = mouse3D.unproject(camera);
        console.log(mouse3D);
        mouse3D = mouse3D.sub( camera.position );
        console.log(mouse3D);
        mouse3D = mouse3D.normalize();
        var raycaster = new THREE.Raycaster( camera.position, mouse3D );
        var intersects = raycaster.intersectObject( localObject ,true);
        console.log(intersects);
        // Change color if hit block
        if ( intersects.length > 0 ) {
            console.log(intersects);
        }

        var material = new THREE.LineBasicMaterial({
            color: 0x0000ff
        });
        var geometry = new THREE.Geometry();
        geometry.vertices.push(new THREE.Vector3(5, 5, 5));
        geometry.vertices.push(intersects[0].point);
        var line = new THREE.Line(geometry, material);
        scene.add(line);
    };
    renderer.domElement.onmousedown = function (e) {
        if (e.which == 2) {
            startBall = true;
        }
    };

    var x, y;
    var baseTBall;
    var dt = 1 / 60;
    var v = 5;
    var render = function () {
        requestAnimationFrame(render);

        if (startBall) {
            var aBall = 5;
            if (!baseTBall) {
                baseTBall = new Date().getTime();
            }
            v -= aBall * dt;

            localObject.position.y += v * dt - aBall * Math.pow(dt, 2) / 2;
            localObject.rotation.x += 0.1;

            if (localObject.position.y < 0) {
                localObject.position.y = 0;
                v = - v / 1.4;
            }
        }

        renderer.render(scene, camera);
    };
    render();
} );