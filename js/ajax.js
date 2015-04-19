/*
  Ajax request wrapped in a Promise
*/

'use strict';

function ajax(config){
  let
    request = new XMLHttpRequest(),
    method = config.method === undefined ? 'GET' : config.method,
    fileSize;

  function executor(resolve, reject){

    reject = reject || function(){};
    resolve = resolve || function(){};

    request.onload = function(){
      if(request.status !== 200){
        reject(request.status);
        return;
      }

      fileSize = request.response.length;

      if(config.responseType === 'json'){
        resolve(JSON.parse(request.response), fileSize);
      }else{
        resolve(request.response, fileSize);
      }
      request = null;
    };

    request.onerror = function(e){
      reject(e);
    };

    request.open(method, config.url, true);

    if(config.overrideMimeType){
      request.overrideMimeType(config.overrideMimeType);
    }

    if(config.responseType){
      if(config.responseType === 'json'){
        // responseType json is not supported on iOS
        request.responseType = 'text';
      }else{
        request.responseType = config.responseType;
      }
    }

    if(method === 'POST') {
      request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    }

    if(config.data){
       request.send(config.data);
    }else{
       request.send();
    }
  }

  return new Promise(executor);
}

export default ajax;