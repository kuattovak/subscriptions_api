const express = require('express')
const router = express.Router()
const Subscriber = require('../model/subscriber');
const subscriber = require('../model/subscriber');

console.log("Subscriber Model:", Subscriber);


//Getting all subscribers
router.get('/', async(req, res) => {
    try {
    const subscribers = await Subscriber.find()
    res.json(subscribers)
    }
    catch(error) {
    res.status(500).json({message: error.message})

    }
})
//Getting one
router.get('/:id',getSubscriber, (req, res) => {
  res.send(res.subscriber)  
})



//Creating one
router.post('/', async(req,res) => {

  console.log("Received request body:", req.body); // ✅ Debugging
  const subscriber = new Subscriber({
    name: req.body.name,
    subscribedToChannel: req.body.subscribedToChannel,
  })

  try {
    const newSubscriber = await subscriber.save()
    res.status(201).json(newSubscriber)
  }
  catch(e) {
    res.status(400).json({message: e.message})
  }
})


//Updating one
router.patch('/:id',getSubscriber, async(req, res) => {
  if (req.body.name != null) {
    res.subscriber.name = req.body.name
  }
  else if (req.body.subscribedToChannel != null) {
    res.subscriber.subscribedToChannel = req.body.subscribedToChannel
  }
    try {
    const updatedSubscriber = await res.subscriber.save()
    res.json(updatedSubscriber)
    }
    catch(e) {
      res.status(400).json({message: e.message})
    }
})
//Deleting one
router.delete('/:id', async(req, res) => {
  try {
    await subscriber.findByIdAndDelete(req.params.id)
    res.json({message: `Deleted Subscriber`})
  }
  catch(e) {
    res.status(500).json({message: e.message})
  }
}) 


async function getSubscriber(req, res, next) {
  let subscriber;
  try {
      subscriber = await Subscriber.findById(req.params.id);
      if (subscriber == null) {
          return res.status(404).json({ message: "Cannot find the subscriber" });
      }
  } catch (e) {
      return res.status(500).json({ message: e.message }); // ✅ Corrected status code
  }
  res.subscriber = subscriber;
  next();
}

module.exports = router