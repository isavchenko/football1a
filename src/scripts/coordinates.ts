module WorldCoordinates {
    // coordinate system
    function drawCoordinateLine(vector: THREE.Vector3, color: number): void {
        var lineMaterial = new THREE.LineBasicMaterial({
            color: color
        });
        var lineEnd = new THREE.Geometry();
        lineEnd.vertices.push(new THREE.Vector3(0, 0, 0));
        lineEnd.vertices.push(vector);
        var linex = new THREE.Line(lineEnd, lineMaterial);
        scene.add(linex);
    }

    export function setUpCartesianCoordinates(): void {
        drawCoordinateLine(new THREE.Vector3(10, 0, 0),  0x0000ff);
        drawCoordinateLine(new THREE.Vector3(0, 10, 0),  0x00ff00);
        drawCoordinateLine(new THREE.Vector3(0, 0, 10),  0xff0000);
    }
}
