const User = require("../models/Users");

class UserController {
    getAll = async (req, res) => {
        const data = await User.find();
        res.status(200).json({ data });
    }

    getOne = async (req, res) => {
        const id = req.params.id;
        const data = await User.findById(id);
        if (!data) return res.status(404).json("Not Found");
        res.status(200).json({ data });
    }

    add = async (req, res) => {
        const { name, email, phone,  password, role, address, birth, membershipNumber, responsibleDepartment } = req.body;
        const data = await User.create({ 
            name, email, phone, password, role, address, birth, membershipNumber, responsibleDepartment
        });
        res.status(201).json({ data });
    }

    update = async (req, res) => {
        const id = req.params.id;
        const data = await User.findById(id);
        if (!data) return res.status(404).json("Not Found");
        
        const { name, email, phone, password, role, address, birthDate, membershipNumber, departmentId } = req.body;
        
        data.name = name ?? data.name;
        data.email = email ?? data.email;
        data.phone = phone ?? data.phone;
        data.password = password ?? data.password;
        data.role = role ?? data.role;
        data.address = address ?? data.address;
        data.birthDate = birthDate ?? data.birthDate;
        data.membershipNumber = membershipNumber ?? data.membershipNumber;
        data.departmentId = departmentId ?? data.departmentId;

        await data.save();
        res.status(200).json({ data });
    }

    remove = async (req, res) => {
        const id = req.params.id;
        const data = await User.findById(id);
        if (!data) return res.status(404).json("Not Found");
        await User.findByIdAndDelete(id);
        res.status(200).json({ data: null });
    }
}

module.exports = new UserController();