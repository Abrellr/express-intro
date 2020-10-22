const express = require('express')
const { check, validationResult } = require('express-validator')
const noodlesRouter = express.Router()

const noodles = [
    {id: 1, name: "chicken"},
    {id: 2, name: "pork"},
    {id: 3, name: "kimchi"}
]

noodlesRouter.get('/', (req, res) => {
    // console.log(req.query)
    res.send(noodles)
})

noodlesRouter.get('/:id', (req, res) => {
    // console.log(req.params)
    // res.send(noodles)
    const flavor = noodles.find(noodle => noodle.id === parseInt(req.params.id, 10))
    if (flavor) {
        res.status(200).send(flavor)
    } else {
        res.status(404).send('We do not have this flavor in stock')
    }
})

noodlesRouter.post('/', [ check('name').not().isEmpty().isLength({ min: 2 }) ], (req, res) => {
    // console.log(req.body)

    // Basic validation logic
    // if (!req.body.name || req.body.name.length < 2) {
    //     return res.status(400).send('A valid flavor is required for the noodle')
    // }
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    }

    const newFlavor = {
        id: noodles.length + 1,
        name: req.body.name
    }
    noodles.push(newFlavor)
    res.status(201).send(newFlavor)
})

noodlesRouter.delete('/:id', (req, res) => {
    const flavor = noodles.find(noodle => noodle.id === parseInt(req.params.id, 10))
    if (!flavor) return res.status(404).send('These are not the noodles you are looking for...')
    const index = noodles.indexOf(flavor)
    noodles.splice(index, 1)
    res.status(200).send(flavor);
})

noodlesRouter.put('/:id', (req, res) => {
    const flavor = noodles.find(noodle => noodle.id === parseInt(req.params.id, 10))
    if (!flavor) return res.status(404).send('These are not the noodles you are looking for...')
    flavor.name = req.body.name
    res.status(200).send(flavor)
})

module.exports = noodlesRouter