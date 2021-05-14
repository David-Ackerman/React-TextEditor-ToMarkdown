import React, { Dispatch, useEffect, useRef } from 'react';
import { useOutsideAlerter } from '../../hooks/useOutsideAlerter';
import { ModalBodyStyled } from './styled';

type Props = {
  alterShowedText: (event: React.ChangeEvent<HTMLInputElement>) => void;
  alterLinkUrl: (event: React.ChangeEvent<HTMLInputElement> | null) => void;
  setLinkModal: Dispatch<boolean>;
  bottom?: boolean;
  textValue?: string;
  hasSendButton?: boolean;
  handleInsertLink?: (event: React.MouseEvent) => void;
  linkValue?: string;
};

export const ModalInsertLink = ({
  alterLinkUrl,
  alterShowedText,
  setLinkModal,
  bottom = false,
  handleInsertLink,
  linkValue,
  hasSendButton = true,
  textValue,
}: Props): JSX.Element => {
  const modalLinkRef = useRef(null);

  useOutsideAlerter({ ref: modalLinkRef, setDropdown: setLinkModal });

  useEffect(() => {
    alterLinkUrl(null);
  }, []);

  return (
    <ModalBodyStyled bottom={bottom} ref={modalLinkRef}>
      <div>
        <label>Texto para Exibir</label>
        <input type="text" value={textValue} onChange={alterShowedText} />
        <label>URL do link</label>
        <input type="url" value={linkValue} onChange={alterLinkUrl} />
      </div>
      {hasSendButton && (
        <button type="button" onMouseDown={handleInsertLink}>
          Inserir Link
        </button>
      )}
    </ModalBodyStyled>
  );
};

export default ModalInsertLink;
