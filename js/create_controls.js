/*
  Controls the movement and the rotation of the specified object: captures key and button events and dispatches
  them on to the registered listeners.
*/

'use strict';

const directions = {
  37: 'left',
  38: 'forward',
  39: 'right',
  40: 'backward'
};

// Safari iOS has issues with Map!
//let listeners = new Map();
let listeners = {};
let dispatch;
let rotation = 0;
let translation = 0;

function createControls(){

  window.addEventListener('keydown', function(e){
    e.preventDefault();
    createEvent({'direction': directions[e.which], 'animate': true});
  }, false);


  window.addEventListener('keyup', function(e){
    e.preventDefault();
    createEvent({'direction': directions[e.which], 'animate': false});
  }, false);

  let buttons = new Map();
  buttons.set('forward', document.getElementById('forward'));
  buttons.set('backward', document.getElementById('backward'));
  buttons.set('left', document.getElementById('left'));
  buttons.set('right', document.getElementById('right'));

  for(let key in directions){
    let direction = directions[key];
    let button = buttons.get(direction);
    if(button){
      initButton(button, direction);
    }
  }

  return {
    addEventListener: function(id, cb){
      listeners[id] = cb;
      //listeners.set(id, cb);
    },

    removeEventListener: function(id){
      delete listeners[id];
      //listeners.delete(id);
    },

    onChange: function(callback){
      this.addEventListener('cb', callback);
    },

    showButtons: function(...ids){
      ids.forEach(function(id){
        buttons.get(id).style.visibility = 'visible';
      });
    },

    hideButtons: function(...ids){
      ids.forEach(function(id){
        buttons.get(id).style.visibility = 'hidden';
      });
    }
  };
}


function initButton(button, direction){
  button.addEventListener('mousedown', function(){
    createEvent({'direction': direction, 'animate': true});
  }, false);

  button.addEventListener('touchstart', function(){
    createEvent({'direction': direction, 'animate': true});
  }, false);

  button.addEventListener('mouseup', function(){
    createEvent({'direction': direction, 'animate': false});
  }, false);

  button.addEventListener('touchend', function(){
    createEvent({'direction': direction, 'animate': false});
  }, false);
}


function createEvent(e){
  let direction = e.direction;

  if(e.animate === false){
    if(direction === 'left' || direction === 'right'){
      rotation = 0;
    }else if(direction === 'forward' || direction === 'backward'){
      translation = 0;
    }
  }else{
    rotation = direction === 'left' ? 1 : direction === 'right' ? -1 : rotation;
    translation = direction === 'forward' ? 1 : direction === 'backward' ? -1 : translation;
  }


  if((rotation !== 0 || translation !== 0) && dispatch === undefined){
    dispatch = setInterval(() => {
      if(dispatch !== undefined){
        dispatchEvent(getEvent());
      }
    }, 10);
  }else if((rotation === 0 && translation === 0) && dispatch !== undefined){
    clearInterval(dispatch);
    dispatch = undefined;
  }
}

function getEvent(){
  return {
    rotation: rotation,
    translation: translation
  };
}


function dispatchEvent(event){
  // for(let listener of listeners.values()){
  //   listener(event);
  // }
  Object.keys(listeners).forEach(function(id){
    listeners[id](event);
  });
}


export default createControls;
