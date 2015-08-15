/**
 * Soccer ball
 */
class Ball {
    loaded: boolean;
    model: THREE.Object3D;
    a: THREE.Vector3;
    v: THREE.Vector3 = new THREE.Vector3(0, 0, 0);
    m: number = 1;
    g: THREE.Vector3 = new THREE.Vector3(0, -9.8, 0);

    load(callback: (model: THREE.Object3D) => void) {
        var loader = new THREE.ColladaLoader();
        loader.options.convertUpAxis = true;
        var self = this;
        loader.load( '../models/ball.dae', function ( collada ) {
            var ball = <THREE.Object3D>collada.scene.children[0];
            ball.updateMatrix();
            // todo: for testing purposes
            var lineMaterial = new THREE.LineBasicMaterial({
                color: 0x0000FF,
                linewidth: 4
            });
            var lineEnd = new THREE.Geometry();
            lineEnd.vertices.push(new THREE.Vector3(0, 0, 0));
            lineEnd.vertices.push(new THREE.Vector3(0, 2, 0));
            ball.add(new THREE.Line(lineEnd, lineMaterial));
            //end todo
            self.model = ball;
            self.loaded = true;
            console.log(ball);
            // set vertical position of the ball
            var ballGeometry = (<THREE.Mesh>ball.children[0]).geometry;
            ballGeometry.computeBoundingSphere();
            var ballBoundingSphere = ballGeometry.boundingSphere;
            ball.position.set(0, ballBoundingSphere.radius, 0);
            callback(ball);
        });
    }

    update(dt?: number) {
        var x0 = this.model.position;
        var v0 = this.v;
        var a = this.g;
        var x1 = x0.clone().add(v0.clone().multiplyScalar(dt)).add(a.clone().multiplyScalar(Math.pow(dt, 2) / 2))
        this.model.position.copy(x1);
        this.v = v0.clone().add(a.clone().multiplyScalar(dt));
    }
}