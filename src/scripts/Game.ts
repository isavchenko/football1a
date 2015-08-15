/**
 *
 */
class Game {
    scene: THREE.Scene;
    camera: THREE.Camera;
    light: THREE.Light;
    ball: Ball;

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
        //this.ball.a = new THREE.Vector3(0, 10, 0); // todo: remove this
        this.ball.v = new THREE.Vector3(1, 10, 1); //todo: remove this
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
        this.ball.update(dTime);
    }

    isLoaded(): boolean {
        return this.ball.loaded;
    }
}