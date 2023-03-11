const Movies = require ("../model/moviesModel")


exports.findAll = async function(){
    return Movies.findAll()
}
exports.find = async function(keyword, value){
   
    return Movies.findBy(keyword, value);
}

exports.create = async function(data) {
    return Movies.create(data)
}

exports.update = async function(data){
    return Movies.update(data)
}

exports.delete = async function(id){

    return Movies.delete(id)
}