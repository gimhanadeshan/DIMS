import React, { useEffect, useState } from 'react';
import { motion, useTransform, useViewportScroll } from 'framer-motion';

const Video = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const { scrollYProgress } = useViewportScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      <motion.div
        className="absolute inset-0 z-0 overflow-hidden"
        style={{ scale }}
      >
        <iframe
          src="https://www.youtube.com/embed/swpySrSQXBY?autoplay=1&mute=1&loop=1&playlist=swpySrSQXBY&controls=0&showinfo=0&modestbranding=1"
          className="absolute top-0 left-0 w-full h-full object-cover"
          style={{
            transform: isLoaded ? 'scale(1.1) translateY(-5%)' : 'scale(1)',
            transition: 'transform 2s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Coco-Nut Brand Film"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/70 to-black/95" />
      </motion.div>

      {/* Your content goes here if needed */}
    </section>
  );
};

export default Video;
