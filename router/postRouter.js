const express = require('express');
const router = express.Router();
const Posts = require('../data/db.js');

let post = []

router.get('/', (req, res) => {
    Posts.find(req.query)
    .then(posts => {
        res.status(200).json(posts);
    })
    .catch((err) => {
        res.status(500).json({ error: "The posts information could not be retrieved." })
    })
})

router.get('/:id', (req, res) => {
    const {id} = req.params;
    const body = req.body
    Posts.findById(id)
    .then(post => {
        if (post) {
            res.status(200).json(post);
        } else {
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        }
    })
    .catch(err => {
        console.log(error)
        res.status(500).json({ message: "The post with the specified ID does not exist." })
    })
})

router.get('/:id/comments', (req, res) => {
    const {id} = req.params;

    Posts.findPostComments(id)
        .then(comments => {
            if(comments) {
                res.status(200).json(comments)
            } else {
                res.status(404).json({ message: "The post with the specified ID does not exist." }                )
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: "The comments information could not be retrieved." })
        })
})

router.post('/', (req, res) => {
    const body = req.body;
    if (!body.title || !body.contents) {
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." });
    } else {
        Posts.insert(body)
        .then(() => {
             res.status(201).json(body)
            })
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: "There was an error while saving the comment to the database" })
        })
    }  
})

router.post('/:id/comments', (req, res) =>{
    const body = req.body;
    const {id} = req.params;
    Posts.findById(id)
        .then((post) => {
            if (post) {
                if (body.text) {
                    Posts.insertComment(body)
                    .then(res.status(201).json(body))
                    .catch((err) => {
                        console.log(err)
                    })
                } else {
                    res.status(400).json({ errorMessage: "Please provide text for the comment." })
                }
            } else {
                res.status(404).json({ message: "The post with the specified ID does not exist." })
            }
        })
})

// router.put('/:id', (req, res) => {
//     const changes = req.body;
//     const {id} = req.params
//     if (!Posts.findById(id)) {
//         res.status(404).json({ message: "The post with the specified ID does not exist." })
//     } else {
//         if (!changes.title || !changes.contents) {
//             res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
//         } else {
//             Posts.update(id, changes)
//             .then(res.status(200).json(changes))
//             .catch((err) => {
//                 console.log(err);
//                 res.status(500).json({ error: "The post information could not be modified." });
//             })
//         }
//     }

// })

router.put('/:id', (req, res) => {
    const changes = req.body;
    const {id} = req.params
    if (!changes.title || !changes.contents) {
    res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
    } else {
        Posts.update(id, changes)
        .then (change => {
            if (change) {
                res.status(200).json(changes);
            } else {
                res.status(404).json({ message: "The post with the specified ID does not exist." })
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: "The post information could not be modified." })
        })
    }

})

router.delete('/:id', (req, res) => {
    const {id} = req.params
    Posts.remove(id)
    .then(count => {
        if (count > 0) {
            res.status(200).json({ message: 'B-leeted'})
        } else {
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        }
    })
    .catch(err => {
        console.log(error)
        res.status(500).json({ error: "The post could not be removed" })
    })
})

module.exports = router;