import * as React from 'react';
import * as ReactDOM from 'react-dom';

type Props = {}

const App: React.VFC<Props> = () => {
  return (
    <h1>Test</h1>
  )
}

ReactDOM.render(<App/>, document.querySelector('#app'));