import React from 'react';
import { ContentState } from 'draft-js';

type LinkProps = {
  contentState: ContentState;
  entityKey: string;
  children: React.ReactNode;
};

const LinkComponent = ({
  contentState,
  entityKey,
  children,
}: LinkProps): JSX.Element => {
  const { url } = contentState.getEntity(entityKey).getData();

  return (
    <a
      style={{ textDecoration: 'underline', color: '#117EFF' }}
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      title={url}
      className="link"
    >
      {children}
    </a>
  );
};

export default LinkComponent;
