const moviesService = require ('../services/moviesService')


exports.movies = async function(req,res){
    const result = await moviesService.find()

    res.status(200).json({
        data: result
    })

}
exports.getMovies = async function(req,res){
    const {id} = req.params;

    const result = await moviesService.simpleGet('id', id)
    
    res.status(200).json({
        data: result.rows[0]
    })
}

exports.createMovies = async function (req, res){
    const {title, genres, year} = req.body

    const images = req.file.path
   
     try {
            const result = await moviesService.create([title, genres, year,images]);
            res.status(201).json({
                message: "Movie Created Successfuly!"
            });
        } catch (error) {
            res.status(500).json({
                message: error.message
            })
        }   
}




exports.updateMovies = async function (req ,res){
    const {id} = req.params
    const {title, genres, year} = req.body
    const images = req.file.path
    
    console.log(title, genres, year, images)
   
     try {
            const update = await moviesService.update([title, genres, year, id]);
            res.status(201).json({
                message: "Movie Updated Successfuly!"
            });
        } catch (error) {
            res.status(500).json({
                message: error.message
            })
        }   
}

exports.deleteMovies = async function(req,res){
    const {id} = req.params

    const checkId = await moviesService.simpleGet('id', id)

    if (checkId.rows.length === 0){
        res.status(404).json({
            message: "Movies not found!"
        });
    } else{
        const result = await moviesService.delete(id)
        res.status(201).json({
                message: "Movies deleted Successfuly!"
            });
    }

}