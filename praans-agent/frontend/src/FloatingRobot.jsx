import React from 'react';
import LottieModule from 'lottie-react';
const Lottie = LottieModule.default || LottieModule;
import robotJson from './assets/animations/robot.json';

export default function FloatingRobot() {
  // console.log('Lottie import:', Lottie);
  return (
    <div className="fixed inset-0 flex items-center justify-center pointer-events-none" style={{ zIndex: 15 }}>
      <Lottie
        animationData={robotJson}
        loop
        autoplay
        style={{
          width: 200,
          height: 200,
          marginTop: '-60px'
        }}
      />
    </div>
  );
}