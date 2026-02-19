import { TwitterIcon } from "../icons/Twitter";
import { SidebarItem } from "./SideBaritem";
import { YoutubeIcon } from "../icons/youtubeIcon";
import { AcademicIcon } from "../icons/AcademicIcon";
 
type ContentFilter = "all" | "twitter" | "youtube";

interface SidebarProps {
  selectedFilter: ContentFilter;
  onSelectFilter: (filter: ContentFilter) => void;
}

export function Sidebar({ selectedFilter, onSelectFilter }: SidebarProps) {
  return (
    <div className="h-screen bg-white border-r border-slate-200 w-72 fixed left-0 top-0 px-6 py-6">
      <div className="flex text-2xl items-center">
        <div className="pr-2 text-purple-600">
          <AcademicIcon></AcademicIcon>
        </div>
        <h1 className="font-semibold text-slate-800">Brainly</h1>
      </div>
      <div className="pt-6">
        <SidebarItem
          text="Twitter"
          icon={<TwitterIcon></TwitterIcon>}
          active={selectedFilter === "twitter"}
          onClick={() => onSelectFilter("twitter")}
        ></SidebarItem>
        <SidebarItem
          text="Youtube"
          icon={<YoutubeIcon></YoutubeIcon>}
          active={selectedFilter === "youtube"}
          onClick={() => onSelectFilter("youtube")}
        ></SidebarItem>
      </div>
    </div>
  );
}
