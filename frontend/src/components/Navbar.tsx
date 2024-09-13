import { useState } from "react";
import { Sidebar } from "./Sidebar";
import { faHome, faList, faCog } from "@fortawesome/free-solid-svg-icons";

export const Navbar: React.FC = () => {
    const [showSidebar, setShowBar] = useState(false);
    const links = [
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
    ]

    const closeSideBar = () => {
        setShowBar(() => {
            return false;
        })
    }

    return (
        <>
            <div className="navbar container">
                <a href="#!" className="logo">C<span>oo</span>kBooker</a>
                <div className="nav-links">
                    {links.map(link => (
                        <a href="#!" key={link.name}>{link.name}</a>
                    ))}
                </div>
                <div onClick={() => setShowBar(!showSidebar)} className={showSidebar? "sidebar-btn active" : "sidebar-btn"}>
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                </div>
            </div>
            { showSidebar && <Sidebar links={links} close={closeSideBar}/>}
            
        </>
    ) 
}
