import styled from "styled-components";

export const Container = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  border: 2px solid rgb(131, 148, 245);
  width: 100%;
  max-width: 400px;
  margin: 30px;
  background: #fff;
  border-radius: 4px;
  padding: 20px;
`;

export const Button = styled.button`
  /* Adapt the colors based on primary prop */
  background: rgb(222, 227, 255);
  color: #000;

  font-size: 1em;

  padding: 0.75em 1.5em;
  border: 2px solid rgb(131, 148, 245);
  border-radius: 3px;
  transition: background-color 0.3s;

  &:hover {
    background-color: rgb(131, 148, 245);
  }

  &:active {
    background-color: rgb(222, 227, 255);
  }
`;
