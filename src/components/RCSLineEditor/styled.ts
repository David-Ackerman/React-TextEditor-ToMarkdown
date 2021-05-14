import styled from 'styled-components';

export const LineRCSEditorStyled = styled.fieldset`
  display: flex;
  align-items: center;
  background: #f9f9f9;
  border-bottom: 1px solid #e4e6f1;
  height: 35px;
  padding: 0 5px;
  > span {
    margin: 0 10px;
  }
`;
export const ButtonIconStyled = styled.button<{
  open?: boolean;
  active?: boolean;
}>`
  background: none;
  border: none;
  cursor: pointer;
  :focus {
    outline: none;
  }
  :hover {
    path {
      fill: #117eff;
    }
  }
  ${(props) => props.open && `path { fill:  #117eff;}`}
  ${(props) => props.active && `path { fill:  #117eff;}`}
`;
