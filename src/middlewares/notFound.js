const notFound = (req,res,next) => {
     return res.status(404).json("This route is not found")
}

module.exports = notFound;