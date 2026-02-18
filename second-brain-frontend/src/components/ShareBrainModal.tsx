import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { Button } from "./Buttons";
import { CrossIcon } from "../icons/CrossIcon";

export function ShareBrainModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [shareLink, setShareLink] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!open) {
      setShareLink("");
      setError("");
      setCopied(false);
    }
  }, [open]);

  async function enableSharing() {
    setLoading(true);
    setError("");
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/brain/share`,
        { share: true },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      const hash = response.data.hash as string;
      setShareLink(`${window.location.origin}/share/${hash}`);
    } catch {
      setError("Could not create share link. Try again.");
    } finally {
      setLoading(false);
    }
  }

  async function disableSharing() {
    setLoading(true);
    setError("");
    try {
      await axios.post(
        `${BACKEND_URL}/api/v1/brain/share`,
        { share: false },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      setShareLink("");
      setCopied(false);
    } catch {
      setError("Could not disable sharing. Try again.");
    } finally {
      setLoading(false);
    }
  }

  async function copyLink() {
    if (!shareLink) return;
    try {
      await navigator.clipboard.writeText(shareLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      setError("Copy failed. You can copy it manually.");
    }
  }

  if (!open) return null;

  return (
    <div className="w-screen h-screen bg-slate-900/50 fixed top-0 left-0 flex justify-center items-center z-50">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl border border-slate-200 p-5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-800">Share your brain</h2>
            <p className="text-sm text-slate-500">
              Create a public link that shows your saved content.
            </p>
          </div>
          <button onClick={onClose} className="text-slate-500 hover:text-slate-700">
            <CrossIcon />
          </button>
        </div>

        <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
          {shareLink ? (
            <div className="flex items-center justify-between gap-3">
              <div className="text-sm text-slate-700 truncate">{shareLink}</div>
              <button
                onClick={copyLink}
                className="px-3 py-1.5 text-sm rounded-md border border-slate-300 bg-white hover:bg-slate-100"
              >
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
          ) : (
            <div className="text-sm text-slate-500">No active share link.</div>
          )}
        </div>

        {error && <div className="mt-3 text-sm text-red-600">{error}</div>}

        <div className="mt-5 flex items-center justify-end gap-3">
          {shareLink ? (
            <Button
              text={loading ? "Removing..." : "Disable Sharing"}
              variant="secondary"
              onClick={disableSharing}
            />
          ) : (
            <Button
              text={loading ? "Creating..." : "Create Share Link"}
              variant="primary"
              onClick={enableSharing}
            />
          )}
        </div>
      </div>
    </div>
  );
}
