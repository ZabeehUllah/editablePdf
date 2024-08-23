import React, { useState, useRef, useEffect } from 'react';
import ConstitutionPage from './components/ConstitutionPage';
import IntroductionPage from './components/IntroductionPage';
import ArrowIcon from './components/ArrowIcon';

const App: React.FC = () => {
  const [isScrolledDown, setIsScrolledDown] = useState(false);
  const introRef = useRef<HTMLDivElement | null>(null);
  const constitutionRef = useRef<HTMLDivElement | null>(null);

  const handleArrowClick = () => {
    if (isScrolledDown) {
      introRef.current?.scrollIntoView({ behavior: 'smooth' });
    } else {
      constitutionRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScroll = () => {
    if (!introRef.current || !constitutionRef.current) return;

    const introTop = introRef.current.getBoundingClientRect().top;
    const constitutionTop = constitutionRef.current.getBoundingClientRect().top;
    const viewportHeight = window.innerHeight;

    if (introTop < viewportHeight && constitutionTop >= viewportHeight) {
      setIsScrolledDown(false);
    } else {
      setIsScrolledDown(true);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="App">
      <IntroductionPage ref={introRef} />
      <ConstitutionPage ref={constitutionRef} />
      <ArrowIcon isScrolledDown={isScrolledDown} onClick={handleArrowClick} />
    </div>
  );
};

export default App;
