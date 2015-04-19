/*
  Adds explanatory textures to all sides of a cube.
*/

'use strict';

function create(size){
  let
    container = new THREE.Object3D(),
    material, geometry, plane,
    halfSize = size/2;


  // x left
  let canvas1 = document.createElement('canvas');
  let context1 = canvas1.getContext('2d');
  canvas1.width = 1024;
  canvas1.height = 1024;
  context1.font = 'Bold 40px Arial';
  context1.rect(0, 0, 1024, 1024);
  context1.fillStyle = 'rgba(255, 0, 0, 0.3)';
  context1.fill();
  context1.fillStyle = 'rgb(0, 0, 0)';
  context1.fillText('X negative', 512, 512);

  let texture1 = new THREE.Texture(canvas1);
  texture1.needsUpdate = true;

  material = new THREE.MeshBasicMaterial({map: texture1, side: THREE.DoubleSide, transparent: true});
  geometry = new THREE.PlaneBufferGeometry(size, size, 40, 40);
  plane = new THREE.Mesh(geometry, material);
  plane.position.set(-halfSize, 0, 0);
  plane.rotation.set(0, Math.PI/2, 0);
  container.add(plane);


  // x right
  let canvas2 = document.createElement('canvas');
  let context2 = canvas2.getContext('2d');
  canvas2.width = 1024;
  canvas2.height = 1024;
  context2.font = 'Bold 40px Arial';
  context2.rect(0, 0, 1024, 1024);
  context2.fillStyle = 'rgba(255, 0, 0, 0.3)';
  context2.fill();
  context2.fillStyle = 'rgb(0, 0, 0)';
  context2.fillText('X positive', 512, 512);

  let texture2 = new THREE.Texture(canvas2);
  texture2.needsUpdate = true;

  material = new THREE.MeshBasicMaterial({map: texture2, side: THREE.DoubleSide, transparent: true});
  geometry = new THREE.PlaneBufferGeometry(size, size, 40, 40);
  plane = new THREE.Mesh(geometry, material);
  plane.position.set(halfSize, 0, 0);
  plane.rotation.set(0, -Math.PI/2, 0);
  container.add(plane);


  // y top
  let canvas3 = document.createElement('canvas');
  let context3 = canvas3.getContext('2d');
  canvas3.width = 1024;
  canvas3.height = 1024;
  context3.font = 'Bold 40px Arial';
  context3.rect(0, 0, 1024, 1024);
  context3.fillStyle = 'rgba(0, 255, 0, 0.3)';
  context3.fill();
  context3.fillStyle = 'rgb(0, 0, 0)';
  context3.fillText('Y positive', 512, 512);

  let texture3 = new THREE.Texture(canvas3);
  texture3.needsUpdate = true;

  material = new THREE.MeshBasicMaterial({map: texture3, side: THREE.DoubleSide, transparent: true});
  geometry = new THREE.PlaneBufferGeometry(size, size, 40, 40);
  plane = new THREE.Mesh(geometry, material);
  plane.position.set(0, halfSize, 0);
  plane.rotation.set(Math.PI/2, 0, 0);
  container.add(plane);


  // y bottom
  let canvas4 = document.createElement('canvas');
  let context4 = canvas4.getContext('2d');
  canvas4.width = 1024;
  canvas4.height = 1024;
  context4.font = 'Bold 40px Arial';
  context4.rect(0, 0, 1024, 1024);
  context4.fillStyle = 'rgba(0, 255, 0, 0.3)';
  context4.fill();
  context4.fillStyle = 'rgb(0, 0, 0)';
  context4.fillText('Y negative', 512, 512);

  let texture4 = new THREE.Texture(canvas4);
  texture4.needsUpdate = true;

  material = new THREE.MeshBasicMaterial({map: texture4, side: THREE.DoubleSide, transparent: true});
  geometry = new THREE.PlaneBufferGeometry(size, size, 40, 40);
  plane = new THREE.Mesh(geometry, material);
  plane.position.set(0, -halfSize, 0);
  plane.rotation.set(-Math.PI/2, 0, 0);
  container.add(plane);


  // z back
  let canvas5 = document.createElement('canvas');
  let context5 = canvas5.getContext('2d');
  canvas5.width = 1024;
  canvas5.height = 1024;
  context5.font = 'Bold 40px Arial';
  context5.rect(0, 0, 1024, 1024);
  context5.fillStyle = 'rgba(0, 0, 255, 0.3)';
  context5.fill();
  context5.fillStyle = 'rgb(0, 0, 0)';
  context5.fillText('Z positive', 512, 512);

  let texture5 = new THREE.Texture(canvas5);
  texture5.needsUpdate = true;

  material = new THREE.MeshBasicMaterial({map: texture5, side: THREE.DoubleSide, transparent: true});
  geometry = new THREE.PlaneBufferGeometry(size, size, 40, 40);
  plane = new THREE.Mesh(geometry, material);
  plane.position.set(0, 0, halfSize);
  plane.rotation.set(Math.PI, 0, 0);
  container.add(plane);


  // z front
  let canvas6 = document.createElement('canvas');
  let context6 = canvas6.getContext('2d');
  canvas6.width = 1024;
  canvas6.height = 1024;
  context6.font = 'Bold 40px Arial';
  context6.rect(0, 0, 1024, 1024);
  context6.fillStyle = 'rgba(0, 0, 255, 0.3)';
  context6.fill();
  context6.fillStyle = 'rgb(0, 0, 0)';
  context6.fillText('Z negative', 512, 512);

  let texture6 = new THREE.Texture(canvas6);
  texture6.needsUpdate = true;

  material = new THREE.MeshBasicMaterial({map: texture6, side: THREE.DoubleSide, transparent: true});
  geometry = new THREE.PlaneBufferGeometry(size, size, 40, 40);
  plane = new THREE.Mesh(geometry, material);
  plane.position.set(0, 0, -halfSize);
  plane.rotation.set(0, 0, 0);
  container.add(plane);

  return container;
}


export default create;