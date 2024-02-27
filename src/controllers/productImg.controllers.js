const catchError = require('../utils/catchError');
const ProductImg = require('../models/ProductImg');
const path = require("path")
const fs = require("fs")

const getAll = catchError(async(req, res) => {
    const results = await ProductImg.findAll();
    return res.json(results);
});

const create = catchError(async(req, res) => {
    const { filename } = req.file

    const url = `${req.protocol}://${req.headers.host}/uploads/${filename}`

    const newBody = { filename, url }

    const result = await ProductImg.create(newBody)

    return res.sendStatus(201).json(result)
});

const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await ProductImg.findByPk(id);
    if(!result) return res.sendStatus(404);
    return res.json(result);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await ProductImg.findByPk(id)

    if(!result) return res.sendStatus(404);

    const imageFilePath = path.join(__dirname, "..", "public","uploads", `${result.filename}`)
    
    fs.unlinkSync(imageFilePath)

    await result.destroy()


    return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await ProductImg.update(
        req.body,
        { where: {id}, returning: true }
    );
    if(result[0] === 0) return res.sendStatus(404);
    return res.json(result[1][0]);
});

module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update
}