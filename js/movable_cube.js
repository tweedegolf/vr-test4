/*
  Creates a cube whose position and rotation can be adjusted with the arrow keys and the on-screen buttons.
*/

'use strict';

import createController from './create_controls';

let
  debugCube,
  cube,
  listeners,
  doAnimate = false,
  direction;

const turnSpeed = 0.1,
  moveSpeed = 10;


function move(dir, flag){
  doAnimate = flag;
  direction = dir;
}


function animate(){
  setInterval(function(){
    if(doAnimate === true){
      update();
    }
  }, 65);
}


function update(){
  let rotation = direction === 'left' ? 1 : direction === 'right' ? -1 : 0;
  let translation = direction === 'forward' ? 1 : direction === 'backward' ? -1 : 0;

  // cube.rotation.z += rotation * turnSpeed;


  cube.rotation.z -= rotation * turnSpeed;

  debugCube.position.x -= translation * moveSpeed * Math.cos(cube.rotation.z);
  debugCube.position.y += translation * moveSpeed * Math.sin(cube.rotation.z);
  // debugCube.position.x += -translation * moveSpeed;

/*
  cube.rotation.z = -debugCube.rotation.y;

  let hypo = debugCube.position.z;
  let sinA = Math.sin(cube.rotation.z + Math.PI/2);
  let cosA = Math.cos(cube.rotation.z + Math.PI/2);

  cube.position.x = cosA * hypo;
  cube.position.y = sinA * hypo;
*/
  dispatchEvent({'update': cube});
}


function addEventListener(id, cb){
  listeners[id] = cb;
}


function removeEventListener(id){
  delete listeners[id];
}


function dispatchEvent(event){
  for(let key of Object.getOwnPropertyNames(listeners)){
    listeners[key](event);
  }
}


function create(s, withOnScreenButtons = true, size = 20){
  debugCube = s;
  listeners = {};
  cube = new THREE.Mesh(
    new THREE.BoxGeometry(size, size, size),
    new THREE.MeshBasicMaterial({side:THREE.DoubleSide, color: 0xfff000})
  );
  cube.name = 'burgler';
  cube.position.z = size/2;
  // add direction arrow to cube
  cube.add(createArrow(size));

  cube.add(debugCube);

  animate();
  let me = {
    mesh: cube,
    move: move,
    update: update,
    addEventListener: addEventListener,
    removeEventListener: removeEventListener
  };
  createController(me, withOnScreenButtons);
  return me;
}


function createArrow(size){

  let canvas = document.createElement('canvas');
  let context = canvas.getContext('2d');

  let textureSize = 128;
  let halfTextureSize = textureSize/2;
  let margin = 0.1 * textureSize;
  let stemWidth = 0.4 * textureSize;
  let stemHeight = 0.4 * textureSize;
  let arrowHeadHeight = 0.4 * textureSize;

  canvas.width = textureSize;
  canvas.height = textureSize;
  context.rect(0, 0, textureSize, textureSize);
  context.fillStyle = 'rgb(255, 255, 0)';
  context.fill();
  context.fillStyle = 'rgb(0, 0, 0)';
  //context.strokeStyle = '#000000';
  context.beginPath();
  context.moveTo(halfTextureSize, margin);
  context.lineTo(textureSize - margin, margin + arrowHeadHeight);
  context.lineTo(halfTextureSize + stemWidth/2, margin + arrowHeadHeight);
  context.lineTo(halfTextureSize + stemWidth/2, textureSize - margin - stemHeight);
  context.lineTo(halfTextureSize + stemWidth/2, textureSize - margin);
  context.lineTo(halfTextureSize - stemWidth/2, textureSize - margin);
  context.lineTo(halfTextureSize - stemWidth/2, arrowHeadHeight + margin);
  context.lineTo(margin, arrowHeadHeight + margin);
  context.lineTo(halfTextureSize, margin);
  //context.stroke();
  context.fill();

  let texture = new THREE.Texture(canvas);
  texture.needsUpdate = true;

  let material = new THREE.MeshBasicMaterial({map: texture, side: THREE.DoubleSide});
  let geometry = new THREE.PlaneBufferGeometry(size, size, 10, 10);
  let plane = new THREE.Mesh(geometry, material);
  plane.position.z = (size/2) + 0.1; // place the plane a bit above the cube so we don't get rendering issues
  plane.rotation.z = -Math.PI/2; // rotate 90 degrees clockwise so arrow points in direction of the positive x-axis

  return plane;
}


export default create;