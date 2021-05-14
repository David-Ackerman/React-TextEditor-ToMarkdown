import { useState, useRef, MutableRefObject, useEffect } from 'react';
import {
  CompositeDecorator,
  convertFromRaw,
  convertToRaw,
  EditorState,
  Modifier,
  RichUtils,
  SelectionState,
  Editor,
  ContentBlock,
  ContentState,
} from 'draft-js';
import { draftToMarkdown, markdownToDraft } from 'markdown-draft-js';

import LinkComponent from '../LinkComponent';

/**
 * Responsavel por adicionar a entidade de link ao editor de mensagem
 */
export function findLinkEntities(
  contentBlock: ContentBlock,
  callback: (start: number, end: number) => void,
  contentState: ContentState
): void {
  contentBlock.findEntityRanges((character) => {
    const entityKey = character.getEntity();
    return (
      entityKey !== null &&
      contentState.getEntity(entityKey).getType() === 'LINK'
    );
  }, callback);
}

type UseEditor = {
  editorRef: MutableRefObject<Editor> | MutableRefObject<null>;
  linkUrl: string;
  setLinkUrl: React.Dispatch<string>;
  showedText: string;
  setShowedText: React.Dispatch<string>;
  editorState: EditorState;
  setEditorState: React.Dispatch<EditorState>;
  handleStyleEditor: (event: React.MouseEvent<HTMLButtonElement>) => void;
  handleCreateLink: () => void;
  handleRemoveLink: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

function useEditor(): UseEditor {
  const [mdContent, setMdContent] = useState('');

  const decorator = new CompositeDecorator([
    {
      strategy: findLinkEntities,
      component: LinkComponent,
    },
  ]);
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty(decorator)
  );
  const editorRef = useRef<Editor>(null);
  const [showedText, setShowedText] = useState('');
  const [linkUrl, setLinkUrl] = useState('');

  useEffect(() => {
    // handleUpdateEditor(mdContent);
  }, [mdContent]);

  useEffect(() => {
    exportMarkdown();
  }, [editorState]);

  useEffect(() => {
    importHTML();
  }, []);

  /**
   * Responsável por aplicar o estilo de bold e de italico no editor de mensagem
   */
  const handleStyleEditor = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const style = event.currentTarget.getAttribute('value') || '';
    setEditorState(RichUtils.toggleInlineStyle(editorState, style));
    editorRef.current?.focus();
  };

  /**
   * Responsável por exportar o conteudo do editor para uma sintaxe de markdown
   */
  const exportMarkdown = () => {
    setMdContent(
      draftToMarkdown(convertToRaw(editorState.getCurrentContent()))
    );
  };

  /**
   * Responsável por importar o conteudo markdown da api para o editor de mensagem
   */
  const importHTML = () => {
    setEditorState(
      EditorState.push(
        editorState,
        convertFromRaw(markdownToDraft(mdContent)),
        'insert-characters'
      )
    );
  };

  /**
   * Responsável por adicionar um link no editor de mensagem
   */
  const handleCreateLink = () => {
    const selection = editorState.getSelection();
    const contentState = editorState.getCurrentContent();
    const startKey = selection.getStartKey();
    const startOffset = selection.getStartOffset();
    const endKey = selection.getEndKey();

    const changedText = Modifier.replaceText(
      contentState,
      selection,
      showedText
    );
    const updateSelection = new SelectionState({
      anchorKey: startKey,
      anchorOffset: startOffset,
      focusKey: endKey,
      focusOffset: startOffset + showedText.length,
    });

    const newChangedText = EditorState.forceSelection(
      EditorState.set(editorState, {
        currentContent: changedText,
      }),
      updateSelection
    );

    const contentStateWithEntity = newChangedText
      .getCurrentContent()
      .createEntity('LINK', 'MUTABLE', {
        url: linkUrl,
      });
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(newChangedText, {
      currentContent: contentStateWithEntity,
    });
    setEditorState(
      RichUtils.toggleLink(
        newEditorState,
        newEditorState.getSelection(),
        entityKey
      )
    );

    setTimeout(() => editorRef.current?.focus(), 0);
  };

  /**
   * Responsável por remover o link selecionado no editor de mensagem
   */
  const handleRemoveLink = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const selection = editorState.getSelection();
    if (!selection.isCollapsed()) {
      setEditorState(RichUtils.toggleLink(editorState, selection, null));
    }
  };

  /**
   * Responsável por inserir o conteudo das variaveis no editor de mensagem.
   */
  const handleInsertVariable = (text: string) => {
    const contentState = editorState.getCurrentContent();
    const targetRange = editorState.getSelection();
    const newContentState = Modifier.replaceText(
      contentState,
      targetRange,
      text
    );
    const newEditorState = EditorState.push(
      editorState,
      newContentState,
      'insert-characters'
    );
    setEditorState(newEditorState);
    editorRef.current?.focus();
  };

  return {
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
  };
}

export default useEditor;
