import React from 'react';
import styled from 'styled-components';

const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0.75rem 0;
  overflow-y: auto;
  flex: 1;
  min-height: 0;
`;

const ListItem = styled.li`
  padding: 0.75rem 1.5rem;
  cursor: pointer;
  font-size: 0.9rem;
  line-height: 1.4;
  color: ${(props) => props.theme.text};
  background: ${(props) => (props.$isActive ? props.theme.primaryMuted : 'transparent')};
  border-left: 3px solid ${(props) => (props.$isActive ? props.theme.primary : 'transparent')};
  transition: background 0.2s, border-color 0.2s;

  &:hover {
    background: ${(props) => props.theme.primaryMuted};
    border-left-color: ${(props) => props.theme.primary};
  }
`;

const ItemNumber = styled.span`
  display: inline-block;
  min-width: 1.5rem;
  font-weight: 600;
  color: ${(props) => (props.$isActive ? props.theme.primary : props.theme.textMuted)};
  margin-right: 0.5rem;
`;

function QuestionList({ questions, currentIndex, onQuestionSelect }) {
  return (
    <List>
      {questions.map((question, index) => (
        <ListItem
          key={index}
          $isActive={index === currentIndex}
          onClick={() => onQuestionSelect(index)}
        >
          <ItemNumber $isActive={index === currentIndex}>{index + 1}.</ItemNumber>
          {question.length > 60 ? `${question.slice(0, 60)}…` : question}
        </ListItem>
      ))}
    </List>
  );
}

export default QuestionList;
