const pool = require('../config/db.config')


exports.findAll = async() =>{
    const query = `SELECT * FROM users`
    const result = await pool.query(query);
    return result.rows;
}

exports.findBy = async function (keyword, value){
 
    const query = `SELECT * FROM users WHERE ` + keyword + `= $1`
    // console.log(keyword, value)
    const result = await pool.query(query,[value])
    return result
}

exports.create = async function(data){
    
    const insertQuery = `
    INSERT INTO users(email, gender, password, role)
            VALUES
            ($1, $2, $3, $4)
    `
    const result = await pool.query(insertQuery,data)
    return result

}

exports.update = async function(datas){
    console.log(datas)
    const updateQuery = `
        UPDATE users
            SET email = $1,
                gender = $2,
                role = $3
        WHERE id = $4;            
    `
    const result = await pool.query(updateQuery,datas)
    return result
}

exports.delete = async function (value){
    const deleteQuery = `DELETE FROM users WHERE id = $1`
    const result = await pool.query(deleteQuery,[value])
    return result
}