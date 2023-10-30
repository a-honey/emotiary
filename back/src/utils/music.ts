import axios, { AxiosResponse } from 'axios';

const youtubeApiKey = process.env.youtubeApiKey;

export async function searchMusic(emotion: string): Promise<any | null> {
  try {
    const searchQuery = `${emotion} music`;

    console.log(
      `https://www.googleapis.com/youtube/v3/search?key=${youtubeApiKey}&part=snippet&type=video&q=${searchQuery}`,
    );

    const response: AxiosResponse = await axios.get(
      `https://www.googleapis.com/youtube/v3/search?key=${youtubeApiKey}&part=snippet&type=video&q=${searchQuery}`,
    );

    // API 응답 중에서 첫 번째 비디오 정보를 추출
    const firstVideo = response.data.items[0];

    if (!firstVideo) {
      return null; // 검색 결과가 없는 경우 null을 반환하거나 다른 처리를 할 수 있습니다.
    }

    // 노래 정보를 객체로 반환
    const musicData = {
      title: firstVideo.snippet.title,
      videoId: firstVideo.id.videoId,
    };

    return musicData;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
