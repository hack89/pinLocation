const express = require('express')
const router = express.Router()
const LogEntry = require('../models/LogEntry')


router.get('/', async(req, res, next) => {
    try {
        const entries = await LogEntry.find();
        res.json(entries)
    } catch (error) {
        next(error)
    }
})

router.post('/', async(req, res, next) => {
    try {
        const newLogEntry = new LogEntry(req.body)
        const createdEntry = await newLogEntry.save()
        res.json(createdEntry)
    } catch (error) {
        if (error.name === 'ValidationError') {
            res.status(422)
        }
        next(error)
    }

})


module.exports = router;