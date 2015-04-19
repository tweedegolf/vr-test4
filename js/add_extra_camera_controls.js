

function init(camera, render, tiltSlider, rotationSlider){
  tiltSlider.style.visibility = 'visible';
  rotationSlider.style.visibility = 'visible';

  let tilt = function(){
    camera.rotation.x = THREE.Math.degToRad(this.value);
    render();
  };

  tiltSlider.addEventListener('mousedown', function(){
    tiltSlider.addEventListener('mousemove', tilt, false);
  }, false);

  tiltSlider.addEventListener('mouseup', function(){
    tiltSlider.removeEventListener('mousemove', tilt, false);
  }, false);

  tiltSlider.addEventListener('touchstart', function(){
    tiltSlider.addEventListener('touchmove', tilt, false);
  }, false);

  tiltSlider.addEventListener('touchend', function(){
    tiltSlider.removeEventListener('touchmove', tilt, false);
  }, false);

  let rotate = function(){
    camera.rotation.y = THREE.Math.degToRad(-this.value);
    render();
  };

  rotationSlider.addEventListener('mousedown', function(){
    rotationSlider.addEventListener('mousemove', rotate, false);
  }, false);

  rotationSlider.addEventListener('mouseup', function(){
    rotationSlider.removeEventListener('mousemove', rotate, false);
  }, false);

  rotationSlider.addEventListener('touchstart', function(){
    rotationSlider.addEventListener('touchmove', rotate, false);
  }, false);

  rotationSlider.addEventListener('touchend', function(){
    rotationSlider.removeEventListener('touchmove', rotate, false);
  }, false);
}

export default init;