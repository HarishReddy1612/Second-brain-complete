import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BACKEND_URL } from "../config";
import { Card } from "../components/Card";

type SharedContent = {
  _id: string;
  title: string;
  link: string;
  type: "twitter" | "youtube";
};

export function SharedBrain() {
  const { shareLink } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");
  const [content, setContent] = useState<SharedContent[]>([]);

  useEffect(() => {
    async function load() {
      if (!shareLink) {
        setError("Invalid share link.");
        setLoading(false);
        return;
      }
      try {
        const response = await axios.get(`${BACKEND_URL}/api/v1/brain/${shareLink}`);
        setUsername(response.data.username);
        setContent(response.data.content || []);
      } catch {
        setError("This share link is invalid or expired.");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [shareLink]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">
        <div className="text-slate-600">Loading shared brain...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">
        <div className="text-slate-700">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <div className="text-sm text-slate-500">Shared by</div>
          <div className="text-2xl font-semibold text-slate-800">{username}</div>
          <div className="text-sm text-slate-500 mt-1">
            Curated links from the second brain.
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {content.map((item) => (
            <Card
              key={item._id}
              id={item._id}
              type={item.type}
              title={item.title}
              link={item.link}
            />
          ))}
        </div>

        {content.length === 0 && (
          <div className="text-slate-500 mt-10 text-center">No content yet.</div>
        )}
      </div>
    </div>
  );
}
