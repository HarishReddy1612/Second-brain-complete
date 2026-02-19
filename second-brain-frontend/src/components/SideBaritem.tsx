import { ReactElement } from "react";

export function SidebarItem({
  text,
  icon,
  onClick,
  active = false,
}: {
  text: string;
  icon: ReactElement;
  onClick?: () => void;
  active?: boolean;
}) {
  return (
    <div
      onClick={onClick}
      className={`flex items-center py-2 px-2 rounded-lg cursor-pointer ${
        active
          ? "bg-slate-100 text-slate-900"
          : "text-slate-600 hover:bg-slate-100"
      }`}
    >
      <div className="p-2">{icon}</div>
      <div className="p-2 font-medium">{text}</div>
    </div>
  );
}
