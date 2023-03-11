const model = require ('../model/userModel')
const brycpt = require('bcrypt')
const jwt = require('jsonwebtoken')
const saltRounds = 10;
const authService = require('../services/authService')


exports.registerUser = async function (req,res){
    const {email, gender, password, role} = req.body;

    const hashPassword = brycpt.hashSync(password, saltRounds)
    
    try {
            const create = await authService.create([email, gender, hashPassword, role]);
            res.status(201).json({
                message: "User Created Successfuly!"
            });
        } catch (error) {
            res.status(500).json({
                message: error.message
            })
        }
}

exports.loginUser = async function(req,res){
    const {email, password} = req.body

    const result = await authService.find('email', email)

    if(result.rows.length === 0){
        res.status(404).json({
            message: "Email or Password Wrong"
        });

    } else {
        const data = result.rows[0]

        const comparePass = brycpt.compareSync(password, data.password);

        if(comparePass){
            const accessToken = jwt.sign(
            {
                id: data.id,
                role: data.role
            },
            process.env.JWT_SEC,
                {expiresIn:'1d'}
            )

            const {password, ...others} = data
            res.status(200).json({
                message: "login successfully",
                ...others,
                accessToken
            })

        } else{
                res.status(404).json({
                message: "Email or Password Wrong"
            });

        }
   }
}