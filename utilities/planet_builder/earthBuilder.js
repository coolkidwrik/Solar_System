import * as THREE from 'three';
import { getFresnelMat } from '../getFresnelMat.js';

function earthBuilder() {
    // Create a earth Group model and add elements of the earth to it
    const earthGroup = new THREE.Group();
    const axial_tilt = -23.4 * Math.PI / 180;
    earthGroup.rotation.z = axial_tilt;
    const detail = 12; // changes number of edges on the sphere
    const loader = new THREE.TextureLoader();

    // create the earth geometry
    const geometry = new THREE.IcosahedronGeometry(1, detail);



    // describe materials to make up the earth

    // earth daytime texture
    const material = new THREE.MeshPhongMaterial({
    map: loader.load("../textures/earthmap1k.jpg"),
    });

    // earth nighttime texture
    // merge with map of earth to create lights in the night
    const lightsMat = new THREE.MeshBasicMaterial({
    map: loader.load("../textures/earthlights1k.jpg"),
    blending: THREE.AdditiveBlending,
    });

    // create clouds texture
    const cloudsMat = new THREE.MeshStandardMaterial({
    map: loader.load("../textures/earthcloudmap.jpg"),
    transparent: true,
    opacity: 0.7,
    blending: THREE.AdditiveBlending
    });

    // create atmospheric glow
    // default rimHex = 0x20c7fa, facingHex = 0x000000
    const fresnelMat = getFresnelMat(0x5bc2fc, 0x000000);




    // create meshes for each material
    const earthMesh = new THREE.Mesh(geometry, material);
    const lightsMesh = new THREE.Mesh(geometry, lightsMat);
    const cloudsMesh = new THREE.Mesh(geometry, cloudsMat);
    cloudsMesh.scale.setScalar(1.004);
    const glowMesh = new THREE.Mesh(geometry, fresnelMat);
    glowMesh.scale.setScalar(1.01);

    // add shadows to earthMesh
    earthMesh.castShadow = true;
    earthMesh.receiveShadow = true;


    // add elements to earthGroup in order
    earthGroup.add(earthMesh);            // earthGroup.children[0] 
    earthGroup.add(lightsMesh);           // earthGroup.children[1]
    earthGroup.add(cloudsMesh);           // earthGroup.children[2]
    earthGroup.add(glowMesh);             // earthGroup.children[3]


    // scale earth group
    earthGroup.scale.setScalar(0.3);

    return earthGroup;
}

export { earthBuilder };