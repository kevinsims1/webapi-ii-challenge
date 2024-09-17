const express = require('express')

const db = require('../data/db.js')

const router = express.Router()

router.post('/', async (req, res) => {
  try {
    const post = await db.insert(req.body);
    res.status(200).json(post)
  } catch(error) {
    res.status(400).json({errorMessage: 'bad'})
  }
})

router.post('/:id/comments', async (req, res) => {
  try {
      
      const comment = await db.insertComment({...req.body, post_id: req.params.id})
      res.status(201).json(comment)
  } catch (error) {
      res.status(400).json({errorMessage: 'bad'})
  }
  })

router.get('/', async (req, res) => {
    try {
      res.status(200).json(db);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: 'Error retrieving the db',
      });
    }
  });
  
  router.get('/:id', async (req, res) => {
    try {
      const id = await db.findById(req.params.id);
  
      if (id) {
        res.status(200).json(id);
      } else {
        res.status(404).json({ message: 'id not found' });
      }
    } catch (error) {
      res.status(500).json({
        message: 'Error retrieving the hub',
      });
    }
  });

  router.get('/:id/comments', async (req, res) => { 
    const { id } = req.params;
    
    db.findPostComments(id)
        .then(messages => {
            if(messages && messages.length){
            res.status(200).json(messages);
            }else {
            res.status(404).json({message: 'cannot find'})
            }
        })
        .catch(error => {
            res.status(500).json(error)
        })
  })

  router.delete('/:id', async (req, res) => {
    try {
      const count = await db.remove(req.params.id);
      if (count > 0) {
        res.status(200).json({ message: 'The db has been nuked' });
      } else {
        res.status(404).json({ message: 'The db could not be found' });
      }
    } catch (error) {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error removing the db',
      });
    }
  });

  router.put('/:id', async (req, res) => {
    try {
      const update = await db.update(req.params.id, req.body);
      if (update) {
        res.status(200).json(update);
      } else {
        res.status(404).json({ message: 'The id could not be found' });
      }
    } catch (error) {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error updating the post',
      });
    }
  });

  

module.exports = router