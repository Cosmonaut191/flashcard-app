import React from 'react';
import styled from 'styled-components';

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: ${(props) => props.theme.overlay};
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1100;
  padding: 1.5rem;
  animation: fadeIn 0.25s ease;
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;

const Modal = styled.div`
  background: ${(props) => props.theme.surface};
  border-radius: 20px;
  max-width: 440px;
  width: 100%;
  max-height: 85vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 0 24px 48px rgba(0, 0, 0, 0.2);
  border: 1px solid ${(props) => props.theme.cardBorder};
  animation: slideUp 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(20px) scale(0.98);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }
`;

const Header = styled.div`
  padding: 1.5rem 1.5rem 0.5rem;
  text-align: center;
`;

const Title = styled.h2`
  margin: 0 0 0.25rem;
  font-size: 1.5rem;
  font-weight: 600;
  color: ${(props) => props.theme.text};
  letter-spacing: -0.02em;
`;

const Subtitle = styled.p`
  margin: 0;
  font-size: 0.9rem;
  color: ${(props) => props.theme.textMuted};
`;

const TopicList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 1rem 1.5rem 1.5rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const TopicButton = styled.button`
  display: block;
  width: 100%;
  text-align: left;
  padding: 1rem 1.25rem;
  background: ${(props) => props.theme.cardBackground};
  border: 1px solid ${(props) => props.theme.cardBorder};
  border-radius: 14px;
  color: ${(props) => props.theme.text};
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: ${(props) => props.theme.cardShadow};

  &:hover {
    border-color: ${(props) => props.theme.primary};
    background: ${(props) => props.theme.primaryMuted};
    color: ${(props) => props.theme.primary};
    transform: translateY(-2px);
    box-shadow: ${(props) => props.theme.cardShadowHover};
  }

  &:focus-visible {
    outline: 2px solid ${(props) => props.theme.primary};
    outline-offset: 2px;
  }
`;

const TopicName = styled.span`
  display: block;
  margin-bottom: 0.2rem;
`;

const TopicMeta = styled.span`
  font-size: 0.8rem;
  font-weight: 400;
  color: ${(props) => props.theme.textMuted};
`;

const TopicDescription = styled.span`
  display: block;
  font-size: 0.8rem;
  font-weight: 400;
  color: ${(props) => props.theme.textMuted};
  margin-top: 0.25rem;
  line-height: 1.35;
`;

function TopicSelectModal({ topics, onSelectTopic }) {
  return (
    <Overlay role="dialog" aria-modal="true" aria-labelledby="topic-modal-title">
      <Modal onClick={(e) => e.stopPropagation()}>
        <Header>
          <Title id="topic-modal-title">Choose a topic</Title>
          <Subtitle>Select a topic to start studying</Subtitle>
        </Header>
        <TopicList>
          {topics.map((topic) => (
            <li key={topic.id}>
              <TopicButton
                type="button"
                onClick={() => onSelectTopic(topic.id)}
              >
                <TopicName>{topic.name}</TopicName>
                {topic.description && (
                  <TopicDescription>{topic.description}</TopicDescription>
                )}
                <TopicMeta>{topic.cards.length} cards</TopicMeta>
              </TopicButton>
            </li>
          ))}
        </TopicList>
      </Modal>
    </Overlay>
  );
}

export default TopicSelectModal;
