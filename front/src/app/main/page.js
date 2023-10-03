// CSR
'use client';

import Calender from '@/components/main/Calendar';

const Main = () => {
  return (
    <main className="h-90vh flex justify-center items-center gap-3.5">
      <div className="w-full bg-white">
        <div>Block1</div>
        <div>Block2</div>
      </div>
      <Calender />
    </main>
  );
};

export default Main;
