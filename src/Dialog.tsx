import * as React from 'react';
import styled from 'styled-components';
import { Dispatch, SetStateAction, useCallback, useEffect, useRef } from 'react';

type Props = {
  dialogOpen: boolean,
  setDialogOpen: Dispatch<SetStateAction<boolean>>,
  children: React.ReactNode,
}

export const Dialog: React.VFC<Props> = (props) => {
  const { dialogOpen, setDialogOpen, children } = props;
  const dialogRef = useRef<HTMLDivElement | null>(null);

  const outsideClickHandler = useCallback((e: MouseEvent) => {
    if (dialogRef.current?.contains(e.target as Node)) return
    setDialogOpen(false)
    removeOutsideClickHandler()
  }, [dialogRef])

  const closeButtonClickHandler = useCallback(() => {
    setDialogOpen(false)
    removeOutsideClickHandler();
  }, [])

  const addOutsideClickHandler = useCallback(() => {
    document.body.addEventListener('click', outsideClickHandler)
  }, [])

  const removeOutsideClickHandler = useCallback(() => {
    document.body.removeEventListener('click', outsideClickHandler)
  }, [])

  useEffect(() => {
    if (dialogOpen) {
      addOutsideClickHandler();
    }
    return () => {
      removeOutsideClickHandler();
    };
  },[dialogOpen]);

  return (
    <React.Fragment>
      <DialogBackground data-dialog-active={dialogOpen}>
        <DialogContent data-dialog-active={dialogOpen} ref={dialogRef} aria-modal>
          <DialogHeader>
            <DialogCloseButton onClick={closeButtonClickHandler}>x</DialogCloseButton>
          </DialogHeader>
          <DialogBody>
            { children }
          </DialogBody>
        </DialogContent>
      </DialogBackground>
    </React.Fragment>
  )
};

const DialogBackground = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  background-color: rgba(0,0,0,0.25);
  z-index: 10;
  overflow: hidden;
  display: none;
  &[data-dialog-active="true"] {
    display: block;
  }
`;

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

const DialogHeader = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const DialogCloseButton = styled.button`
`;

const DialogBody = styled.div`
`;