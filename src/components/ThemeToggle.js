import React from 'react';
import styled from 'styled-components';

const ToggleContainer = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 12px;
  border: 1px solid ${(props) => props.theme.cardBorder};
  background: ${(props) => props.theme.surface};
  color: ${(props) => props.theme.text};
  font-size: 1.25rem;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: ${(props) => props.theme.cardShadow};

  &:hover {
    background: ${(props) => props.theme.primaryMuted};
    color: ${(props) => props.theme.primary};
    transform: translateY(-1px);
  }

  &:focus-visible {
    outline: 2px solid ${(props) => props.theme.primary};
    outline-offset: 2px;
  }
`;

function ThemeToggle({ isDarkMode, onToggle }) {
  return (
    <ToggleContainer onClick={onToggle} aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}>
      {isDarkMode ? '☀️' : '🌙'}
    </ToggleContainer>
  );
}

export default ThemeToggle;
