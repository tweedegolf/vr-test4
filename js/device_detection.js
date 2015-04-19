/*
  Detects the browser and the OS of the device and checks if there are any HDM devices connected.
*/

'use strict';


function executor(onFulfilled, onRejected){
  let
    ua = navigator.userAgent,
    system = 'undetected',
    browser = 'undetected',
    deviceData;

  if(ua === undefined){
    onRejected('not running in a browser');
  }

  if(ua.match(/(iPad|iPhone|iPod)/g)){
    system = 'ios';
  }else if(ua.indexOf('Android') !== -1){
    system = 'android';
  }else if(ua.indexOf('Linux') !== -1){
    system = 'linux';
  }else if(ua.indexOf('Macintosh') !== -1){
    system = 'osx';
  }else if(ua.indexOf('Windows') !== -1){
    system = 'windows';
  }

  if(ua.indexOf('Chrome') !== -1){
    // chrome, chromium and canary
    browser = 'chrome';

    if(ua.indexOf('OPR') !== -1){
      browser = 'opera';
    }else if(ua.indexOf('Chromium') !== -1){
      browser = 'chromium';
    }
  }else if(ua.indexOf('Safari') !== -1){
    browser = 'safari';
  }else if(ua.indexOf('Firefox') !== -1){
    browser = 'firefox';
  }else if(ua.indexOf('Trident') !== -1){
    browser = 'Internet Explorer';
  }

  if(system === 'ios'){
    if(ua.indexOf('CriOS') !== -1){
      browser = 'chrome';
    }
  }


  deviceData = {
    system: system,
    browser: browser,
    isMobile: system === 'ios' || system === 'android',
    webVR: navigator.getVRDevices !== undefined
  };

  onFulfilled(deviceData);

/*
  // check if a HMD is connected
  if(navigator.mozGetVRDevices || navigator.getVRDevices){
    deviceData.vrEnabled = true;
    if(navigator.getVRDevices){
      navigator.getVRDevices().then(
        function onFulFilled(data){
          deviceData.vrDevices = data;
          onFulfilled(deviceData);
        }
      );
    }else{
      navigator.mozGetVRDevices(
        function callback(data){
          deviceData.vrDevices = data;
          onFulfilled(deviceData);
        }
      );
    }
  }else{
    onFulfilled(deviceData);
  }
*/
}


export default function(){
  return new Promise(executor);
}