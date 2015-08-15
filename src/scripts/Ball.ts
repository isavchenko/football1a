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
        var ball;
        loader.options.convertUpAxis = true;
        var self = this;
        loader.load( '../models/ball.dae', function ( collada ) {
            ball = collada.scene.children[0];
            ball.updateMatrix();
            ball.position.set(0, 0, 0);
            self.model = ball;
            self.loaded = true;
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