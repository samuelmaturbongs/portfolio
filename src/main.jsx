import React, { Component, Suspense, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import '../assets/css/styles.css';
import '../assets/css/editorial.css';
import '../assets/css/creative.css';
import TiltedCard from './TiltedCard';
import MoltenMetal from './MoltenMetal';
import './MoltenMetal.css';
import portrait from '../assets/img/me_2.jpeg';
import { applyBorderGlowToElements } from './BorderGlow';

class CardBoundary extends Component {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch(error) { console.warn('Card error:', error); }
  render() { return this.state.failed ? null : this.props.children; }
}

function ReadyCard() {
  useEffect(() => {
    const stage = document.querySelector('.lanyard-stage');
    if (stage) stage.classList.add('lanyard-ready');
    return () => { if (stage) stage.classList.remove('lanyard-ready'); };
  }, []);

  return (
    <TiltedCard
      imageSrc={portrait}
      altText="Kevin Samuel — Network & Software Engineer"
      captionText="Kevin Samuel • Online"
      containerHeight="100%"
      containerWidth="100%"
      imageHeight="460px"
      imageWidth="340px"
      rotateAmplitude={12}
      scaleOnHover={1.05}
      showMobileWarning={false}
      showTooltip={true}
      displayOverlayContent={true}
      overlayContent={
        <div className="tilted-card-glass-badge">
          <div>
            <h4 className="badge-name">Kevin Samuel</h4>
            <p className="badge-role">Network & Software Engineer</p>
          </div>
          <span className="badge-dot" title="Online / Available"></span>
        </div>
      }
    />
  );
}

function HeroMoltenBackground() {
  const [paused, setPaused] = useState(document.documentElement.classList.contains('motion-paused'));
  const [isLight, setIsLight] = useState(document.documentElement.getAttribute('data-theme') === 'light');

  useEffect(() => {
    const updateMotion = () => setPaused(document.documentElement.classList.contains('motion-paused'));
    const observer = new MutationObserver(() => {
      setIsLight(document.documentElement.getAttribute('data-theme') === 'light');
    });

    document.addEventListener('motionchange', updateMotion);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

    return () => {
      document.removeEventListener('motionchange', updateMotion);
      observer.disconnect();
    };
  }, []);

  return (
    <MoltenMetal
      color1={isLight ? "#805F47" : "#A75D28"}
      color2={isLight ? "#C09C79" : "#D5B799"}
      color3={isLight ? "#E8D8C6" : "#FFF5EB"}
      backgroundColor={isLight ? "#FAF8F5" : "#1C1916"}
      speed={paused ? 0 : 0.28}
      scale={3.8}
      detail={3}
      glow={1.5}
      coreSize={0.08}
      swirl={0.9}
      fold={-0.18}
      blackPoint={0.04}
      brightness={1.25}
      colorMode="molten"
      grain={true}
      grainIntensity={0.04}
      mouseInteraction={true}
      mouseStrength={0.25}
      opacity={isLight ? 0.65 : 0.88}
      lightMode={isLight}
    />
  );
}

function App() {
  const [paused, setPaused] = useState(document.documentElement.classList.contains('motion-paused'));
  useEffect(() => {
    const update = () => setPaused(document.documentElement.classList.contains('motion-paused'));
    document.addEventListener('motionchange', update);
    update();
    return () => document.removeEventListener('motionchange', update);
  }, []);

  useEffect(() => {
    const cleanup = applyBorderGlowToElements(
      '.bento-card, .project-item, .bento-item, .book__content, .project__card, .side-project__media-card, .side-project__info-card',
      {
        edgeSensitivity: 25,
        glowColor: '213 183 153',
        glowRadius: 36,
        glowIntensity: 0.9,
        coneSpread: 26,
        colors: ['#D5B799', '#C09C79', '#E8D8C6'],
        fillOpacity: 0.25,
      }
    );
    return cleanup;
  }, []);

  return paused ? null : (
    <CardBoundary>
      <Suspense fallback={null}>
        <ReadyCard />
      </Suspense>
    </CardBoundary>
  );
}

const moltenContainer = document.getElementById('hero-molten-bg') || document.getElementById('hero-plasma-bg');
if (moltenContainer) {
  if (!window.__moltenRoot) {
    window.__moltenRoot = createRoot(moltenContainer);
  }
  window.__moltenRoot.render(<HeroMoltenBackground />);
}

const cardContainer = document.getElementById('lanyard-root');
if (cardContainer) {
  if (!window.__cardRoot) {
    window.__cardRoot = createRoot(cardContainer);
  }
  window.__cardRoot.render(<App />);
}
