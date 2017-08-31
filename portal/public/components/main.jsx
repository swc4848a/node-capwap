import React from 'react'
import Header from './header.jsx'
import Sidebar from './sidebar.jsx'
import Content from './content.jsx'
import Footer from './footer.jsx'

export default function Main() {
    return (
        <div>
            <Header />
            <Sidebar />
            <Content />
            <Footer />
        </div>
    )
}