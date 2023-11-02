import axios, { AxiosResponse } from 'axios';
import { PrismaClient } from '@prisma/client';
import ytdl from 'ytdl-core';

const prisma = new PrismaClient();

const youtubeApiKey = process.env.youtubeApiKey;
const subKey = process.env.subYoutubeApiKey;

let currentApiKey = youtubeApiKey;

export async function searchMusic(emotion: string): Promise<any | null> {
  try {
    const searchQuery = `${emotion} music music music`;
    const videoDuration = 'long';
    const response: AxiosResponse = await axios.get(
      `https://www.googleapis.com/youtube/v3/search?key=${youtubeApiKey}&part=snippet&type=video&q=${searchQuery}&videoDuration=${videoDuration}`,
    );

    const videoIds = response.data.items.map(
      (item: { id: { videoId: string } }) => item.id.videoId,
    );

    const videoDetailsResponse: AxiosResponse = await axios.get(
      `https://www.googleapis.com/youtube/v3/videos?key=${youtubeApiKey}&part=snippet,contentDetails&id=${videoIds.join(
        ',',
      )}`,
    );

    const filteredVideos = videoDetailsResponse.data.items.filter(
      (video: {
        contentDetails: { duration: string };
      }) => {
        const duration = video.contentDetails?.duration;
        if (!duration) return false;
        const durationInseconds = getDurationInSeconds(duration);
        const durationInMinutes = durationInseconds / 60;

        return (durationInMinutes >= 20);
      },
    );

    if (filteredVideos.length === 0) {
      return null;
    }

    const randomIndex = Math.floor(Math.random() * filteredVideos.length);
    const randomVideo = filteredVideos[randomIndex];

    const musicData = {
      title: randomVideo.snippet.title,
      videoId: randomVideo.id,
    };

    if (currentApiKey === youtubeApiKey) {
      currentApiKey = subKey;
    } else {
      currentApiKey = youtubeApiKey;
    }

    return musicData;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

function getDurationInSeconds(isoDuration: string): number {
  const match = isoDuration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);

  const hours = parseInt(match[1], 10) || 0;
  const minutes = parseInt(match[2], 10) || 0;
  const seconds = parseInt(match[3], 10) || 0;

  return hours * 3600 + minutes * 60 + seconds;
}

export async function updateAudioUrlsPeriodically() {
  try {
    const diariesWithEmoji = (await prisma.diary.findMany()).filter(
      (diary) => diary.emotion && diary.emotion.length === 2
  );

    for (const diary of diariesWithEmoji) {
      const musicData = await searchMusic(diary.emotion);
      const videoId = musicData.videoId;

      const info = await ytdl.getInfo(videoId);
      // 오디오 스트림 URL 가져오기
      const audioUrl = ytdl.chooseFormat(info.formats, { filter: 'audioonly' }).url;

      // 데이터베이스에 스트림 URL 업데이트
      await prisma.diary.update({
        where: { id: diary.id },
        data: { audioUrl },
      });

      console.log(`다이어리 ${diary.id}의 오디오 URL이 갱신되었습니다.`);
    }
  } catch (error) {
    console.error('오디오 URL을 갱신하는 중에 오류 발생:', error);
  }
}