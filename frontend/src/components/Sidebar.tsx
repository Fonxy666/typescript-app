import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavbarLinks } from "../interfaces/NavbarLinks";
import { Link, useLocation } from "react-router-dom";

interface SidebarProps {
    links: NavbarLinks[];
    close: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ links, close }) => {
    const location = useLocation();

    return (
        <div className="sidebar" onClick={close}>
            {links.map(link => (
                <Link to={link.path} className={location.pathname === link.path? "sidebar-link active" : "sidebar-link"} key={link.name}>
                    <FontAwesomeIcon icon={link.icon} />
                    {link.name}
                </Link>
            ))}
        </div>
    );
};
