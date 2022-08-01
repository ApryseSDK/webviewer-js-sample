// promise polyfill for IE11
if (typeof Promise !== "function") {
  (function(t){function z(){for(var a=0;a<g.length;a++)g[a][0](g[a][1]);g=[];m=!1}function n(a,b){g.push([a,b]);m||(m=!0,A(z,0))}function B(a,b){function c(a){p(b,a)}function h(a){k(b,a)}try{a(c,h)}catch(d){h(d)}}function u(a){var b=a.owner,c=b.state_,b=b.data_,h=a[c];a=a.then;if("function"===typeof h){c=l;try{b=h(b)}catch(d){k(a,d)}}v(a,b)||(c===l&&p(a,b),c===q&&k(a,b))}function v(a,b){var c;try{if(a===b)throw new TypeError("A promises callback cannot return that same promise.");if(b&&("function"===
typeof b||"object"===typeof b)){var h=b.then;if("function"===typeof h)return h.call(b,function(d){c||(c=!0,b!==d?p(a,d):w(a,d))},function(b){c||(c=!0,k(a,b))}),!0}}catch(d){return c||k(a,d),!0}return!1}function p(a,b){a!==b&&v(a,b)||w(a,b)}function w(a,b){a.state_===r&&(a.state_=x,a.data_=b,n(C,a))}function k(a,b){a.state_===r&&(a.state_=x,a.data_=b,n(D,a))}function y(a){var b=a.then_;a.then_=void 0;for(a=0;a<b.length;a++)u(b[a])}function C(a){a.state_=l;y(a)}function D(a){a.state_=q;y(a)}function e(a){if("function"!==
typeof a)throw new TypeError("Promise constructor takes a function argument");if(!1===this instanceof e)throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");this.then_=[];B(a,this)}var f=t.Promise,s=f&&"resolve"in f&&"reject"in f&&"all"in f&&"race"in f&&function(){var a;new f(function(b){a=b});return"function"===typeof a}();"undefined"!==typeof exports&&exports?(exports.Promise=s?f:e,exports.Polyfill=e):"function"==
typeof define&&define.amd?define(function(){return s?f:e}):s||(t.Promise=e);var r="pending",x="sealed",l="fulfilled",q="rejected",E=function(){},A="undefined"!==typeof setImmediate?setImmediate:setTimeout,g=[],m;e.prototype={constructor:e,state_:r,then_:null,data_:void 0,then:function(a,b){var c={owner:this,then:new this.constructor(E),fulfilled:a,rejected:b};this.state_===l||this.state_===q?n(u,c):this.then_.push(c);return c.then},"catch":function(a){return this.then(null,a)}};e.all=function(a){if("[object Array]"!==
Object.prototype.toString.call(a))throw new TypeError("You must pass an array to Promise.all().");return new this(function(b,c){function h(a){e++;return function(c){d[a]=c;--e||b(d)}}for(var d=[],e=0,f=0,g;f<a.length;f++)(g=a[f])&&"function"===typeof g.then?g.then(h(f),c):d[f]=g;e||b(d)})};e.race=function(a){if("[object Array]"!==Object.prototype.toString.call(a))throw new TypeError("You must pass an array to Promise.race().");return new this(function(b,c){for(var e=0,d;e<a.length;e++)(d=a[e])&&"function"===
typeof d.then?d.then(b,c):b(d)})};e.resolve=function(a){return a&&"object"===typeof a&&a.constructor===this?a:new this(function(b){b(a)})};e.reject=function(a){return new this(function(b,c){c(a)})}})("undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this);
}

if (!String.prototype.endsWith) {
  String.prototype.endsWith = function(suffix) {
    return this.indexOf(suffix, this.length - suffix.length) !== -1;
  };
}

if (!String.prototype.startsWith) {
  String.prototype.startsWith = function(prefix) {
    return this.indexOf(prefix) == 0;
  };
}

function makeId(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function joinPaths() {
  let lhs, rhs;
  const arr = [];
  arr[arguments.length - 1] = null;
  let i = 0;
  if (arguments.length > 0) {
    rhs = arguments[i].endsWith('/') ? arguments[i].length - 1 : arguments[i].length;
    arr[i] = arguments[i].substring(0, rhs);
  }
  for (i = 1; i < arguments.length - 1; ++i) {
    lhs = arguments[i].startsWith('/') ? 1 : 0;
    rhs = arguments[i].endsWith('/') ? arguments[i].length - 1 : arguments[i].length;
    arr[i] = arguments[i].substring(lhs, rhs);
  }
  if (arguments.length > 1) {
    lhs = arguments[i].startsWith('/') ? 1 : 0;
    arr[i] = arguments[i].substring(lhs, arguments[i].length);
  }
  return arr.join('/');
};

function getExt(fname) {
  var dotLoc = fname.lastIndexOf('.');
  if(dotLoc < 0){
    return '';
  }
  return fname.substr(dotLoc+1);
};

function uploadFileData(server, onCompletion, options) {
  var uri = joinPaths(server.serverUrl + 'AuxUpload?type=upload&bcid=' + options.bcid);
  if (options.extension) {
    uri += '&ext=' + options.extension;
  }

  const data = new FormData();
  data.append('file', options.file, options.file.name);

  const request = new XMLHttpRequest();
  request.open('POST', uri);
  request.withCredentials = true;
  return new Promise(function (resolve, reject) {
    request.onreadystatechange = function() {
      if (request.readyState === 4) {
        try {
          if (request.status === 200) {
            const resp = JSON.parse(request.responseText);
            if(resp.uri){
              resolve(onCompletion(server, resp.uri, options));
            } else {
              reject('Upload failed: ' + request.status);
            }
          }
        } catch (e) {
          reject('Unable to load PDF data: ' + e);
        }
      }
    };

    request.onprogress = function(event) {
      options.onProgress({ type: 'upload', loaded: event.loaded, total: event.total});
    };

    request.send(data);
  });
};

function fetchThumb(server, docUrl, options) {
  const request = new XMLHttpRequest();
  let url = joinPaths(server.serverUrl, 'GetThumb?uri=' + encodeURIComponent(docUrl) + '&bcid=' + options.bcid);

  if(options.extension) {
    url += '&ext=' + options.extension;
  }

  if(options.cacheKey) {
    url += '&cacheKey=' + options.cacheKey;
  }

  if (options.size) {
    url += "&size=" + options.size;
  }

  if (options.page) {
    url += "&page=" + options.page;
  }

  request.open('GET', url);
  request.withCredentials = true;

  return new Promise(function(resolve, reject) {
    request.onreadystatechange = function() {
      if (request.readyState === 4) {
        try {
          if (request.status === 200) {
            const data = JSON.parse(request.responseText);
            for (var i = 0; i < data.length; i++) {
              if(data[i].uri){
                resolve(server.serverUrl + "../" + data[i].uri + "?bcid=" + options.bcid);
              }
            }
          } else {
            reject('Unable to download thumb data: ' + request.status);
          }
        } catch (e) {
          reject('Unable to load thumb data: ' + e);
        }
      }
    };

    request.onprogress = function(evt) {
      options.onProgress({ type: 'fetch', loaded: evt.loaded, total: evt.total});
    };

    request.send();
  });
};

function fetchPdf(server, docUrl, options) {
  const request = new XMLHttpRequest();
  let url = joinPaths(server.serverUrl, 'GetPDF?uri=' + encodeURIComponent(docUrl) + '&bcid=' + options.bcid);
  if(options.pdfa) {
    url += '&pdfa=' + options.pdfa;
  }

  if (options.linearize == true) {
    url += '&linearize=true';
  }


  if (options.format) {
    url += '&fmt=' + options.format;
  }

  if(options.extension) {
    url += '&ext=' + options.extension;
  }

  if(options.cacheKey) {
    url += '&cacheKey=' + options.cacheKey;
  }

  let requestType = 'GET';
  if(options.xfdf) {
    requestType = 'POST';
  }

  request.open(requestType, url);
  if (options.customHeaders) {
    request.setRequestHeader('PDFTron-Custom', JSON.stringify(options.customHeaders));
  }

  request.withCredentials = true;

  return new Promise(function(resolve, reject) {
    request.onreadystatechange = function() {
      if (request.readyState === 4) {
        try {
          if (request.status === 200) {
            var type = request.getResponseHeader("Content-Type");
            if (type === "application/pdf") {
              resolve([request.responseText, type]);
            } else if (type === "application/json") {
              const data = JSON.parse(request.responseText);
              for (var i = 0; i < data.length; i++) {
                if(data[i].uri){
                  resolve([server.serverUrl + data[i].uri + "?bcid=" + options.bcid, type]);
                }
              }
            }
          } else {
            reject('Unable to download PDF data: ' + request.status);
          }
        } catch (e) {
          reject('Unable to load PDF data: ' + e);
        }
      }
    };

    request.onprogress = function(evt) {
      options.onProgress({ type: 'fetch', loaded: evt.loaded, total: evt.total});
    };

    if(options.xfdf) {
      request.setRequestHeader('Accept-Charset', 'utf8');
      var formData = new FormData();
      formData.append('xfdf', options.xfdf);
      request.send(formData);
    } else {
      request.send();
    }
  });
};

function nullFunc(){};

/**
   Constructor for GetPDF api.

   Takes an object containing the options:
   serverUrl: the WebViewer Server to contact
   pdfa: the PDFA format desired
*/
export const WebViewerServer = function(options) {
  if (!options.serverUrl) {
    reject("No server address specified.");
  }

  const server = {};
  server.serverUrl = joinPaths(options.serverUrl, '/blackbox/');

  server.getPDF = function (options) {
    return new Promise(function(resolve, reject) {
      if (!options) {
        reject("options must be defined.");
      }

      // stickiness key
      options.bcid = makeId(8);
      options.onProgress = options.onProgress ? options.onProgress : nullFunc;

      if (options.file) {
        if (!options.extension) {
          options.extension = getExt(options.file.name);
        }

        resolve(uploadFileData(server, fetchPdf, options));
        return;
      } else if (options.uri) {
        resolve(fetchPdf(server, options.uri, options));
        return;
      }

      reject("No url or file found in options.");
      return;
    });
  };

  server.getThumb = function (options) {
    return new Promise(function(resolve, reject) {
      if (!options) {
        reject("options must be defined.");
      }

      options.bcid = makeId(8);
      options.onProgress = options.onProgress ? options.onProgress : nullFunc;

      if (options.file) {
        if (!options.extension) {
          options.extension = getExt(options.file.name);
        }

        resolve(uploadFileData(server, fetchThumb, options));
        return;
      } else if (options.uri) {
        resolve(fetchThumb(server, options.uri, options));
        return;
      }

      reject("No url or file found in options.");
      return;
    });

  };

  return server;
};


