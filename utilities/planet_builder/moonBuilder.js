import * as THREE from 'three';

function moonBuilder() {
    // TODO: work in progress
    const geometry = new THREE.SphereGeometry(0.5, 32, 32);
    const material = new THREE.MeshPhongMaterial({
        color: 0x888888,
        emissive: 0x222222,
        specular: 0x222222,
        shininess: 20
    });
    const moon = new THREE.Mesh(geometry, material);
    moon.position.set(1.5, 0, 0);
    moon.receiveShadow = true;
    moon.castShadow = true;
    return moon;
}

export { earthBuilder };