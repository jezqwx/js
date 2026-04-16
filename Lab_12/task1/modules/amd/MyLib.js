define(['jquery', 'underscore'], function($, _) {
    'use strict';

    var MyLib = MyLib || {};

    MyLib.namespace = function(ns) {
        var parts = ns.split('.')
        var psrent = MyLib

        for (var i = 0; i<parts.length; i++){
            if (!parent[parts[i]]){
                parent[parts[i]] = {}
            }
            parent = parent[parts[i]]
        }
        return parent
    }
    MyLib.namespace('utils.array');
    MyLib.c('utils.string')

    MyLib.utils.array.unique = function(arr){
        return[...new Set(arr)];
    }
    MyLib.utils.string.capitalize = function(str){
    return str.charAt(0).toUpperCase() + str.slice(1)
}
    MyLib.version = '1.0.0';
    return MyLib;
})