;(function(window) {
  var undefined;

  var objectTypes = {
    'function': true,
    'object': true
  };

  var freeExports = objectTypes[typeof exports] && typeof require == 'function' && exports;

  var freeModule = objectTypes[typeof module] && module && module.exports == freeExports && module;

  var freeGlobal = objectTypes[typeof global] && global;
  if (freeGlobal && (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal)) {
    window = freeGlobal;
  }

  var templates = {},
      _ = window._;

  templates['empty'] = function(obj) {
    obj || (obj = {});
    var __t, __p = '', __e = _.escape;
    with (obj) {
    __p += '<td class="empty" colspan="8">The Q is empty.</td>';

    }
    return __p
  };

  templates['job'] = function(obj) {
    obj || (obj = {});
    var __t, __p = '', __e = _.escape;
    with (obj) {
    __p += '<td>' +
    ((__t = ( patient_name )) == null ? '' : __t) +
    '</td>\r\n<td>' +
    ((__t = ( user_name )) == null ? '' : __t) +
    ' <button class="iconBtn"><i class="icon-rss"></i></button></td>\r\n<td>' +
    ((__t = ( document_name )) == null ? '' : __t) +
    '</td>\r\n<td>' +
    ((__t = ( status )) == null ? '' : __t) +
    '</td>\r\n<td>' +
    ((__t = ( priority )) == null ? '' : __t) +
    '</td>\r\n<td>' +
    ((__t = ( server )) == null ? '' : __t) +
    '</td>\r\n<td><abbr class="timeago" title="' +
    ((__t = ( iso8601_timestamp )) == null ? '' : __t) +
    '">' +
    ((__t = ( human_timestamp )) == null ? '' : __t) +
    '</abbr></td>\r\n<td class="icons"><button class="iconBtn"><i class="icon-remove"></i></button></td>';

    }
    return __p
  };

  if (typeof define == 'function' && typeof define.amd == 'object' && define.amd) {
    define(['lodash'], function(lodash) {
      _ = lodash;
      lodash.templates = lodash.extend(lodash.templates || {}, templates);
    });
  } else if (freeExports && !freeExports.nodeType) {
    _ = require('lodash');
    if (freeModule) {
      (freeModule.exports = templates).templates = templates;
    } else {
      freeExports.templates = templates;
    }
  } else if (_) {
    _.templates = _.extend(_.templates || {}, templates);
  }
}(this));