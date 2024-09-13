import { useState } from "react";
import { Sidebar } from "./Sidebar";
import { faHome, faList, faCog, IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

interface ILinks {
    name: string,
    path: string,
    icon: IconDefinition
}

export const Navbar: React.FC = () => {
    const [showSidebar, setShowBar] = useState(false);
    const links: ILinks[] = [
        {
            name: "Home",
            path: "/",
            icon: faHome
        },
        {
            name: "Recipes",
            path: "/recipes",
            icon: faList
        },
        {
            name: "Settings",
            path: "/settings",
            icon: faCog
        }
    ];

    const closeSideBar = () => {
        setShowBar(() => {
            return false;
        });
    };

    return (
        <>
            <div className="navbar container">
                <Link to="/" className="logo">C<span>oo</span>kBooker</Link>
                <div className="nav-links">
                    {links.map(link => (
                        <Link to={link.path} key={link.name}>{link.name}</Link>
                    ))}
                </div>
                <div onClick={() => setShowBar(!showSidebar)} className={showSidebar ? "sidebar-btn active" : "sidebar-btn"}>
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                </div>
            </div>
            {showSidebar && <Sidebar links={links} close={closeSideBar} />}
        </>
    );
};