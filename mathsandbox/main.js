import './style.css'

import * as THREE from 'three'
import { Color } from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGL1Renderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render(scene, camera);

const geometry = new THREE.TorusGeometry(10, 3, 16,  100)
const material = new THREE.MeshStandardMaterial({color: 0xff6347});
const torus = new THREE.Mesh(geometry, material);

scene.add(torus)

// Adding light to the scene
const pointLight  = new THREE.PointLight(0xffffff);
pointLight.position.set(20,20,20);
scene.add(pointLight);

//const ambientLight  = new THREE.AmbientLight(0xffffff);
//scene.add(ambientLight);

const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(lightHelper, gridHelper);

const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({color: 0xffffff});
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
  
  star.position.set(x, y, z);
  scene.add(star);
}
Array(200).fill().forEach(addStar);

const spaceTexture = new THREE.TextureLoader().load('space.jpg');
const normalTexture = new THREE.TextureLoader().load('normal.jpg');
//scene.background = spaceTexture;
 
// Projecting 2d points in a 3d shape (texture mapping)

const spaceball = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: spaceTexture,
    normalMap: normalTexture,
  })
);

scene.add(spaceball);


// We need to rerender the scene every time
// so we use a function to perform recursive
// animation. It's like a game loop
function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.0051;
  torus.rotation.z += 0.01;

  controls.update();

  renderer.render(scene, camera);
}
 animate()