import * as THREE from 'three';
import { getFresnelMat } from '../getFresnelMat.js';

function sunBuilder() {

    // Create a sun Group model and add elements of the sun to it
    const sunGroup = new THREE.Group();
    const axial_tilt = 6 * Math.PI / 180; // approx 6 degrees off the planatal plane
    sunGroup.rotation.z = axial_tilt;
    const detail = 12; // changes number of edges on the sphere
    const loader = new THREE.TextureLoader();

    // create the round planet geometry
    const geometry = new THREE.IcosahedronGeometry(1, detail);


    // describe materials to make up the sun

    // sun texture
    const material = new THREE.MeshPhongMaterial({
        map: loader.load("../textures/sunmap.jpg"),
        emissive: new THREE.Color(0xffffff), // Set the emissive color to white or any other bright color
        emissiveIntensity: 0.05, // Increase the emissive intensity to make the rings brighter
    });

    // // create atmospheric glow
    const fresnelMat = getFresnelMat(0xebb515, 0xebb515);




    // create meshes for each material
    const sunMesh = new THREE.Mesh(geometry, material);
    sunMesh.castShadow = false;
    sunMesh.receiveShadow = false;

    const glowMesh = new THREE.Mesh(geometry, fresnelMat);
    glowMesh.castShadow = false;
    glowMesh.receiveShadow = false;
    glowMesh.scale.setScalar(1.01);



    // add elements to earthGroup in order
    sunGroup.add(sunMesh);           // sunGroup.children[0] 
    sunGroup.add(glowMesh);          // sunGroup.children[1]

    // Hemisphere light to simulate ambient lighting
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 1);
    sunGroup.add(hemiLight);


    // scale earth group
    sunGroup.scale.setScalar(1.6);

    return sunGroup;
}

export { sunBuilder };