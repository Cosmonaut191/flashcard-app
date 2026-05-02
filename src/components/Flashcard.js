import React from 'react';
import styled from 'styled-components';

const Card = styled.div`
  width: 100%;
  max-width: 420px;
  min-height: 260px;
  perspective: 1200px;
  margin: 0 auto;
  cursor: pointer;
`;

const CardInner = styled.div`
  width: 100%;
  min-height: 260px;
  transition: transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
  transform-style: preserve-3d;
  transform: ${(props) => (props.$isFlipped ? 'rotateY(180deg)' : 'none')};
  position: relative;
`;

const CardFace = styled.div`
  position: absolute;
  inset: 0;
  width: 100%;
  min-height: 260px;
  backface-visibility: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 1.75rem;
  border-radius: 20px;
  box-shadow: ${(props) => props.theme.cardShadow};
  background: ${(props) => props.theme.cardBackground};
  border: 1px solid ${(props) => props.theme.cardBorder};
  transition: box-shadow 0.3s ease;

  ${Card}:hover & {
    box-shadow: ${(props) => props.theme.cardShadowHover};
  }
`;

const CardBack = styled(CardFace)`
  transform: rotateY(180deg);
`;

const CardText = styled.p`
  margin: 0;
  font-size: 1.05rem;
  line-height: 1.65;
  color: ${(props) => props.theme.text};
  font-weight: 500;
  white-space: pre-wrap;
  text-align: center;
`;

const CardBackText = styled(CardText)`
  font-weight: 400;
  text-align: left;
  font-size: 0.98rem;
`;

const FlipHint = styled.span`
  position: absolute;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  font-size: 0.75rem;
  color: ${(props) => props.theme.textMuted};
  font-weight: 400;
  opacity: 0;
  transition: opacity 0.25s;

  ${Card}:hover & {
    opacity: 1;
  }
`;

function Flashcard({ question, answer, isFlipped, onFlip }) {
  return (
    <Card onClick={onFlip} role="button" tabIndex={0} onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onFlip?.()} aria-label="Flip card">
      <CardInner $isFlipped={isFlipped}>
        <CardFace>
          <CardText>{question}</CardText>
          <FlipHint>Click to flip</FlipHint>
        </CardFace>
        <CardBack>
          <CardBackText>{answer}</CardBackText>
        </CardBack>
      </CardInner>
    </Card>
  );
}

export default Flashcard;
