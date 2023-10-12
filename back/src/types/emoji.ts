export interface Emoji {
    id: number;
    type: string;
    sadness: string;
    surprise: string;
    happiness: string;
    aversion: string;
    unrest: string;
    anger: string;
    neutrality: string;
  }
  
  // emoji.ts

export type Emotion = "슬픔" | "당황" | "행복" | "혐오" | "불안" | "분노" | "중립";

export interface EmojiMap {
  [key: string]: keyof Emoji;
}

export const emojiMapping: EmojiMap = {
  "슬픔": "sadness",
  "당황": "surprise",
  "행복": "happiness",
  "혐오": "aversion",
  "불안": "unrest",
  "분노": "anger",
  "중립": "neutrality",
};
