import * as THREE from 'three';

function moonBuilder() {
    // Create a earth Group model and add elements of the earth to it
    const moonGroup = new THREE.Group();
    const axial_tilt = -1.5 * Math.PI / 180;
    moonGroup.rotation.z = axial_tilt;
    const detail = 12; // changes number of edges on the sphere
    const loader = new THREE.TextureLoader();

    // create the earth geometry
    const geometry = new THREE.IcosahedronGeometry(1, detail);



    // describe materials to make up the earth

    // earth daytime texture
    const material = new THREE.MeshPhongMaterial({
    map: loader.load("../textures/moonmap1k.jpg"),
    });

}

export { earthBuilder };