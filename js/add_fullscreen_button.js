
let fullscreenElement;
let button;

function init(b, e){
  button = b;
  fullscreenElement = e;
  button.style.visibility = 'visible';
  button.addEventListener('click', fullscreen, false);
}


function fullscreen(){
  if(!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement){
    button.style.visibility = 'hidden';
    if(fullscreenElement.requestFullscreen){
      fullscreenElement.requestFullscreen();
    }else if(fullscreenElement.msRequestFullscreen){
      fullscreenElement.msRequestFullscreen();
    }else if(fullscreenElement.mozRequestFullScreen){
      fullscreenElement.mozRequestFullScreen();
    }else if(fullscreenElement.webkitRequestFullscreen){
      fullscreenElement.webkitRequestFullscreen();
    }
  }else{
    button.style.visibility = 'visible';
    if(document.exitFullscreen){
      document.exitFullscreen();
    }else if(document.msExitFullscreen){
      document.msExitFullscreen();
    }else if(document.mozExitFullScreen){
      document.mozExitFullScreen();
    }else if(document.webkitExitFullscreen){
      document.webkitExitFullscreen();
    }
  }
}


export default init;