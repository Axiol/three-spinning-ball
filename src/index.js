import * as THREE from 'three';
import * as dat from 'dat.gui';

/** Build the scene. */
const canvas = document.querySelector('#canvas');
const scene = new THREE.Scene();
const textureLoader = new THREE.TextureLoader();
const gui = new dat.GUI();

/** Create the sphere. */
const gemoetry = new THREE.SphereBufferGeometry(.5, 64, 64);
const material = new THREE.MeshStandardMaterial({
  metalness: 0.7,
  roughness: 0.2,
  normalMap: textureLoader.load('/texture/normalMap.png'),
  color: new THREE.Color(0x292929)
});
const sphere = new THREE.Mesh(gemoetry, material);
scene.add(sphere);

/** Add some light. */
const pointLight1 = new THREE.PointLight(0xffffff, 0.1);
pointLight1.position.set(2, 3, 4);
scene.add(pointLight1);
const pointLight2 = new THREE.PointLight(0xff0000, 10);
pointLight2.position.set(-1.85, 1, -1.65);
scene.add(pointLight2);
const pointLight3 = new THREE.PointLight(0xe1ff, 7);
pointLight3.position.set(2.1, -3, -2);
scene.add(pointLight3);

const guiLight1 = gui.addFolder('Light 1');
guiLight1.add(pointLight1.position, 'x').min(-6).max(6).step(.01);
guiLight1.add(pointLight1.position, 'y').min(-3).max(3).step(.01);
guiLight1.add(pointLight1.position, 'z').min(-3).max(3).step(.01);
guiLight1.add(pointLight1, 'intensity').min(0).max(10).step(.01);
const light1Color = {color: 0xffffff};
guiLight1.addColor(light1Color, 'color').onChange(() => {
  pointLight1.color.set(light1Color.color);
});
const guiLight2 = gui.addFolder('Light 2');
guiLight2.add(pointLight2.position, 'x').min(-6).max(6).step(.01);
guiLight2.add(pointLight2.position, 'y').min(-3).max(3).step(.01);
guiLight2.add(pointLight2.position, 'z').min(-3).max(3).step(.01);
guiLight2.add(pointLight2, 'intensity').min(0).max(10).step(.01);
const light2Color = {color: 0xff0000};
guiLight2.addColor(light2Color, 'color').onChange(() => {
  pointLight2.color.set(light2Color.color);
});
const guiLight3 = gui.addFolder('Light 3');
guiLight3.add(pointLight3.position, 'x').min(-6).max(6).step(.01);
guiLight3.add(pointLight3.position, 'y').min(-3).max(3).step(.01);
guiLight3.add(pointLight3.position, 'z').min(-3).max(3).step(.01);
guiLight3.add(pointLight3, 'intensity').min(0).max(10).step(.01);
const light3Color = {color: 0xe1ff};
guiLight3.addColor(light3Color, 'color').onChange(() => {
  pointLight3.color.set(light3Color.color);
});

/** Set the sizes based on the window size. */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
};

window.addEventListener('resize', () => {
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()

  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
});

/** Place the camera. */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 2;
scene.add(camera);

/** Render the scene. */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/** Animate the sphere. */
let mouseX = 0,
    mouseY = 0,
    targetX = 0,
    targetY = 0;
const windowHalfX = window.innerWidth / 2,
      windowHalfY = window.innerHeight / 2;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX - windowHalfX;
  mouseY = e.clientY - windowHalfY;
});

window.addEventListener('scroll', (e) => {
  sphere.position.y = window.scrollY * .001;
});

const clock = new THREE.Clock();
const tick = () => {
  targetX = mouseX * .001;
  targetY = mouseY * .001;

  const elapsedTime = clock.getElapsedTime();

  sphere.rotation.y = .25 * elapsedTime;
  sphere.rotation.x += .05 * (targetY - sphere.rotation.x);
  sphere.rotation.y += .5 * (targetX - sphere.rotation.y);
  sphere.position.z += -.05 * (targetY - sphere.rotation.x);

  renderer.render(scene, camera);

  window.requestAnimationFrame(tick);
};
tick();