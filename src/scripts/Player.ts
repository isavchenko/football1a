class Player {
    model: THREE.Object3D;

    load(callback: (model: THREE.Object3D) => any) {
        var geometry = new THREE.BoxGeometry(1, 4, 1);
        var material = new THREE.MeshBasicMaterial({color: 0x25383C});
        var model = new THREE.Mesh(geometry, material);
        //fieldModel.rotation.copy(new THREE.Euler(-Math.PI/2, 0, 0));
        this.model = model;
        this.model.translateX(3);
        this.model.translateZ(3);
        console.log(model);
        callback(model)
    }
}