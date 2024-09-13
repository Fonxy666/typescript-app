import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavbarLinks } from "../interfaces/NavbarLinks";

interface SidebarProps {
    links: NavbarLinks[];
    close: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ links, close }) => {
    return (
        <div className="sidebar" onClick={close}>
            {links.map(link => (
                <a className="sidebar-link" href="#!" key={link.name}>
                    <FontAwesomeIcon icon={link.icon} />
                    {link.name}
                </a>
            ))}
        </div>
    );
};
