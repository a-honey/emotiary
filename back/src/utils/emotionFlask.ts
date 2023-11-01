import { PrismaClient } from '@prisma/client';
import axios from 'axios';
const prisma = new PrismaClient();

export async function generateEmotionString(content : string) {
    const responseData = await axios.post(
      'http://kdt-ai-8-team02.elicecoding.com:5000/predict/diary',
      {
        text: content,
      }
    );
  
    const labels = responseData.data.emotion.map(
        (item: { label: string }) => item.label,
      );
      const emojis = await Promise.all(
        responseData.data.emotion.map(async (item: { label: string }) => {
          const label = item.label;
          const type = label;
          const emotions = await prisma.emoji.findMany({
            where: {
              type: type,
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
        })
      );
      
      const combinedEmotions = labels.map((label : string, index : number) => {
        return `${label} : ${emojis[index] || 'Default Emotion'}`;
      });
  
    return combinedEmotions.join(', ');
  }