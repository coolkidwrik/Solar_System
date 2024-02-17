import * as THREE from 'three';
import { getFresnelMat } from '../getFresnelMat.js';

function mercuryBuilder() {
    // Create a mercury Group model and add elements of the mercury to it
    const mercuryGroup = new THREE.Group();
    const axial_tilt = -0.01 * Math.PI / 180;
    mercuryGroup.rotation.z = axial_tilt;
    const detail = 12; // changes number of edges on the sphere
    const loader = new THREE.TextureLoader();

    // create the mercury geometry
    const geometry = new THREE.IcosahedronGeometry(1, detail);



    // describe materials to make up the mercury

    // mercury texture
    const material = new THREE.MeshPhongMaterial({
    map: loader.load("../textures/mercurymap.jpg"),
    });

    // create meshes for each material
    const mercuryMesh = new THREE.Mesh(geometry, material);


    // add elements to mercuryGroup in order
    mercuryGroup.add(mercuryMesh);            // mercuryGroup.children[0]


    // scale mercury group
    mercuryGroup.scale.setScalar(0.18);

    return mercuryGroup;
}

export { mercuryBuilder };