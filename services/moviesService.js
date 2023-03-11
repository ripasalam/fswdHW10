const MoviesRepository = require('../repositories/moviesRepository')


exports.find = async function(){

    return MoviesRepository.findAll()
}

exports.simpleGet = async function (keyword, value){

    return MoviesRepository.find(keyword, value)
}

exports.create = async function (data){
    return MoviesRepository.create(data)
}

exports.update = async function(data){
    return MoviesRepository.update(data)
}

exports.delete = async function(id){
    return MoviesRepository.delete(id)
}