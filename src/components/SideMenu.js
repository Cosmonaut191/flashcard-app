import React from 'react';
import styled from 'styled-components';
import QuestionList from './QuestionList';

const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  background: ${(props) => props.theme.overlay};
  opacity: ${(props) => (props.$isOpen ? 1 : 0)};
  visibility: ${(props) => (props.$isOpen ? 'visible' : 'hidden')};
  transition: opacity 0.3s ease, visibility 0.3s ease;
  z-index: 999;
`;

const MenuPanel = styled.aside`
  position: fixed;
  top: 0;
  right: 0;
  width: min(320px, 90vw);
  height: 100%;
  background: ${(props) => props.theme.surface};
  box-shadow: -8px 0 32px rgba(0, 0, 0, 0.15);
  transform: translateX(${(props) => (props.$isOpen ? '0' : '100%')});
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  border-left: 1px solid ${(props) => props.theme.cardBorder};
`;

const MenuHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid ${(props) => props.theme.cardBorder};
`;

const MenuTitle = styled.h2`
  margin: 0;
  font-size: 1.125rem;
  font-weight: 600;
  color: ${(props) => props.theme.text};
`;

const CloseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 10px;
  background: transparent;
  color: ${(props) => props.theme.textMuted};
  font-size: 1.5rem;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;

  &:hover {
    background: ${(props) => props.theme.primaryMuted};
    color: ${(props) => props.theme.primary};
  }
`;

function SideMenu({ isOpen, onClose, questions, currentIndex, onQuestionSelect }) {
  return (
    <>
      <Backdrop $isOpen={isOpen} onClick={onClose} aria-hidden="true" />
      <MenuPanel $isOpen={isOpen} role="dialog" aria-label="Question list">
        <MenuHeader>
          <MenuTitle>All questions</MenuTitle>
          <CloseButton onClick={onClose} aria-label="Close menu">&times;</CloseButton>
        </MenuHeader>
        <QuestionList
          questions={questions}
          currentIndex={currentIndex}
          onQuestionSelect={onQuestionSelect}
        />
      </MenuPanel>
    </>
  );
}

export default SideMenu;
