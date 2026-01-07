import { NavLink } from "react-router-dom";
import { UserRole } from "../types";

export type SidebarLink = { to: string; label: string; roles?: UserRole[] };

type Props = {
  links: SidebarLink[];
  open: boolean;
  onClose: () => void;
};

export function Sidebar({ links, open, onClose }: Props) {
  return (
    <aside className={`sidebar ${open ? "open" : ""}`}>
      <nav aria-label="Primary">
        {links.map((link) => (
          <NavLink key={link.to} to={link.to} className={({ isActive }) => (isActive ? "active" : "")} onClick={onClose}>
            {link.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
