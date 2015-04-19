/*
  Creates a 3D scene and sets the right renderer and controls dependent on the device.
*/

'use strict';

import createDebugAxes from './debug_axes_3d';
import createDebugCube from './debug_cube';
import createControls from './create_controls';


const turnSpeed = 0.01;
const moveSpeed = 1;

let divContainer, body;
let camera, scene, element;
let renderer, controls, keyControls;
let pivot, world;


function init() {
  body = document.body;
  divContainer = document.getElementById('canvas3d');

  renderer = new THREE.WebGLRenderer({autoClear:true});
  renderer.setClearColor(0xffffff, 1);
  element = renderer.domElement;
  divContainer.appendChild(element);

  scene = new THREE.Scene();
  scene.rotation.z -= Math.PI/2;
  scene.rotation.x -= Math.PI/2;

  camera = new THREE.PerspectiveCamera(50, 1, 1, 3000); // correct aspect of camera is set in resize method, see below
  camera.position.z = 500;
  camera.position.x = 100;
  camera.position.y = 200;
  camera.lookAt(new THREE.Vector3(0,0,0));


  pivot = new THREE.Mesh(new THREE.BoxGeometry(10, 10, 100), new THREE.MeshNormalMaterial());
  pivot.position.set(0, 0, 50);
  scene.add(pivot);

  world = new THREE.Mesh(new THREE.PlaneGeometry(200, 200, 20, 20), new THREE.MeshBasicMaterial({wireframe:true, color: 0x000000}));
  world.position.z = 50;
  pivot.add(world);

  let light = new THREE.HemisphereLight(0x777777, 0x000000, 0.6);
  scene.add(light);

  window.addEventListener('resize', resize, false);
  //scene.add(createDebugCube(3000));
  scene.add(createDebugAxes(1000));

  keyControls = createControls();
  keyControls.onChange(onKeyControllerChange);


  controls = new THREE.OrbitControls(camera);
  controls.keys = {};
  controls.addEventListener('change', function(){
    render();
  });
  resize();
}


// called when arrow keys are used to navigate through the scene
function onKeyControllerChange(data){
  if(data.rotation !== 0){
    // invert rotation because we are rotating the world, not the camera
    pivot.rotation.z -= data.rotation * turnSpeed;
  }
  if(data.translation !== 0){
    // invert translation on the x-axis because the world moves backwards towards the camera if the user moves forward
    world.position.x -= data.translation * moveSpeed * Math.cos(pivot.rotation.z);
    world.position.y += data.translation * moveSpeed * Math.sin(pivot.rotation.z);
  }
  render();
}


function resize() {
  let width = divContainer.offsetWidth;
  let height = divContainer.offsetHeight;
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
  render();
}


function render(){
  renderer.render(scene, camera);
}


export default {
  init:init
};