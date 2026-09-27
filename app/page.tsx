import Link from "next/link";

// Ép Next.js luôn fetch dữ liệu tươi mới trên mỗi request (Tránh dính Cache rỗng)
export const dynamic = "force-dynamic";

interface Repo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  updated_at: string;
}

const DEFAULT_USERNAME = "minhduc29013";

async function getPublicRepositories(username: string): Promise<{ repos: Repo[]; error?: string }> {
  const token = process.env.GITHUB_TOKEN;

  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "User-Agent": "NextJS-GitHub-Dashboard-App",
  };

  // Làm sạch token nếu có khoảng trắng
  if (token && token.trim() !== "") {
    headers["Authorization"] = `Bearer ${token.trim()}`;
  }

  try {
    // SỬA LỖI: Đổi `type=public` thành `type=owner` (Chuẩn GitHub REST API)
    const res = await fetch(
      `https://api.github.com/users/${username}/repos?sort=updated&per_page=100&type=owner`,
      {
        headers,
        cache: "no-store",
      }
    );

    if (!res.ok) {
      const errText = await res.text();
      console.error(`GitHub API Error: ${res.status} - ${errText}`);
      return { repos: [], error: `GitHub API Error (${res.status}): ${res.statusText}` };
    }

    const data = await res.json();
    return { repos: Array.isArray(data) ? data : [] };
  } catch (error) {
    console.error("Fetch error:", error);
    return { repos: [], error: "Cannot connect to GitHub API" };
  }
}

export default async function Home() {
  const username = process.env.GITHUB_USERNAME || DEFAULT_USERNAME;
  const { repos, error } = await getPublicRepositories(username);

  return (
    <div className="min-h-screen bg-[#0d1117] text-[#c9d1d9] font-sans flex flex-col justify-between">
      <div>
        {/* Header */}
        <header className="border-b border-[#30363d] bg-[#161b22] px-6 py-4">
          <div className="flex items-center gap-3 max-w-6xl mx-auto w-full">
            <img
              src={`https://github.com/${username}.png`}
              alt="Logo"
              className="w-8 h-8 rounded-full border border-[#30363d]"
            />
            <span className="font-semibold text-white text-lg">
              {username}&apos;s Repositories
            </span>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between border-b border-[#30363d] pb-4 mb-6">
            <h1 className="text-xl font-semibold text-white flex items-center gap-3">
              Repositories
              <span className="bg-[#21262d] text-xs px-2.5 py-1 rounded-full border border-[#30363d] text-[#c9d1d9]">
                {repos.length}
              </span>
            </h1>
          </div>

          {/* Hiển thị thông báo nếu có lỗi từ GitHub API */}
          {error && (
            <div className="p-4 mb-6 text-sm text-red-400 bg-red-950/40 border border-red-800 rounded-md">
              {error}
            </div>
          )}

          {/* Danh sách Repo */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {repos.map((repo) => (
              <div
                key={repo.id}
                className="border border-[#30363d] bg-[#161b22] p-4 rounded-md flex flex-col justify-between hover:border-[#8b949e] transition"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#58a6ff] font-semibold hover:underline text-base truncate max-w-[280px]"
                    >
                      {repo.name}
                    </a>
                    <span className="text-xs px-2 py-0.5 rounded-full border border-[#30363d] text-emerald-400 bg-emerald-500/10">
                      Public
                    </span>
                  </div>
                  <p className="text-sm text-[#8b949e] line-clamp-2 mb-4 h-10">
                    {repo.description || "Chưa có mô tả cho repository này."}
                  </p>
                </div>

                <div className="flex items-center gap-4 text-xs text-[#8b949e]">
                  {repo.language && (
                    <span className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded-full bg-[#3178c6] inline-block"></span>
                      {repo.language}
                    </span>
                  )}
                  <span>★ {repo.stargazers_count}</span>
                  <span>⑂ {repo.forks_count}</span>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="border-t border-[#30363d] py-6 px-6 text-center text-xs text-[#8b949e] bg-[#0d1117]">
        <div className="max-w-6xl mx-auto">
          <p>
            © {new Date().getFullYear()} {username}.Design by Protech Group Powered by Next.js & Vercel.
          </p>
        </div>
      </footer>
    </div>
  );
}