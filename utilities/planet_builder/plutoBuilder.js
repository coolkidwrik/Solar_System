import * as THREE from 'three';
import { getFresnelMat } from '../getFresnelMat.js';

function plutoBuilder() {
    // Create a pluto Group model and add elements of the pluto to it
    const plutoGroup = new THREE.Group();
    const axial_tilt = -120 * Math.PI / 180;
    plutoGroup.rotation.z = axial_tilt;
    const detail = 12; // changes number of edges on the sphere
    const loader = new THREE.TextureLoader();

    // create the venus geometry
    const geometry = new THREE.IcosahedronGeometry(1, detail);


    // describe materials to make up the venus

    // pluto texture
    const material = new THREE.MeshPhongMaterial({
    map: loader.load("../textures/plutomap1k.jpg"),
    });

    // create atmospheric glow
    const fresnelMat = getFresnelMat(0x27293d, 0x000000);

    // create meshes for each material
    const plutoMesh = new THREE.Mesh(geometry, material);
    const glowMesh = new THREE.Mesh(geometry, fresnelMat);
    glowMesh.scale.setScalar(1.01);

    // add shadows to plutoMesh
    plutoMesh.castShadow = true;
    plutoMesh.receiveShadow = true;


    // add elements to plutoGroup in order
    plutoGroup.add(plutoMesh);          // plutoGroup.children[0] 
    plutoGroup.add(glowMesh);           // plutoGroup.children[1]


    // scale pluto group
    plutoGroup.scale.setScalar(0.1);

    return plutoGroup;
}

export { plutoBuilder };