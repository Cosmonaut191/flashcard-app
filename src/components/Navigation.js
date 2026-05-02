import React from 'react';
import styled from 'styled-components';

const NavContainer = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
`;

const NavButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.5rem;
  min-width: 100px;
  background: ${(props) => (props.$primary ? props.theme.primary : props.theme.surface)};
  color: ${(props) => (props.$primary ? '#fff' : props.theme.text)};
  border: 1px solid ${(props) => (props.$primary ? 'transparent' : props.theme.cardBorder)};
  border-radius: 14px;
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: ${(props) => props.theme.cardShadow};

  &:hover {
    background: ${(props) => (props.$primary ? props.theme.primaryHover : props.theme.primaryMuted)};
    color: ${(props) => (props.$primary ? '#fff' : props.theme.primary)};
    transform: translateY(-2px);
    box-shadow: ${(props) => props.theme.cardShadowHover};
  }

  &:active {
    transform: translateY(0);
  }
`;

function Navigation({ onPrevious, onNext, onFlip }) {
  return (
    <NavContainer>
      <NavButton onClick={onPrevious}>← Previous</NavButton>
      <NavButton $primary onClick={onFlip}>Flip</NavButton>
      <NavButton onClick={onNext}>Next →</NavButton>
    </NavContainer>
  );
}

export default Navigation;
