import React from 'react';
import styled from 'styled-components';

const ProgressContainer = styled.div`
  margin-bottom: 1rem;
`;

const ProgressTrack = styled.div`
  height: 8px;
  background: ${(props) => props.theme.backgroundAlt};
  border-radius: 999px;
  overflow: hidden;
  margin-bottom: 0.5rem;
`;

const ProgressFill = styled.div`
  height: 100%;
  width: ${(props) => (props.$progress ?? 0)}%;
  background: linear-gradient(90deg, ${(props) => props.theme.primary}, ${(props) => props.theme.primaryHover});
  border-radius: 999px;
  transition: width 0.4s ease;
`;

const ProgressLabel = styled.span`
  font-size: 0.875rem;
  font-weight: 500;
  color: ${(props) => props.theme.textMuted};
`;

function ProgressBar({ currentCard, totalCards }) {
  const progress = totalCards ? (currentCard / totalCards) * 100 : 0;

  return (
    <ProgressContainer>
      <ProgressTrack>
        <ProgressFill $progress={progress} />
      </ProgressTrack>
      <ProgressLabel>
        Card {currentCard} of {totalCards}
      </ProgressLabel>
    </ProgressContainer>
  );
}

export default ProgressBar;
