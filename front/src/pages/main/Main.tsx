import React from 'react';
import { useState } from 'react';
import DiaryWriting from './components/Main.DiaryWriting';
import { useGetMyDiaryData } from '../../api/get/useGetDiaryData';
import Calendar from '../../components/calendar/Calendar';
import { fakeDiaryData } from '../../mock/diary';

// Data 객체를 만들어서 해당 날짜 + 쿼리키 공통 캘린더 컴포넌트에 전달 필요
const MainPage: React.FC = () => {
  const today = new Date();

  // 초반 currentDate에 현재 날짜를 보관
  const [currentDate, setCurrentDate] = useState({
    year: today.getFullYear(),
    month: today.getMonth() + 1,
  });

  const handleBeforeMonth = () => {
    // 이전 달로 상태 변경
    if (currentDate.month === 1) {
      setCurrentDate({
        year: currentDate.year - 1,
        month: 12, // 현재 1월일 경우 12월로 설정
      });
    } else {
      setCurrentDate({
        year: currentDate.year,
        month: currentDate.month - 1,
      });
    }
  };

  const handleNextMonth = () => {
    // 다음 달로 상태 변경
    if (currentDate.month === 12) {
      setCurrentDate({
        year: currentDate.year + 1,
        month: 1, // 현재 12월일 경우 1월로 설정
      });
    } else {
      setCurrentDate({
        year: currentDate.year,
        month: currentDate.month + 1,
      });
    }
  };

  const { data: myDiaryData, isFetching } = useGetMyDiaryData({
    user_id: `${localStorage.getItem('userId')}`,
    year: currentDate.year,
    month: currentDate.month,
  });

  return (
    <main
      style={{
        gap: '20px',
        display: 'flex',
        flexDirection: 'column',
        height: '95vh',
      }}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          gap: '20px',
        }}
      >
        <div style={{ backgroundColor: 'white' }}>최신글</div>
        <div style={{ backgroundColor: 'white' }}>통계이미지</div>
        <div style={{ backgroundColor: 'white' }}>
          <video controls width="400" height="45" autoPlay>
            <source
              src="https://rr1---sn-ab02a0n-bh2sl.googlevideo.com/videoplayback?expire=1697812635&ei=OzwyZfj-MYSw2roPr-OheA&ip=106.101.3.223&id=o-AB2upE9iXuWrCqSzQjS3cqJ7Rcg0rFT1ZEREKy5koy8z&itag=251&source=youtube&requiressl=yes&mh=U3&mm=31%2C29&mn=sn-ab02a0n-bh2sl%2Csn-i3belney&ms=au%2Crdu&mv=m&mvi=1&pl=26&gcr=kr&initcwndbps=836250&spc=UWF9f4Y963w_ruadaXpVG45-d4REUxDqzpdABL4IVQ&vprv=1&svpuc=1&mime=audio%2Fwebm&ns=bNqEmFSyczOQTsS3WYWT3zQP&gir=yes&clen=38996507&dur=2418.741&lmt=1640087423044650&mt=1697790542&fvip=5&keepalive=yes&fexp=24007246&beids=24350018&c=WEB&txp=5432434&n=FB4mXw-LrNTRHw&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cgcr%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Cns%2Cgir%2Cclen%2Cdur%2Clmt&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Cinitcwndbps&lsig=AK1ks_kwRQIhALa7Qhq3rxyaAgmHAWQZMICp-HifzIF8Rk2F3e7oSYzZAiA2V2jkrY7cepYSu0Bryauyd-QFN-Tb5nXvkW33QjsU4w%3D%3D&sig=AGM4YrMwRgIhAO307UmHtwNYLHfaExcagZ6Z0Aj7Za5c7ZlSmFTzj7shAiEArsFLgVz1Ms5Tey8_USDYJ1mUKyHLNBaqD5OcgV2IogM%3D"
              type="video/webm"
            />
          </video>
        </div>
      </div>
      <Calendar
        currentDate={currentDate}
        handleBeforeMonth={handleBeforeMonth}
        handleNextMonth={handleNextMonth}
        data={isFetching ? [] : myDiaryData}
        isFetching={isFetching}
        isLogin={true}
      />
    </main>
  );
};

export default MainPage;
