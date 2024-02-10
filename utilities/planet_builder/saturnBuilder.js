import * as THREE from 'three';
import { getFresnelMat } from '../getFresnelMat.js';

function saturnBuilder() { // TODO: work in progress

    // Create a saturn Group model and add elements of the saturn to it
    const saturnGroup = new THREE.Group();
    const axial_tilt = 26.73 * Math.PI / 180;
    saturnGroup.rotation.z = axial_tilt;
    const detail = 12; // changes number of edges on the sphere
    const loader = new THREE.TextureLoader();

    // create the saturn geometry
    const geometry = new THREE.IcosahedronGeometry(1, detail);

    // Saturn ring geometry
    const ringGeometry = new THREE.RingGeometry(1.2, 2, 64);




    const vs = `
    varying vec2 vUv;

    void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }`;

    const fs = `uniform sampler2D texture;
    varying vec2 vUv;

    void main() {
        float aspect = 2.0; // Aspect ratio of the texture
        vec2 uv = vUv * vec2(aspect, 1.0) + vec2(0.5 - 0.5 * aspect, 0.0);
        vec4 color = texture2D(texture, uv);
        gl_FragColor = color;
    }`;



    // describe materials to make up the saturn

    // saturn texture
    const material = new THREE.MeshPhongMaterial({
    map: loader.load("../textures/saturnmap.jpg"),
    });

    // Saturn ring texture
    const ringMaterial = new THREE.ShaderMaterial({
        uniforms: {
            texture: { value: loader.load("../textures/saturnringcolor.jpg") }
        },
        vertexShader: vs,
        fragmentShader: fs,
        side: THREE.DoubleSide,
        transparent: true,
    });

    // // create atmospheric glow
    const fresnelMat = getFresnelMat(0xf5e3b3, 0x000000);




    // create meshes for each material
    const saturnMesh = new THREE.Mesh(geometry, material);
    const ringMesh = new THREE.Mesh(ringGeometry, ringMaterial);
    ringMesh.rotation.x = Math.PI / 2; // Rotate the ring to be parallel to the x-z plane
    const glowMesh = new THREE.Mesh(geometry, fresnelMat);
    glowMesh.scale.setScalar(1.01);



    // add elements to earthGroup in order
    saturnGroup.add(saturnMesh);            // earthGroup.children[0] 
    saturnGroup.add(ringMesh);            // earthGroup.children[1]
    saturnGroup.add(glowMesh);             // earthGroup.children[2]


    // scale earth group
    saturnGroup.scale.setScalar(1.1);

    return saturnGroup;
}

export { saturnBuilder };