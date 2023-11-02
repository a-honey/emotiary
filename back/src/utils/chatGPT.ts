import OpenAI from 'openai';
import dotenv from 'dotenv';
dotenv.config();

export const callChatGPT = async (comment: string) => {
  const openAi = new OpenAI({
    apiKey: process.env.OPEN_API_KEY,
  });

  try {
    const chatCompletion = await openAi.chat.completions.create({
      messages: [
        {
          role: 'user',
          content: `80글자 미만으로 아래 일기에 대해 공감 한마디 해줘 \n \"${comment}\"`,
        },
      ],
      model: 'gpt-3.5-turbo',
    });

    return chatCompletion.choices[0].message.content;
  } catch (error) {
    console.error('Error calling chatGPT API: ', error);
    return null;
  }
};
