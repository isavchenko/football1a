/**
 * Soccer ball
 */
class Ball {
    loaded: boolean;
    model: THREE.Object3D;
    a: THREE.Vector3;
    v: THREE.Vector3;

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
        this.v = this.v.sub(this.a.multiplyScalar(dt));
        this.model.position.copy(this.v.multiplyScalar(dt).sub(this.a.multiplyScalar(Math.pow(dt, 2) / 2)));
    }
}