import { Link, Outlet } from "react-router-dom";
import { Button } from 'primereact/button';
import { Sidebar } from 'primereact/sidebar';

import React, { useState } from 'react';
import EditorSideInner from "../components/EditorSideInner";

export default function EditorLayouts(params) {
    const [visible, setVisible] = useState(false);

    return (
        <div>
       
            <Sidebar modal={false} dismissable={false}  visible={visible} onHide={() => setVisible(false)}>
                    <EditorSideInner></EditorSideInner>
            </Sidebar>
            <div className="fixed-top bg-white box-shadow" style={{left : visible&& "20rem"}}>
    <header className="d-flex flex-wrap justify-content-center px-3 py-2 border-bottom">
      <div className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none">
      <Button icon="pi pi-arrow-right " raised  onClick={() => setVisible((prev)=> !prev)} />
        <span className="fs-4 ms-3">Simple header</span>
      </div>

      <ul className="nav nav-pills">
        <li className="nav-item"><Link to="/" className="nav-link active" aria-current="page">Home</Link></li>
      </ul>
    </header>
  </div>
           
 
        <div className="bg-gray-500 editor-container" style={{paddingLeft : visible&& "32rem"}}>
        <Outlet />

        </div>


        </div>
    )
}