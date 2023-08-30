import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 30px;
  background-color: #f0f0f0;
`;

export const FormContainer = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
`;

export const Label = styled.label`
  font-size: 14px;
  margin-bottom: 4px;
`;

export const Input = styled.input`
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 12px;
  margin-left: 10px;
  margin-right: 10px;
  width: 100%;
  background-color: #f0f0f0;
`;

export const Button = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
`;

export const CardWrapper = styled.div`
  margin-top: 16px;
`;
