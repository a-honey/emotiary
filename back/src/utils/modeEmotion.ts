export const findMode = (arr: string[]): string | undefined | null => {
  const countMap: Record<string, number> = {};
  const modes: string[] = []; // 감정 담을 string
  let maxCount = 0;

  // 1. 감정이 선택된 것만 남기기 (감정 여러개는 filtering)
  const oneEmotionArray = arr.filter((emotion) => !emotion.includes(', '));

  // 선택된 감정이 없을 땐 null로 return
  if (oneEmotionArray.length == 0) return null;

  oneEmotionArray.forEach((item) => {
    countMap[item] = (countMap[item] || 0) + 1;

    if (countMap[item] > maxCount) {
      maxCount = countMap[item];
      modes.length = 0;
      modes.push(item);
    } else if (countMap[item] === maxCount && !modes.includes(item)) {
      modes.push(item);
    }
  });

  // 동일 스코어 일 경우엔 안보내줌
  if (modes.length > 1) return null;
  return modes[0];
};
