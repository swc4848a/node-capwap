import React from 'react'
import ReactDOM from 'react-dom'
import promiseFinally from 'promise.prototype.finally';
import { Provider } from 'mobx-react'
import { HashRouter } from 'react-router-dom'
import { useStrict } from 'mobx'

import Main from './components/main.jsx'
import apStore from './stores/apStore'
import networkStore from './stores/networkStore'
import ssidsStore from './stores/ssidsStore'

const stores = {
    apStore,
    networkStore,
    ssidsStore,
}

promiseFinally.shim();
useStrict(true)

ReactDOM.render(
    <Provider {...stores}>
        <HashRouter>
            <Main />
        </HashRouter>
    </Provider>,
    document.getElementById('main')
);