const Review = require("../models/Reviews");

class ReviewsController {
   
    getAll = async (req, res) => {
        const data = await Review.find().populate("memberId", "name").populate("materialId", "title");
        res.status(200).json({ data });
    }

 
    getOne = async (req, res) => {
        const id = req.params.id;
        const data = await Review.findById(id).populate("memberId").populate("materialId");
        if (!data) return res.status(404).json("Not Found");
        res.status(200).json({ data });
    }

    
    add = async (req, res) => {
        const { memberId, materialId, rating, comment } = req.body;

        const existingReview = await Review.findOne({ memberId, materialId });

        if (existingReview) {
            return res.status(400).json({ 
                message: "You have already reviewed this material. You cannot review it more than once." 
            });
        }

        const newReview = await Review.create({ memberId, materialId, rating, comment });
        res.status(201).json({ data: newReview });}


    update = async (req, res) => {
        const id = req.params.id;
        const data = await Review.findById(id);
        if (!data) return res.status(404).json("Not Found");
        
        const { stars, comment } = req.body;
        
        data.stars = stars ?? data.stars;
        data.comment = comment ?? data.comment;
        
        await data.save();
        res.status(200).json({ data });
    }

    
    remove = async (req, res) => {
        const id = req.params.id;
        const data = await Review.findById(id);
        if (!data) return res.status(404).json("Not Found");
        
        await Review.findByIdAndDelete(id);
        res.status(200).json({ data: null });
    }
}

module.exports = new ReviewsController();