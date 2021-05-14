import styled from 'styled-components';

export const EditorStyled = styled.div`
  width: 100%;
  height: calc(100% - 120px);
  border: 1px solid #e4e6f1;
  position: relative;
`;

export const ContentListVariablesStyled = styled.div`
  width: 305px;
  height: 100%;
  position: absolute;
  right: 0;
  top: 0;
`;

export const ContentTextareaStyled = styled.div`
  width: calc(100% - 305px);
  height: 100%;
  /* position: relative; */

  .draft-editor-wrapper {
    width: 100%;
    height: 92%;
    div {
      height: 100%;
    }
    border: 0;
    outline: 0;
    resize: none;
    padding: 15px 20px;
    font-size: 20px;
    color: #3e4157;
  }
`;

export const TextAreaStyled = styled.textarea`
  width: 100%;
  height: 91%;
  border: 0;
  outline: 0;
  resize: none;
  padding: 15px 20px;
  font-size: 20px;
  color: #3e4157;
  font-family: 'Gotham';
  background: #fff;
  &disabled {
    background: #fff;
  }
  ::placeholder {
    font-family: 'Gotham';
    font-size: 20px;
    color: #3e4157;
    font-weight: bold;
  }
`;
