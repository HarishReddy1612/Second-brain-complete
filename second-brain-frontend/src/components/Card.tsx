import { ShareIcon } from "../icons/shareicon";

interface CardProps {
  id: string;
  title: string;
  link: string;
  type: "twitter" | "youtube";
  onDelete?: (id: string) => void;
}

export function Card({ id, title, link, type, onDelete }: CardProps) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow max-w-80 w-full">
      <div className="p-4">
        <div className="flex justify-between gap-3">
          <div className="flex items-center text-sm font-medium text-slate-700">
            <div className="text-slate-400 pr-2">
              <ShareIcon />
            </div>
            <span className="line-clamp-1">{title}</span>
          </div>
          <div className="flex items-center gap-2">
            <a
              href={link}
              target="_blank"
              rel="noreferrer"
              className="text-slate-400 hover:text-slate-600"
            >
              <ShareIcon />
            </a>
            {onDelete && (
              <button
                onClick={() => onDelete(id)}
                className="text-slate-400 hover:text-red-600"
                aria-label="Delete"
                title="Delete"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M9.75 3a.75.75 0 0 0-.75.75V5H5.25a.75.75 0 0 0 0 1.5h.381l.678 10.169A2.25 2.25 0 0 0 8.554 19h6.892a2.25 2.25 0 0 0 2.245-2.331l.678-10.169h.381a.75.75 0 0 0 0-1.5H15v-1.25a.75.75 0 0 0-.75-.75h-4.5ZM10.5 8.25a.75.75 0 0 1 .75.75v6a.75.75 0 0 1-1.5 0v-6a.75.75 0 0 1 .75-.75Zm3 0a.75.75 0 0 1 .75.75v6a.75.75 0 0 1-1.5 0v-6a.75.75 0 0 1 .75-.75Z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>
        <div className="pt-4">
          {type === "twitter" && (
            <blockquote className="twitter-tweet">
              <a href={link.replace("x.com", "twitter.com")}></a>
            </blockquote>
          )}

          {type === "youtube" && (
            <iframe
              className="w-full rounded-lg"
              src={link.replace("watch", "embed").replace("?v=", "/")}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          )}
        </div>
      </div>
    </div>
  );
}
