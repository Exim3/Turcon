import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "/logo.svg";
import {
  ChatIcon,
  ContainerIcon,
  LogoutIcon,
  OrderIcon,
  OverviewIcon,
  SellerIcon,
  SettingsIcon,
  UserIcon,
} from "../svg/Tick";

// Define the type for sidebar items
interface SidebarItem {
  icon: React.ReactElement;
  label: string;
  route: string;
}

// Define the type for SidebarItem component props
type SidebarItemProps = {
  item: SidebarItem;
  isHovered: boolean;
  isActive: boolean;
  onHover: () => void;
  onLeave: () => void;
};

const SidebarItem: React.FC<SidebarItemProps> = ({
  item,
  isHovered,
  isActive,
  onHover,
  onLeave,
}) => {
  const navigate = useNavigate();
  const { icon, label, route } = item;

  return (
    <li
      className={`py-2 px-8 flex items-center gap-3 rounded-md transition-colors ${
        isActive
          ? "bg-primary text-white"
          : isHovered
          ? "bg-[#FDC5C5]"
          : "bg-transparent"
      }`}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onClick={() => navigate(route)}
    >
      <div>
        {React.cloneElement(icon, {
          color: isActive || isHovered ? "white" : "black",
          size: 24,
        })}
      </div>
      <p
        className={`transition-colors ${
          isActive ? "text-white" : "text-black"
        }`}
      >
        {label}
      </p>
    </li>
  );
};

const AdminSidebar: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const location = useLocation();

  const handleMouseEnter = (index: number) => setHoveredIndex(index);
  const handleMouseLeave = () => setHoveredIndex(null);

  // Define sidebar items with routes
  const items: SidebarItem[] = [
    { icon: <OverviewIcon />, label: "Overview", route: "/support/overview" },
    {
      icon: <ContainerIcon />,
      label: "Containers",
      route: "/support/containers",
    },
    { icon: <OrderIcon />, label: "Orders", route: "/support/orders" },
    { icon: <UserIcon />, label: "Users", route: "/support/users" },
    { icon: <ChatIcon />, label: "Chats", route: "/support/chats" },
    { icon: <SellerIcon />, label: "Sellers", route: "/support/sellers" },
    {
      icon: <UserIcon />,
      label: "Sales Team",
      route: "/support/salesteam",
    },
    {
      icon: <UserIcon />,
      label: "Purchase Team",
      route: "/support/purchaseteam",
    },
    { icon: <SettingsIcon />, label: "Settings", route: "/admin/settings" },
    { icon: <LogoutIcon />, label: "Logout", route: "/logout" },
  ];

  return (
    <div className="flex flex-col justify-between h-full">
      <div className="flex flex-col gap-3">
        <div className="w-32 mx-auto">
          <img src={logo} alt="Logo" />
        </div>

        <ul className="flex flex-col gap-2">
          {items.slice(0, 8).map((item, index) => (
            <SidebarItem
              key={item.route}
              item={item}
              isHovered={hoveredIndex === index}
              isActive={location.pathname === item.route}
              onHover={() => handleMouseEnter(index)}
              onLeave={handleMouseLeave}
            />
          ))}
        </ul>
      </div>
      <div>
        <ul className="flex flex-col gap-2">
          {items.slice(8).map((item, index) => (
            <SidebarItem
              key={item.route}
              item={item}
              isHovered={hoveredIndex === index + 8}
              isActive={location.pathname === item.route}
              onHover={() => handleMouseEnter(index + 8)}
              onLeave={handleMouseLeave}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminSidebar;
