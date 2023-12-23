//let User= require('../models/model_user');
//let Content = require('../models/model_subject');
//let ContentCat = require('../models/model_content_category');
//let ContentSubCat = require('../models/model_content_subcategory');
let uniqid = require('uniqid');
let Promise = require('bluebird');
let resObj = require('./response.js');
let ConstantCtrl = require('./constants.js');
let fs = require('fs');


module.exports.shuffle = function(array) {
    let ctr = array.length, temp, index;

// While there are elements in the array
    while (ctr > 0) {
// Pick a random index
        index = Math.floor(Math.random() * ctr);
// Decrease ctr by 1
        ctr--;
// And swap the last element with it
        temp = array[ctr];
        array[ctr] = array[index];
        array[index] = temp;
    }
    return array;
}