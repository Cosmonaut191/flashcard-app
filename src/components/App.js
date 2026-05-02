import React, { useState, useMemo } from 'react';
import styled from 'styled-components';
import Flashcard from './Flashcard';
import Navigation from './Navigation';
import ProgressBar from './ProgressBar';
import ThemeToggle from './ThemeToggle';
import SideMenu from './SideMenu';
import TopicSelectModal from './TopicSelectModal';
import flashcardsData from '../data/flashcards.json';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from '../styles/theme';
import { GlobalStyles } from '../styles/GlobalStyles';

const topics = flashcardsData.topics;

const AppWrapper = styled.main`
  min-height: 100vh;
  padding: 1.5rem 1rem 3rem;
  max-width: 560px;
  margin: 0 auto;
  position: relative;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  gap: 1rem;
`;

const MenuButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 12px;
  border: 1px solid ${(props) => props.theme.cardBorder};
  background: ${(props) => props.theme.surface};
  color: ${(props) => props.theme.text};
  cursor: pointer;
  font-size: 1.25rem;
  transition: background 0.2s, transform 0.15s;
  box-shadow: ${(props) => props.theme.cardShadow};

  &:hover {
    background: ${(props) => props.theme.primaryMuted};
    color: ${(props) => props.theme.primary};
    transform: translateY(-1px);
  }
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
  letter-spacing: -0.02em;
  color: ${(props) => props.theme.text};
  margin: 0;
  flex: 1;
  text-align: center;
`;

const ChangeTopicButton = styled.button`
  padding: 0.5rem 0.75rem;
  font-size: 0.8rem;
  font-weight: 500;
  color: ${(props) => props.theme.primary};
  background: ${(props) => props.theme.primaryMuted};
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
  white-space: nowrap;

  &:hover {
    background: ${(props) => props.theme.primary};
    color: #fff;
  }
`;

const CardSection = styled.section`
  margin: 2rem 0 2.5rem;
`;

const NavSection = styled.section`
  margin-top: 2rem;
`;

function App() {
  const [selectedTopicId, setSelectedTopicId] = useState(null);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

  const selectedTopic = useMemo(
    () => topics.find((t) => t.id === selectedTopicId),
    [selectedTopicId]
  );
  const cards = selectedTopic ? selectedTopic.cards : [];

  const handleSelectTopic = (topicId) => {
    setSelectedTopicId(topicId);
    setCurrentCardIndex(0);
    setIsFlipped(false);
  };

  const handleChangeTopic = () => {
    setSelectedTopicId(null);
    setCurrentCardIndex(0);
    setIsFlipped(false);
    setIsSideMenuOpen(false);
  };

  const handlePrevious = () => {
    setCurrentCardIndex((prev) =>
      prev > 0 ? prev - 1 : cards.length - 1
    );
    setIsFlipped(false);
  };

  const handleNext = () => {
    setCurrentCardIndex((prev) =>
      prev < cards.length - 1 ? prev + 1 : 0
    );
    setIsFlipped(false);
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleThemeToggle = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleSideMenuToggle = () => {
    setIsSideMenuOpen(!isSideMenuOpen);
  };

  const handleQuestionSelect = (index) => {
    setCurrentCardIndex(index);
    setIsFlipped(false);
    setIsSideMenuOpen(false);
  };

  const showTopicModal = selectedTopicId === null;

  if (showTopicModal) {
    return (
      <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
        <GlobalStyles />
        <div style={{ position: 'fixed', top: '1rem', right: '1rem', zIndex: 1200 }}>
          <ThemeToggle isDarkMode={isDarkMode} onToggle={handleThemeToggle} />
        </div>
        <TopicSelectModal
          topics={topics}
          onSelectTopic={handleSelectTopic}
        />
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <GlobalStyles />
      <AppWrapper className="App">
        <Header>
          <MenuButton onClick={handleSideMenuToggle} aria-label="Open menu">
            ☰
          </MenuButton>
          <Title>{selectedTopic.name}</Title>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ChangeTopicButton onClick={handleChangeTopic}>
              Change topic
            </ChangeTopicButton>
            <ThemeToggle isDarkMode={isDarkMode} onToggle={handleThemeToggle} />
          </div>
        </Header>

        <ProgressBar
          currentCard={currentCardIndex + 1}
          totalCards={cards.length}
        />

        <CardSection>
          <Flashcard
            question={cards[currentCardIndex].question}
            answer={cards[currentCardIndex].answer}
            isFlipped={isFlipped}
            onFlip={handleFlip}
          />
        </CardSection>

        <NavSection>
          <Navigation
            onPrevious={handlePrevious}
            onNext={handleNext}
            onFlip={handleFlip}
          />
        </NavSection>

        <SideMenu
          isOpen={isSideMenuOpen}
          onClose={handleSideMenuToggle}
          questions={cards.map((card) => card.question)}
          currentIndex={currentCardIndex}
          onQuestionSelect={handleQuestionSelect}
        />
      </AppWrapper>
    </ThemeProvider>
  );
}

export default App;
