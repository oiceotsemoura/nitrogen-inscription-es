import styled from "styled-components";

export const Card = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 30px;
  background-color: #f0f0f0;
`;

export const InputField = styled.input`
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 25px;
  padding: 8px;
  margin-right: 10px;
  width: 95%;
  background-color: #f0f0f0;
`;

export const Label = styled.label`
  font-size: 14px;
  margin-bottom: 4px;
`;
