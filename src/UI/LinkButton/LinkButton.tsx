import clsx from 'clsx';
import React from 'react';
import style from './LinkButton.module.scss';

type Props = {
  callback: () => void;
  text: string;
  additionClassName?: string;
};
export const LinkButton: React.FC<Props> = ({
  callback,
  text,
  additionClassName,
}) => {
  return (
    <div
      className={clsx(style.link, additionClassName && additionClassName)}
      onClick={callback}
    >
      {text}
    </div>
  );
};
