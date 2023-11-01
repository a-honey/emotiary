import { atom } from 'recoil';

// 게시글 작성한 후 audio url를 전역상태으로 저장
// 레이아웃 위에서 띄우거나 useMemo로 렌더링 방지
export const audioState = atom({
  key: 'audioState',
  default:
    'https://rr5---sn-ab02a0nfpgxapox-bh2zs.googlevideo.com/videoplayback?expire=1698741621&ei=FWlAZZ6YMcX6s8IPn86xoAs&ip=122.37.232.34&id=o-ALsxxVWIx54tCPbPnY5VdHFDZ_xL1KlgP0SMPnMwCUrl&itag=251&source=youtube&requiressl=yes&mh=pR&mm=31%2C26&mn=sn-ab02a0nfpgxapox-bh2zs%2Csn-un57snee&ms=au%2Conr&mv=m&mvi=5&pl=21&initcwndbps=1521250&spc=UWF9f794b-IFwohQrdYY8OADMmrzRotlS2xbo0TXdg&vprv=1&svpuc=1&mime=audio%2Fwebm&ns=pdL0LE-7Ax2hWLQkfcE_MGsP&gir=yes&clen=4295208&dur=239.041&lmt=1682146477569478&mt=1698719571&fvip=1&keepalive=yes&fexp=24007246&beids=24350018&c=WEB&txp=6218224&n=Ey7s67VMTLqp9g&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Cns%2Cgir%2Cclen%2Cdur%2Clmt&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Cinitcwndbps&lsig=AK1ks_kwRQIhAIN9btgDw6K64a-3Kii4n8DYcABGcBNnAbj60zE8V4Q8AiAXh1rsRrPH1vE35bvnSkRRtx_J6NdRcTZuMzASeAcDZg%3D%3D&sig=AGM4YrMwRgIhAM7y8lot35koGC1yEcd5yKN3qdGWmxq11WzfElQq_9fCAiEAmTk4sXRVwb8oNEI6izTkVDjTSKPOpREiAqlWSaAoPq8%3D',
});
