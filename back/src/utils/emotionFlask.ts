import { prisma } from '../../prisma/prismaClient';
import axios from 'axios';

export async function generateEmotionString(content: string) {
  const responseData = await axios.post(
    'https://kdt-ai-8-team02.elicecoding.com/flask/predict/diary',
    {
      text: content,
    },
  );
  const labels = responseData.data.map((item: string) => item);

  const emojis = await Promise.all(
    labels.map(async (label: string) => {
      const emotions = await prisma.emoji.findMany({
        where: {
          type: label,
        },
        select: {
          emotion: true,
        },
      });

      if (emotions.length > 0) {
        const randomEmotion =
          emotions[Math.floor(Math.random() * emotions.length)].emotion;
        return randomEmotion;
      }
      return null;
    }),
  );
  const combinedEmotions = labels.map((label: string, index: number) => {
    return `${label} : ${emojis[index] || 'Default Emotion'}`;
  });

  return combinedEmotions.join(', ');
}
