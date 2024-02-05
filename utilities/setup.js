/**
 * Creates a basic scene and returns necessary objects
 * to manipulate the scene, camera and render context.
 */
import * as THREE from 'three';
import getStars from "../utilities/getStars.js";
import { OrbitControls } from 'jsm/controls/OrbitControls.js';
import { OBJLoader } from 'jsm/loaders/OBJLoader.js';
import { GLTFLoader } from 'jsm/loaders/GLTFLoader.js';

function setup() {
    // Check WebGL Version
    // if (!WEBGL.isWebGL2Available()) {
    //     document.body.appendChild(WEBGL.getWebGL2ErrorMessage());
    // }

    // Create a scene
    const w = window.innerWidth;
    const h = window.innerHeight;
    const scene = new THREE.Scene();

    // Create a camera
    const camera = new THREE.PerspectiveCamera(75, w/h, 0.1, 1000);
    camera.position.z = 5;

    // Create a renderer
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(w, h);
    document.body.appendChild(renderer.domElement);

    // Setup orbit controls for the camera.
    new OrbitControls(camera, renderer.domElement);

    // handle window resize
    function handleWindowResize () {
        let w = window.innerWidth;
        let h = window.innerHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
    }
    window.addEventListener('resize', handleWindowResize, false);

    // // Cast a weak ambient light to make the floor visible.
    // const light = new THREE.AmbientLight(0xFFFFFF, 0.3);
    // scene.add(light);

    // create stars
    const stars = getStars({numStars: 5000});
    scene.add(stars);

    return {
        renderer,
        scene,
        camera,
        stars
    };
}

/**
 * Utility function that loads obj files using THREE.OBJLoader
 * and places them in the scene using the given callback `place`.
 * 
 * The variable passed into the place callback is a THREE.Object3D.
 */
function loadAndPlaceOBJ(file, material, place) {
    const manager = new THREE.LoadingManager();
    manager.onProgress = function (item, loaded, total) {
        console.log(item, loaded, total);
    };

    const onProgress = function (xhr) {
        if (xhr.lengthComputable) {
            const percentComplete = xhr.loaded / xhr.total * 100.0;
            console.log(Math.round(percentComplete, 2) + '% downloaded');
        }
    };

    const loader = new OBJLoader(manager);
    loader.load(file, function (object) {
        object.traverse(function (child) {
            if (child instanceof THREE.Mesh) {
                child.material = material;
            }
        });
        place(object);
    }, onProgress);
}

/**
 * Utility function that loads glb files 
 */
function loadAndPlaceGLB(file, place) {
    const manager = new THREE.LoadingManager();
    manager.onProgress = function (item, loaded, total) {
        console.log(item, loaded, total);
    };

    const onProgress = function (xhr) {
        if (xhr.lengthComputable) {
            const percentComplete = xhr.loaded / xhr.total * 100.0;
            console.log(Math.round(percentComplete, 2) + '% downloaded');
        }
    };

    const loader = new GLTFLoader(manager);
    loader.load(file, function (gltf) {
        place(gltf.scene);
    }, onProgress);
}

export {setup, loadAndPlaceOBJ, loadAndPlaceGLB};
