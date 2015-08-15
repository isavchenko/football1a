/**
 * Soccer field
 */
class Field {
    coef: number = 0.8;
    model: THREE.Object3D;

    load(callback: (model: THREE.Object3D) => any) {
        var geometry = new THREE.PlaneGeometry(8, 10);
        var material = new THREE.MeshBasicMaterial({color: 0x00FFAA});
        var fieldModel = new THREE.Mesh(geometry, material);
        fieldModel.rotation.copy(new THREE.Euler(-Math.PI/2, 0, 0));
        this.model = fieldModel;
        console.log(fieldModel);
        callback(fieldModel)
    }
}