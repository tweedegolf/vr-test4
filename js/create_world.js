/*
  Creates a simple world that consists of a floor and some boxes
*/

function create(){
  // create a floor / ground
  let material = new THREE.MeshBasicMaterial({wireframe:true, color: 0x000000});
  let geometry = new THREE.PlaneGeometry(800, 800, 40, 40);
  let floor = new THREE.Mesh(geometry, material);

  // add some boxes
  let box1 = new THREE.Mesh(new THREE.BoxGeometry(50, 50, 50), new THREE.MeshNormalMaterial());
  box1.position.set(-280, -280, 25);
  floor.add(box1);

  let box2 = new THREE.Mesh(new THREE.BoxGeometry(10, 20, 200), new THREE.MeshNormalMaterial());
  box2.position.set(280, -280, 100);
  floor.add(box2);

  let box3 = new THREE.Mesh(new THREE.BoxGeometry(10, 100, 20), new THREE.MeshNormalMaterial());
  box3.position.set(180, 180, 10);
  floor.add(box3);

  let box4 = new THREE.Mesh(new THREE.BoxGeometry(4, 4, 100), new THREE.MeshNormalMaterial());
  box4.position.set(0, 0, 50);
  floor.add(box4);

  return floor;
}

export default create;
