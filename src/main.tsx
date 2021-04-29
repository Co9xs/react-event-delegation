import * as React from 'react';
import { useState } from 'react';
import * as ReactDOM from 'react-dom';
import { PopupMenu } from './PopupMenu';

type Props = {}

const App: React.VFC<Props> = () => {
  return (
    <>
      <h1>React-event-delegation-test</h1>
      <PopupMenu/>
    </>
  )
}

ReactDOM.render(<App />, document.querySelector('#app'));
