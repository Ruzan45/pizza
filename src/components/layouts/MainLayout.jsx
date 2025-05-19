import React from 'react'
import Header from '../Header';
import { Outlet } from "react-router";
//

export default function MainLayout() {
    return (
        <div className="wrapper">
            <Header />
            <div className="content">
                <Outlet /> {/* нужен для больших вложенных роутов */}
            </div>
        </div>
    )
}
