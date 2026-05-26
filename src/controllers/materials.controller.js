const Material = require("../models/Materials");

class MaterialsController {
    getAll = async (req, res) => {
        const data = await Material.find();
        res.status(200).json({ data });
    }

    getOne = async (req, res) => {
        const id = req.params.id;
        const data = await Material.findById(id);
        if (!data) return res.status(404).json("Not Found");
        res.status(200).json({ data });
    }

    add = async (req, res) => {       
        const { title, category, totalCopies, availableCopies, coverImage, materialType, book, magazine } = req.body;
        
        const data = await Material.create({ 
            title, category, totalCopies, availableCopies, coverImage, materialType, book, magazine 
        });
        res.status(201).json({ data });
    }

    update = async (req, res) => {
        const id = req.params.id;
        const data = await Material.findById(id);
        if (!data) return res.status(404).json("Not Found");
        
        const { title, category, totalCopies, availableCopies, coverImage, materialType, book, magazine } = req.body;
        
        data.title = title ?? data.title;
        data.category = category ?? data.category;
        data.totalCopies = totalCopies ?? data.totalCopies;
        data.availableCopies = availableCopies ?? data.availableCopies;
        data.coverImage = coverImage ?? data.coverImage;
        data.materialType = materialType ?? data.materialType;
        
        if (book) data.book = { ...data.book, ...book };
        if (magazine) data.magazine = { ...data.magazine, ...magazine };

        await data.save();
        res.status(200).json({ data });
    }

    remove = async (req, res) => {
        const id = req.params.id;
        const data = await Material.findById(id);
        if (!data) return res.status(404).json("Not Found");
        await Material.findByIdAndDelete(id);
        res.status(200).json({ data: null });
    }
}

module.exports = new MaterialsController();