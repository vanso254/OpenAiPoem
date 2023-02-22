const { Configuration, OpenAIApi } = require('openai');
require('dotenv').config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

async function generatePoem(prompt) {
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `Write a poem about ${prompt}`,
    temperature: 0.6,
    max_tokens: 150,
    top_p: 1,
    frequency_penalty: 1,
    presence_penalty: 1,
  })

  const poem = response.choices && response.choices.length > 0 ? response.choices[0].text.trim() : '';

  if (!poem) {
    throw new Error('Unable to generate a poem for the given prompt')
  }
  return poem
}

async function generateImage(caption) {
  const response = await openai.createImage({
    n: 1,
    prompt: `${caption}`,
    size: '1024x1024'
  })

  const data = await response.data;
  const imageUrl = data.data[0].url;

  return { response: data, imageUrl: imageUrl };
}

module.exports = {
  generatePoem,
  generateImage
}
