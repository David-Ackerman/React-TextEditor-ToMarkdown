import styled, { css } from 'styled-components';

const cssBottom = css`
  bottom: 90%;
  left: calc(50% - 190px);
  width: 380px;
  ::after {
    top: 100%;
    border-color: #ffffff transparent transparent transparent;
    left: 50%;
  }
`;
const cssDefault = css`
  left: 0;
  top: 40px;
  margin-left: -30px;
  width: 351px;
  ::after {
    bottom: 100%;
    left: 40px;
    margin-left: -5px;
    border-color: transparent transparent #ffffff transparent;
  }
`;
export const ModalBodyStyled = styled.div<{ bottom: boolean }>`
  position: absolute;
  ${(props) => (props.bottom ? cssBottom : cssDefault)}

  padding: 13px 15px 13px 10px;
  box-shadow: 1px 1px 10px #00000029;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 300;
  border-radius: 5px;
  ::after {
    content: ' ';
    position: absolute;

    border-width: 5px;
    border-style: solid;
  }

  > div {
    width: 100%;
    margin-bottom: 10px;
    input {
      outline: none;
      width: 100%;
      height: 30px;
      border: 1px solid #e4e6f1;
      border-radius: 5px;
      color: #3e4157;
      margin-top: 5px;
      padding-left: 10px;
    }
  }
`;
