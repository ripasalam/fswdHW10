const jwt = require("jsonwebtoken")
const model = require ('../model/userModel')


exports.verifyToken = async function(req,res, next){
    const authHeader = req.headers.token
    
    if(authHeader){

        try{
            const token = authHeader.split(" ")[1]
            const decoded = jwt.verify(token, process.env.JWT_SEC)
            const {id, role} = decoded;

            const result = await model.findBy('id', id)
            
            
            if(result.rows.length === 0){

                res.status(404).json({
                    message: "Error Not Found"
                });
            }else{
                const user = result.rows[0]

                    req.loggedUser = {
                        id: user.id,
                        email: user.email,
                        role: user.role
                    }
                    next();
            }

        }catch(error){
            res.status(400).json({
                    message: "JWT Error"
            });

        }
    } else{
        res.status(400).json({
            message: "Unauthenticated"
        })

    }

}

exports.authorization = async function (req,res,next){
    if(req.loggedUser.id === req.params.id || req.loggedUser.role === 'admin' ){
        next()
    } else{
        res.status(400).json({
            message: "Unauthorized"
        })  
    }
}
exports.verifyAdmin = async function(req, res, next){
    
    
    if(req.loggedUser.role === 'admin'){
        next()
    } else{
         res.status(400).json({
            message: "Unauthorized"
        })
    }
}