import * as THREE from 'three';

function moonBuilder() {
    // Create a earth Group model and add elements of the moon to it
    const moonGroup = new THREE.Group();
    const axial_tilt = -1.5 * Math.PI / 180;
    moonGroup.rotation.z = axial_tilt;
    const detail = 12; // changes number of edges on the sphere
    const loader = new THREE.TextureLoader();

    // create the moon geometry
    const geometry = new THREE.IcosahedronGeometry(1, detail);

    // describe materials to make up the moon

    // moon surface texture
    const material = new THREE.MeshPhongMaterial({
    map: loader.load("../textures/moonmap1k.jpg"),
    });

    // create meshes for each material
    const moonMesh = new THREE.Mesh(geometry, material);

    // add elements to moonGroup in order
    moonGroup.add(moonMesh);            // moonGroup.children[0]

    // scale earth group
    moonGroup.scale.setScalar(0.05); // approx 1/6th the size of earth

    return moonGroup;
}

export { moonBuilder };