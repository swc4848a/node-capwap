import React from 'react'
import Header from './header.jsx'
import Sidebar from './sidebar.jsx'
import Content from './content.jsx'
import Footer from './footer.jsx'
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'

export default function Main() {
    return (
        <Router>
            <div>
                <Header />
                <Sidebar />
                <Content />
                <Footer />
            </div>
        </Router>
    )
}