import { NavbarLinks } from "./NavbarLinks";

export interface ISidebarProps {
    links: NavbarLinks[];
    close: () => void;
}