import { NavLink } from "react-router-dom";
import {Pages} from "../../types.ts";
import * as React from "react";

interface ToolBarProps {
    pages: Pages[];
}

const ToolBar: React.FC<ToolBarProps> = ({pages}) => {

    return (
        <nav className="navbar navbar-expand-sm bg-body-tertiary">
            <div className="container">
                <NavLink to="/pages/home" className="navbar-brand">Static</NavLink>
                <div className="collapse navbar-collapse">
                    <div className="navbar-nav ms-auto">
                        {pages.map((page) => (
                            <NavLink to={`/pages/${page.id}`} key={page.id} className="nav-link">{page.name}</NavLink>
                        ))}
                        <NavLink to="/admin" className="nav-link">Admin</NavLink>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default ToolBar;