import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavbarLinks } from "../interfaces/NavbarLinks";
import { Link } from "react-router-dom";

interface SidebarProps {
    links: NavbarLinks[];
    close: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ links, close }) => {
    return (
        <div className="sidebar" onClick={close}>
            {links.map(link => (
                <Link to={link.path} className="sidebar-link" key={link.name}>
                    <FontAwesomeIcon icon={link.icon} />
                    {link.name}
                </Link>
            ))}
        </div>
    );
};
