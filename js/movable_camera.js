/*
  Creates a camera whose position and rotation can be adjusted with the arrow keys and the on-screen buttons.
*/

'use strict';

import createController from './create_controls';

let camera,
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
  //let rotation = direction === 'left' ? 1 : direction === 'right' ? -1 : 0;
  let translation = direction === 'forward' ? 1 : direction === 'backward' ? -1 : 0;

  //camera.rotation.z += rotation * turnSpeed;
  camera.position.x += translation * moveSpeed * Math.cos(camera.rotation.y + Math.PI/2);
  camera.position.z -= translation * moveSpeed * Math.sin(camera.rotation.y + Math.PI/2);

  dispatchEvent({'update': camera});
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


function create(cam, withOnScreenButtons){
  camera = cam;
  listeners = {};

  animate();

  let me = {
    mesh: camera,
    move: move,
    update: update,
    addEventListener: addEventListener,
    removeEventListener: removeEventListener
  };

  createController(me, withOnScreenButtons);
  return me;
}


export default create;