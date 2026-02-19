import { Button } from "../components/Buttons";
import { PlusIcon } from "../icons/plusicon";
import { ShareIcon } from "../icons/shareicon";
import { Card } from "../components/Card";
import { CreateContentModal } from "../components/CreateContentModal";
import { useEffect, useState } from "react";
import { Sidebar } from "../components/Sidebar";
import { useContent } from "../hooks/useContent";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { ShareBrainModal } from "../components/ShareBrainModal";

export function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<"all" | "twitter" | "youtube">("all");

  const { contents, refresh } = useContent();
  const filteredContents =
    selectedFilter === "all"
      ? contents
      : contents.filter((item) => item.type === selectedFilter);

  useEffect(() => {
    refresh();
  }, [modalOpen]);

  async function deleteContent(id: string) {
    await axios.delete(`${BACKEND_URL}/api/v1/content`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
      data: {
        contentId: id,
      },
    });
    refresh();
  }

  return (
    <div>
      <Sidebar
        selectedFilter={selectedFilter}
        onSelectFilter={(filter) => {
          setSelectedFilter((current) => (current === filter ? "all" : filter));
        }}
      ></Sidebar>
      <div className="p-6 ml-72 min-h-screen bg-slate-100">
        <CreateContentModal
          open={modalOpen}
          onClose={() => {
            setModalOpen(false);
          }}
        ></CreateContentModal>
        <ShareBrainModal
          open={shareOpen}
          onClose={() => {
            setShareOpen(false);
          }}
        />

        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-start justify-between gap-6">
            <div>
              <div className="text-sm text-slate-500">Dashboard</div>
              <h1 className="text-2xl font-semibold text-slate-800">Your Brain</h1>
              <p className="text-sm text-slate-500 mt-1">
                Save Twitter threads and YouTube videos in one place.
              </p>
            </div>
            <div className="flex gap-3">
              <Button
                onClick={() => {
                  setModalOpen(true);
                }}
                text="Add Content"
                variant="primary"
                startIcon={<PlusIcon />}
              ></Button>
              <Button
                onClick={() => setShareOpen(true)}
                text="Share Brain"
                variant="secondary"
                startIcon={<ShareIcon />}
              ></Button>
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredContents.map(({ _id, title, link, type }) => (
            <Card
              key={_id}
              id={_id}
              type={type}
              title={title}
              link={link}
              onDelete={deleteContent}
            ></Card>
          ))}
        </div>

        {filteredContents.length === 0 && (
          <div className="mt-10 text-center text-slate-500">
            {contents.length === 0
              ? "No content yet. Add your first link."
              : "No content found for this filter."}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard
