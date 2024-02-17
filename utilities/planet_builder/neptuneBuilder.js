import * as THREE from 'three';
import { getFresnelMat } from '../getFresnelMat.js';

function neptuneBuilder() {
    // Create a neptune Group model and add elements of the neptune to it
    const neptuneGroup = new THREE.Group();
    const axial_tilt = -28 * Math.PI / 180;
    neptuneGroup.rotation.z = axial_tilt;
    const detail = 12; // changes number of edges on the sphere
    const loader = new THREE.TextureLoader();

    // create the venus geometry
    const geometry = new THREE.IcosahedronGeometry(1, detail);


    // describe materials to make up the venus

    // neptune texture
    const material = new THREE.MeshPhongMaterial({
    map: loader.load("../textures/neptunemap.jpg"),
    });

    // create atmospheric glow
    const fresnelMat = getFresnelMat(0x010757, 0x000000);

    // create meshes for each material
    const neptuneMesh = new THREE.Mesh(geometry, material);
    const glowMesh = new THREE.Mesh(geometry, fresnelMat);
    glowMesh.scale.setScalar(1.01);

    // add shadows to neptuneMesh
    neptuneMesh.castShadow = true;
    neptuneMesh.receiveShadow = true;


    // add elements to neptuneGroup in order
    neptuneGroup.add(neptuneMesh);          // neptuneGroup.children[0] 
    neptuneGroup.add(glowMesh);           // neptuneGroup.children[1]


    // scale neptune group
    neptuneGroup.scale.setScalar(0.6);

    return neptuneGroup;
}

export { neptuneBuilder };