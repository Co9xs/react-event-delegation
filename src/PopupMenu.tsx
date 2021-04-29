import * as React from 'react';
import styled from 'styled-components';
import { Dispatch, SetStateAction, useCallback, useEffect, useRef, useState } from 'react';

type Props = {
}

export const PopupMenu: React.VFC<Props> = (props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const dialogRef = useRef<HTMLDivElement | null>(null);

  const outsideClickHandler = (e: MouseEvent) => {
    if (dialogRef.current?.contains(e.target as Node)) return
    setIsOpen(false)
    removeOutsideClickHandler()
  }

  const openButtonClickHandler = useCallback(() => {
    setIsOpen(true)
    addOutsideClickHandler()
  }, [])

  const closeButtonClickHandler = useCallback(() => {
    setIsOpen(false)
    removeOutsideClickHandler()
  }, [])

  const addOutsideClickHandler = useCallback(() => {
    console.log('追加しました')
    document.addEventListener('click', outsideClickHandler)
  }, [])

  const removeOutsideClickHandler = useCallback(() => {
    console.log('削除しました')
    document.removeEventListener('click', outsideClickHandler)
  }, [])

  return (
    <>
      <DialogOpenButton onClick={openButtonClickHandler}>ボタン</DialogOpenButton>
      <DialogContent data-dialog-active={isOpen} ref={dialogRef}>
        <DialogCloseButton onClick={closeButtonClickHandler}>x</DialogCloseButton>
      </DialogContent>
    </>
  )
};

const DialogContent = styled.div`
  border-radius: 9px;
  width: 400px;
  max-width: 86vw;
  text-align: center;
  padding: .25rem .5rem .5rem;
  box-shadow: 0 3px 10px rgb(0 22 103 / 20%);
  line-height: 1.7;
  background: #FFF;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
	transition: all 0.5s;
  display: none;
  &[data-dialog-active="true"] {
    display:block;
  }
`;

const DialogOpenButton = styled.button`
`;

const DialogCloseButton = styled.button`
`;