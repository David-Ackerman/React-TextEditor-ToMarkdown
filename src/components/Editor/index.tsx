import React from 'react';
import { Editor as EditorField } from 'draft-js';

import 'draft-js/dist/Draft.css';
import { EditorStyled, ContentTextareaStyled } from './styled';

import useEditor from './useEditor';
import RCSLineEditor from '../RCSLineEditor';

const Editor = (): JSX.Element => {
  const {
    editorRef,
    linkUrl,
    setLinkUrl,
    showedText,
    setShowedText,
    editorState,
    handleStyleEditor,
    setEditorState,
    handleCreateLink,
    handleRemoveLink,
  } = useEditor();

  return (
    <>
      <p>Mensagem de Texto</p>
      <EditorStyled>
        <ContentTextareaStyled>
          <RCSLineEditor
            linkUrl={linkUrl}
            setLinkUrl={setLinkUrl}
            setShowedText={setShowedText}
            showedText={showedText}
            editorState={editorState}
            handleStyleEditor={handleStyleEditor}
            handleAddLink={handleCreateLink}
            handleRemoveLink={handleRemoveLink}
          />
          <div className="draft-editor-wrapper">
            <EditorField
              ref={editorRef}
              editorState={editorState}
              onChange={setEditorState}
              placeholder="Digite sua mensagem"
            />
          </div>
        </ContentTextareaStyled>
      </EditorStyled>
    </>
  );
};

export default Editor;
