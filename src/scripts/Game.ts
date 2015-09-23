/**
 *
 */
class Game {
    scene: THREE.Scene;
    camera: THREE.Camera;
    light: THREE.Light;
    ball: Ball;
    field: Field;
    player: Player;

    constructor() {

    }

    initGame() {
        this.scene = new THREE.Scene();
        this.initCamera();
        this.initLight();
        WorldCoordinates.setUpCartesianCoordinates(this.scene);

        this.ball = new Ball();
        this.ball.load((ball) => {
            this.scene.add(ball);
        });
        this.field = new Field();
        this.field.load((field) => {
           this.scene.add(field);
        });
        this.player = new Player();
        this.player.load((player) => {
            this.scene.add(player);
        });
        //this.ball.a = new THREE.Vector3(0, 10, 0); // todo: remove this
        //this.ball.v = new THREE.Vector3(1, 10, 1); //todo: remove this
    }

    private initCamera() {
        this.camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.set(5, 5, 3);
        this.camera.lookAt(new THREE.Vector3(0, 0, 0));
        this.scene.add(this.camera);
    }

    private initLight() {
        this.light = new THREE.DirectionalLight(0xffffff);
        this.light.position.set(3, 3, -1).normalize();
        this.scene.add(this.light);
    }

    update (dTime: number = 1 / 60) {
        if (this.ballIntersectsPlane() && this.ball.v.y < 0) {
            this.ball.v.set(this.ball.v.x, - this.ball.v.y, this.ball.v.z);
            this.ball.v.multiplyScalar(this.field.coef);
        }
        if (this.ballIntersectsPlane()) {
            var ballGeometry = (<THREE.Mesh>this.ball.model.children[0]).geometry;
            var ballBoundingSphere = ballGeometry.boundingSphere;
            this.ball.model.position.y = ballBoundingSphere.radius;
        }
        this.ball.update(dTime);
    }

    isLoaded(): boolean {
        return this.ball.loaded;
    }

    ballIntersectsPlane() {
        var ballGeometry = (<THREE.Mesh>this.ball.model.children[0]).geometry;
        var ballBoundingSphere = ballGeometry.boundingSphere;
        return ballBoundingSphere && (this.ball.model.position.y - ballBoundingSphere.radius) < 0;
    }
}