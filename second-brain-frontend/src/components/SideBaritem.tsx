import { ReactElement } from "react";

export function SidebarItem({
  text,
  icon,
}: {
  text: string;
  icon: ReactElement;
}) {
  return (
    <div className="flex items-center text-slate-600 py-2 px-2 rounded-lg cursor-pointer hover:bg-slate-100">
      <div className="p-2">{icon}</div>
      <div className="p-2 font-medium">{text}</div>
    </div>
  );
}
