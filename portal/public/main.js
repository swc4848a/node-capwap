import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'mobx-react'
import { HashRouter } from 'react-router-dom'
import { useStrict } from 'mobx'

import Main from './components/main.jsx'
import apStore from './stores/apStore'

const stores = {
    apStore,
}

useStrict(true)

ReactDOM.render(
    <Provider {...stores}>
        <HashRouter>
            <Main />
        </HashRouter>
    </Provider>,
    document.getElementById('main')
);