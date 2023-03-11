const pool = require('../config/db.config')


exports.findAll = async() =>{
    const query = `SELECT * FROM movies`
    const result = await pool.query(query);
    return result.rows;
}

exports.findBy = async function (keyword, value){
    
    const query = 'SELECT * FROM movies WHERE ' + keyword + '= $1'
    const result = await pool.query(query,[value])
    return result
}

exports.create = async function(data){
    
    const insertQuery = `
    INSERT INTO movies(title, genres, year, picture)
            VALUES
            ($1, $2, $3, $4)
    `
    const result = await pool.query(insertQuery,data)
    return result

}

exports.update = async function(datas){
    console.log(datas)
    const updateQuery = `
        UPDATE movies
            SET title = $1,
                genres = $2,
                year = $3
        WHERE id = $4;            
    `
    const result = await pool.query(updateQuery,datas)
    return result
}

exports.delete = async function (value){
    console.log(value)
    const deleteQuery = `DELETE FROM movies WHERE id = $1`
    const result = await pool.query(deleteQuery,[value])
    return result
}