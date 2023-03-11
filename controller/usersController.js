const userService = require('../services/userService')


exports.users = async function(req,res){
    const result = await userService.find()

    res.status(200).json({
        data: result
    })

}
exports.getUser = async function(req,res){
    const {id} = req.params;
    const result = await userService.simpleGet('id', id)

    res.status(200).json({
        data: result.rows[0]
    })
}



exports.updateUser = async function (req ,res){
    const {id} = req.params
    const {email, gender, role} = req.body
     

     try {
            const update = await userService.update([email, gender, role, id]);
            res.status(201).json({
                message: "User Updated Successfuly!"
            });
        } catch (error) {
            res.status(500).json({
                message: error.message
            })
        }   
}

exports.deleteUser = async function(req,res){
    const {id} = req.params

    const checkId = await userService.simpleGet('id', id)



    if (checkId.rows.length === 0){
        res.status(404).json({
            message: "User not found!"
        });
    } else{
        const result = await userService.delete(id)
        res.status(201).json({
                message: "User deleted Successfuly!"
            });
    }

}