import * as THREE from 'three';
import { getFresnelMat } from '../getFresnelMat.js';

function venusBuilder() {
    // Create a venus Group model and add elements of the venus to it
    const venusGroup = new THREE.Group();
    const axial_tilt = -117 * Math.PI / 180;
    venusGroup.rotation.z = axial_tilt;
    const detail = 12; // changes number of edges on the sphere
    const loader = new THREE.TextureLoader();

    // create the venus geometry
    const geometry = new THREE.IcosahedronGeometry(1, detail);


    // describe materials to make up the venus

    // venus texture
    const material = new THREE.MeshPhongMaterial({
    map: loader.load("../textures/venusmap.jpg"),
    });

    // create atmospheric glow
    const fresnelMat = getFresnelMat(0x634a04, 0x000000);

    // create meshes for each material
    const venusMesh = new THREE.Mesh(geometry, material);
    const glowMesh = new THREE.Mesh(geometry, fresnelMat);
    glowMesh.scale.setScalar(1.03);

    // add shadows to venusMesh
    venusMesh.castShadow = true;
    venusMesh.receiveShadow = true;


    // add elements to venusGroup in order
    venusGroup.add(venusMesh);          // venusGroup.children[0] 
    venusGroup.add(glowMesh);           // venusGroup.children[1]


    // scale venus group
    venusGroup.scale.setScalar(0.24);

    return venusGroup;
}

export { venusBuilder };