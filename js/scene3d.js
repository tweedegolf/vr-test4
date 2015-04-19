/*
  Creates a 3D scene and sets the right renderer and controls dependent on the device.
*/

'use strict';

import createDebugAxes from './debug_axes_3d';
import createDebugCube from './debug_cube';
import createControls from './create_controls';
import createWorld from './create_world';
import createArrow from './create_arrow';
import addExtraCameraControls from './add_extra_camera_controls';


const turnSpeed = 0.01;
const moveSpeed = 1;

let divContainer, divOutput, divOutput2, body;
let camera, scene, element;
let renderer, controls, keyControls;
let pivot, world;
let mRound = Math.round;
let mPow = Math.pow;
let radToDeg = THREE.Math.radToDeg;


function init() {
  body = document.body;
  // divOutput = document.getElementById('output');
  // divOutput2 = document.getElementById('output2');
  divContainer = document.getElementById('canvas3d');

  renderer = new THREE.WebGLRenderer({autoClear:true});
  renderer.setClearColor(0xffffff, 1);
  element = renderer.domElement;
  divContainer.appendChild(element);

  scene = new THREE.Scene();
  //scene.rotation.z -= Math.PI/2;
  //scene.rotation.x -= Math.PI/2;

  camera = new THREE.PerspectiveCamera(50, 1, 1, 3000); // correct aspect of camera is set in resize method, see below
  //scene.add(camera);
  camera.position.z = 500;
  camera.position.x = 100;
  camera.position.y = 200;
  camera.lookAt(new THREE.Vector3(0,0,0));

  let container = new THREE.Object3D();
  container.rotation.z += Math.PI/2;
  container.rotation.x -= Math.PI/2;

  pivot = new THREE.Mesh(new THREE.BoxGeometry(10, 10, 100), new THREE.MeshNormalMaterial());
  pivot.position.set(0, 0, 50);
  container.add(pivot);

  //world = new THREE.Mesh(new THREE.PlaneGeometry(200, 200, 20, 20), new THREE.MeshBasicMaterial({wireframe:true, color: 0x000000}));
  world = createArrow(200);
  world.position.z = 50;
  pivot.add(world);

  scene.add(container);

  let light = new THREE.HemisphereLight(0x777777, 0x000000, 0.6);
  scene.add(light);

  window.addEventListener('resize', resize, false);
  //scene.add(createDebugCube(3000));
  scene.add(createDebugAxes(1000));

  keyControls = createControls();
  keyControls.onChange(onKeyControllerChange);

  // connect html range elements to camera's x and z rotation
  //addExtraCameraControls(camera, render, document.getElementById('tilt'), document.getElementById('rotation'));

  controls = {
    update:function(){}
  };
  //controls = new THREE.OrbitControls(camera);
/*
  let button =  document.getElementById('fullscreen');
  button.style.visibility = 'visible';
  button.onclick = function(){
    renderer.setFullScreen(true);
  };
  vrRenderLoop();
*/

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


function vrRenderLoop(){
  controls.update();

  // divOutput.innerHTML  = `x: ${round(radToDeg(camera.quaternion.x))} `;
  // divOutput.innerHTML += `y: ${round(radToDeg(camera.quaternion.y))} `;
  // divOutput.innerHTML += `z: ${round(radToDeg(camera.quaternion.z))} `;
  // divOutput.innerHTML += `w: ${round(radToDeg(camera.quaternion.w))}`;

  render();
  requestAnimationFrame(vrRenderLoop);
}


function render(){
  renderer.render(scene, camera);
}


function round(value, precision){
  precision = precision || 1;
  precision = mPow(10, precision);
  return mRound(value * precision)/precision;
}


export default {
  init:init
};