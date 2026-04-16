'use strrict'

function namespace(ns){
    var parts = ns.split('.')
    var parent = MyLib

    for (var i = 0; i < parts.length; i++) {
        if (!parent[parts[i]]) {
            parent[parts[i]] = {};
        }
        parent = parent[parts[i]];
    }
    return parent;
}

var MyLib = {
    version: '1.0.0',
    namespace: namespace
};

namespace('utils.array');
namespace('utils.string');

MyLib.utils.array.unique = function(arr) {
    return [...new Set(arr)];
};

MyLib.utils.string.capitalize = function(str) {
    return str.charAt(0).toUpperCase() + str.slice(1)
};

module.exports = MyLib