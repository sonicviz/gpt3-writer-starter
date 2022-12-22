import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

// const basePromptPrefix = "";
// const generateAction = async (req, res) => {
//   // Run first prompt
//   console.log(`API: ${basePromptPrefix}${req.body.userInput}`)

//   const baseCompletion = await openai.createCompletion({
//     model: 'text-davinci-003',
//     prompt: `${basePromptPrefix}${req.body.userInput}`,
//     temperature: 0.7,
//     max_tokens: 250,
//   });

//   const basePromptOutput = baseCompletion.data.choices.pop();

//   res.status(200).json({ output: basePromptOutput });
// };

// export default generateAction;

// const basePromptPrefix =
//   `
// Write me a paragraph in the style of Charles Bukowski with the topic below. Please make sure the paragraph goes in-depth on the topic and has some classic signature responses in the style of charles bukowski's humour.

// Topic:
// `
// const generateAction = async (req, res) => {
//   // Run first prompt
//   console.log(`API: ${basePromptPrefix}${req.body.userInput}`)

//   const baseCompletion = await openai.createCompletion({
//     model: 'text-davinci-003',
//     prompt: `${basePromptPrefix}${req.body.userInput}\n`,
//     temperature: 0.7,
//     max_tokens: 1250,
//   });

//   const basePromptOutput = baseCompletion.data.choices.pop();

//   res.status(200).json({ output: basePromptOutput });
// };

// export default generateAction;

const basePromptPrefix =
  `
Write me a detailed list of things Charles Bukowski would talk in his style about given the topic below. Draw upon his writings, interviews, his poems, his sense of humour. 

Topic:
`

const generateAction = async (req, res) => {
  console.log(`API: ${basePromptPrefix}${req.body.userInput}`)

  const baseCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${basePromptPrefix}${req.body.userInput}`,
    temperature: 0.8,
    max_tokens: 250,
  });

  const basePromptOutput = baseCompletion.data.choices.pop();

  // I build Prompt #2.
  const secondPrompt =
    `
Take the topic and the detailed list of things below and generate a monologue spoken in the style of Charles Bulowski. Make it feel like it's really Charles Bukowski, in the way he speaks and writes. Don't just list the points. Go deep into each one. Explain why. Draw upon his writings, his poems, his sense of humour. 

  Topic: ${req.body.userInput}

  List of things: ${basePromptOutput.text}

  Conversation:
  `
  console.log(`API: ${secondPrompt}`)
  // I call the OpenAI API a second time with Prompt #2
  const secondPromptCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${secondPrompt}`,
    // I set a higher temperature for this one. Up to you!
    temperature: 0.85,
    // I also increase max_tokens.
    max_tokens: 1250,
  });

  // Get the output
  const secondPromptOutput = secondPromptCompletion.data.choices.pop();

  // Send over the Prompt #2's output to our UI instead of Prompt #1's.
  res.status(200).json({ output: secondPromptOutput });
};

export default generateAction;

// const basePromptPrefix =
//   'Help me write lyrics in the style of Drake, Canadian Rapper\n';
// const finalPromptPrefix = 'Take the lyrics below and generate 5 song titles:\n';

// const generateAction = async (req, res) => {
//   // Run first prompt
//   const baseCompletion = await openai.createCompletion({
//     model: 'text-davinci-003',
//     prompt: `${basePromptPrefix}${req.body.input}`,
//     temperature: 0.7,
//     max_tokens: 2048,
//   });

//   const baseChoice = baseCompletion.data.choices.pop();

//   // Run second prompt with prefix
//   const finalPrompt = `${finalPromptPrefix}${req.body.input}${baseChoice.text}`;

//   const prefixCompletion = await openai.createCompletion({
//     model: 'text-davinci-003',
//     prompt: finalPrompt,
//     temperature: 0.7,
//     max_tokens: 2048,
//   });

//   const finalChoice = prefixCompletion.data.choices.pop();

//   res.status(200).json({ baseChoice, finalChoice });
// };

// export default generateAction;
