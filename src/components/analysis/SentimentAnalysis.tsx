import React, { useEffect, useState } from "react";
// import '../css/SentimentAnalysis.css';

const SentimentAnalysis: React.FC = () => {
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [nextImage, setNextImage] = useState<string | null>(null);

  useEffect(() => {
    const startSequence = (targetImage: string) => {
      let transitionSequence: string[] = [];

      if (targetImage === "/cherry1.png") {
        transitionSequence = ["/cherry3.png", "/cherry1.png"];
      } else if (targetImage === "/cherry2.png") {
        transitionSequence = ["/cherry3.png", "/cherry2.png"];
      } else if (targetImage === "/cherry3.png") {
        transitionSequence = ["/cherry1.png", "/cherry3.png"];
      }

      setCurrentImage(transitionSequence[0]);
      setNextImage(transitionSequence[1]);

      const transition = () => {
        if (nextImage) {
          setCurrentImage(nextImage);
        }
        transitionSequence.shift();

        if (transitionSequence.length > 0) {
          setNextImage(transitionSequence[0]);
        }

        setTimeout(transition, 2000);
      };

      setTimeout(transition, 2000);
    };

    startSequence("/cherry3.png");
  }, [nextImage]);

  return (
    <div>
      {currentImage && (
        <img src={currentImage} alt="current" className="image fadeOut" width={300} height={100} />
      )}
      {nextImage && (
        <img src={nextImage} alt="next" className="image fadeIn" width={300} height={100} />
      )}
    </div>
  );
}

export default SentimentAnalysis;