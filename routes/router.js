const express = require('express')
const router = express.Router()
const Poem = require('../models/poemSchema')
const { generatePoem, generateImage } = require('../controllers/openAi')

router.get('/', async (req, res) => {
  res.render('index.ejs')
})

router.get('/prompt', (req, res) => {
  res.render('form.ejs')
})

router.post('/prompt', async (req, res) => {
  const caption = req.body.caption

  try {
    await generateAndSavePoem(caption)
    res.redirect('/')
  } catch (error) {
    console.log(error)
    res.status(400).send(error.message)
  }
})

async function generateAndSavePoem(caption) {
  const poem = await generatePoem(caption)
  const { imageUrl } = await generateImage(caption)

  const newPoem = new Poem({
    poem: poem,
    image: imageUrl,
    caption: caption,
  })

  const validationError = newPoem.validateSync()

  if (validationError) {
    if (validationError.errors['poem'].kind === 'required') {
      throw new Error('Unable to generate a poem for the given prompt')
    } else {
      throw new Error(validationError.message)
    }
  }

  await newPoem.save()
  console.log('Poem saved successfully')
}



module.exports = router
/*router.post('/prompt', async (req, res) => {
  const caption = req.body.caption
  const poem = await generatePoem(caption)
  const { imageUrl } = await generateImage(caption)

  const newPoem = new Poem({
    poem: poem,
    image: imageUrl,
    caption: caption
  })

  await newPoem.save((error) => {
    if (error) {
      console.log(error);
    } else {
      console.log(newPoem);
      console.log('Poem saved successfully')
    }
  })

  res.redirect('/')
})
*/
