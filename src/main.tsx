import * as React from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
import * as ReactDOM from 'react-dom';
import styled from 'styled-components'
import { Dialog } from './Dialog';

type Props = {}

const App: React.VFC<Props> = () => {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false)
  const dialogRef = useRef<HTMLDivElement | null>(null)

  const documentClickHandler = useCallback((e: MouseEvent) => {
    if (dialogRef.current?.contains(e.target as Node)) return
    setDialogOpen(false)
    // removeDocumentClickHandler()
  }, [dialogRef])

  const removeDocumentClickHandler = () => {
    console.log('削除しました')
    document.removeEventListener('click', documentClickHandler)
  }

  const addDocumentClickHandler = () => {
    console.log('設定しました')
    document.addEventListener('click', documentClickHandler)
  }

  const handleOpenButtonClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    // e.stopPropagation()
    setDialogOpen(true)
    // addDocumentClickHandler()
  }

  const handleCloseButtonClick: React.MouseEventHandler<HTMLButtonElement> = () => {
    setDialogOpen(false)
    // removeDocumentClickHandler()
  }

  useEffect(() => {
    if (dialogOpen) {
      addDocumentClickHandler()
    }
    return () => {
      removeDocumentClickHandler()
    }
  }, [dialogOpen])

  return (
    <>
      <h1>React-v17-event-delegation-test</h1>
      <button onClick={handleOpenButtonClick} >open</button>
      {/* <Dialog
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
      >
        content
      </Dialog> */}
        {/* <DialogBackground data-dialog-active={dialogOpen}> */}
          <DialogContent data-dialog-active={dialogOpen} ref={dialogRef}>
            <div>modalの中身</div>
            <button onClick={handleCloseButtonClick}>
              close
            </button>
          </DialogContent>
        {/* </DialogBackground> */}
    </>
  )
}

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
`

ReactDOM.render(<App />, document.querySelector('#app'));
