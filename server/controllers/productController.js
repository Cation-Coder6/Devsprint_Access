const Product = require('../models/Product')
const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors')
const path = require('path')
const User = require("../models/User")

const createProduct = async (req, res) => {
    req.body.user = req.user.userId
    const product = await Product.create(req.body)
    res.status(StatusCodes.CREATED).json({ product })
}
const getAllProducts = async (req, res) => {
    const { category } = req.query

    const user = await User.findOne({ _id: req.user.userId })

    if (category) {
        const products = await Product.find({ category: category, hostel: user.hostel })
        res.status(StatusCodes.OK).json({ products, count: products.length })
    } else {
        const products = await Product.find({ hostel: user.hostel })
        res.status(StatusCodes.OK).json({ products, count: products.length })
    }
}
const getSingleProduct = async (req, res) => {
    const { id: productId } = req.params

    const product = await Product.findOne({ _id: productId }).populate('reviews')

    if (!product) {
        throw new CustomError.NotFoundError(`No product with id : ${productId}`)
    }

    res.status(StatusCodes.OK).json({ product })
}
const updateProduct = async (req, res) => {
    const { id: productId } = req.params

    const product = await Product.findOneAndUpdate({ _id: productId }, req.body, {
        new: true,
        runValidators: true,
    })

    if (!product) {
        throw new CustomError.NotFoundError(`No product with id : ${productId}`)
    }

    res.status(StatusCodes.OK).json({ product })
}
const deleteProduct = async (req, res) => {
    const { id: productId } = req.params

    const product = await Product.findOne({ _id: productId })

    if (!product) {
        throw new CustomError.NotFoundError(`No product with id : ${productId}`)
    }

    await product.remove()
    res.status(StatusCodes.OK).json({ msg: 'Success! Product removed.' })
}
const uploadImage = async (req, res) => {
    if (!req.files) {
        throw new CustomError.BadRequestError('No File Uploaded')
    }
    const productImage = req.files.image

    if (!productImage.mimetype.startsWith('image')) {
        throw new CustomError.BadRequestError('Please Upload Image')
    }

    const maxSize = 1024 * 1024

    if (productImage.size > maxSize) {
        throw new CustomError.BadRequestError(
            'Please upload image smaller than 1MB'
        )
    }

    const imagePath = path.join(
        __dirname,
        '../public/uploads/' + `${productImage.name}`
    )
    await productImage.mv(imagePath)
    res.status(StatusCodes.OK).json({ image: `/uploads/${productImage.name}` })
}

module.exports = {
    createProduct,
    getAllProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct,
    uploadImage,
}