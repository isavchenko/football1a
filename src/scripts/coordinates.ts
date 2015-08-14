module WorldCoordinates {
    // coordinate system
    function drawCoordinateLine(vector: THREE.Vector3, color: number): THREE.Line {
        var lineMaterial = new THREE.LineBasicMaterial({
            color: color
        });
        var lineEnd = new THREE.Geometry();
        lineEnd.vertices.push(new THREE.Vector3(0, 0, 0));
        lineEnd.vertices.push(vector);
        return new THREE.Line(lineEnd, lineMaterial);

    }

    export function setUpCartesianCoordinates(scene: THREE.Scene): void {
        scene.add(drawCoordinateLine(new THREE.Vector3(10, 0, 0),  0x0000ff));
        scene.add(drawCoordinateLine(new THREE.Vector3(0, 10, 0),  0x00ff00));
        scene.add(drawCoordinateLine(new THREE.Vector3(0, 0, 10),  0xff0000));
    }
}
