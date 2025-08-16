import styled from 'styled-components';

// Main container for the buttons
export const ComponentsBtnContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background-color: #f4f7f6;
  flex-wrap: wrap; 
  @media (min-width: 576px), (max-width: 576px){
     margin-top: 30px; 
  }
  @media (min-width: 756px){
    margin-top: 50px; 
  }
`;

// Base styles for all buttons
const ButtonBase = styled.button`
  font-family: 'Roboto', sans-serif;
  padding: 12px 28px;
  border: 2px solid transparent;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  background-color: #ffffff;
  color: #333;

  /* Style for the active button */
  &.active {
    background-color: #007bff;
    color: #ffffff;
  }

  &:hover {
    transform: translateY(-2px);
  }
`;

// Individual button components inheriting the base style
export const Btn1 = styled(ButtonBase)``;
export const Btn2 = styled(ButtonBase)``;
export const Btn3 = styled(ButtonBase)``;
export const Btn4 = styled(ButtonBase)``;
export const Btn5 = styled(ButtonBase)``;