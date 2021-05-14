import React, { Dispatch, useState } from 'react';
import { EditorState } from 'draft-js';
import Tooltip from 'react-tooltip';
import { Bold, Italic, LinkIcon, Unlink } from '../../icons';

import ModalInsertLink from '../ModalInsertLink';
import { ButtonIconStyled, LineRCSEditorStyled } from './styled';

const BOLD = 'BOLD';
const ITALIC = 'ITALIC';

type Props = {
  editorState: EditorState;
  handleStyleEditor: (event: React.MouseEvent<HTMLButtonElement>) => void;
  handleRemoveLink: (event: React.MouseEvent<HTMLButtonElement>) => void;
  handleAddLink: () => void;
  showedText: string;
  linkUrl: string;
  setShowedText: Dispatch<string>;
  setLinkUrl: Dispatch<string>;
};

/**
 * Responsável por montar a linha de opções do editor de mensagem .
 */
export const RCSLineEditor = ({
  editorState,
  handleStyleEditor,
  handleAddLink,
  setLinkUrl,
  setShowedText,
  linkUrl,
  handleRemoveLink,
  showedText,
}: Props): JSX.Element => {
  const [linkModal, setLinkModal] = useState(false);
  const currentInlineStyle = editorState.getCurrentInlineStyle();

  const handleOpenLinkModal = () => {
    setLinkModal((old) => {
      if (!old) {
        const selectedText = window.getSelection()?.toString() || '';
        setShowedText(selectedText);
      }
      return !old;
    });
  };

  const handleCloseLinkModal = () => {
    setLinkModal(false);
  };

  const handleInsertLink = (event: React.MouseEvent) => {
    event.preventDefault();
    handleAddLink();
    setLinkModal(false);
  };

  const handleAlterShowedText = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setShowedText(event.target.value);
  };

  const handleAlterLinkUrl = (
    event: React.ChangeEvent<HTMLInputElement> | null
  ) => {
    if (event) {
      setLinkUrl(event.target.value);
    } else {
      setLinkUrl('');
    }
  };

  return (
    <LineRCSEditorStyled>
      <Tooltip>
        <ButtonIconStyled
          value={BOLD}
          onMouseDown={handleStyleEditor}
          active={currentInlineStyle.has(BOLD)}
          type="button"
        >
          <Bold width="20px" />
        </ButtonIconStyled>
      </Tooltip>
      <Tooltip>
        <ButtonIconStyled
          value={ITALIC}
          active={currentInlineStyle.has(ITALIC)}
          onMouseDown={handleStyleEditor}
          type="button"
        >
          <Italic width="20px" />
        </ButtonIconStyled>
      </Tooltip>
      <div style={{ position: 'relative' }}>
        <Tooltip>
          <ButtonIconStyled
            type="button"
            open={linkModal}
            onMouseDown={handleOpenLinkModal}
          >
            <LinkIcon width="20px" />
          </ButtonIconStyled>
        </Tooltip>
        {linkModal && (
          <ModalInsertLink
            setLinkModal={handleCloseLinkModal}
            textValue={showedText}
            linkValue={linkUrl}
            handleInsertLink={handleInsertLink}
            alterShowedText={handleAlterShowedText}
            alterLinkUrl={handleAlterLinkUrl}
          />
        )}
      </div>
      <Tooltip>
        <ButtonIconStyled type="button" onMouseDown={handleRemoveLink}>
          <Unlink width="20px" />
        </ButtonIconStyled>
      </Tooltip>
    </LineRCSEditorStyled>
  );
};

export default RCSLineEditor;
