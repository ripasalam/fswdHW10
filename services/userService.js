const userRepository = require('../repositories/userRepository')

exports.find = async function(){

    return userRepository.findAll()
}

exports.simpleGet = async function (keyword, value){

    return userRepository.find(keyword, value)
}

exports.create = async function (data){
    return userRepository.create(data)
}

exports.update = async function(data){
    return userRepository.update(data)
}

exports.delete = async function(id){
    return userRepository.delete(id)
}