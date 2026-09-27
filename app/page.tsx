import Link from "next/link";

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

async function getPublicRepositories(): Promise<Repo[]> {
  const username = process.env.GITHUB_USERNAME || "octocat";
  const token = process.env.GITHUB_TOKEN;

  const headers: HeadersInit = {
    Accept: "application/vnd.github+json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  // API CHỈ LẤY REPO PUBLIC CỦA USERNAME
  const res = await fetch(
    `https://api.github.com/users/${username}/repos?sort=updated&per_page=100&type=public`,
    {
      headers,
      next: { revalidate: 300 }, // Tự động làm mới cache sau 5 phút
    }
  );

  if (!res.ok) return [];
  return res.json();
}

export default async function Home() {
  const repos = await getPublicRepositories();
  const username = process.env.GITHUB_USERNAME || "Your Username";

  return (
    <div className="min-h-screen bg-[#0d1117] text-[#c9d1d9] font-sans">
      {/* Header */}
      <header className="border-b border-[#30363d] bg-[#161b22] px-5 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Dùng ảnh Avatar từ GitHub của bạn */}
            <img src={`https://github.com/${username}.png`} alt="Logo" className="w-8 h-8 rounded-full border border-[#30363d]" />
            {/* Đổi tên hiển thị ở đây */}
            <span className="font-semibold text-white text-lg">{username}&apos; Repositories {/* <--- Đổi thành tên bạn muốn */}</span>
        </div>
      </header>

      {/* Tiêu đề chính của danh sách Repo */}
      <div className="flex items-center justify-between border-b border-[#30363d] pb-4 mb-7 px-6">
        <h1 className="text-xl font-semibold text-white flex items-center gap-4">Repo {/* <--- Đổi chữ "Public Repositories" thành chữ bạn muốn */}
          <span className="bg-[#21262d] text-xs px-2.5 py-1.5 rounded-full border border-[#30363d]">
            {repos.length}
          </span>
        </h1>
      </div>

        {/* Repositories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {repos.map((repo) => (
            <div key={repo.id} className="border border-[#30363d] bg-[#161b22] p-4 rounded-md flex flex-col justify-between hover:border-[#8b949e] transition">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <a href={repo.html_url} target="_blank" rel="noreferrer" className="text-[#58a6ff] font-semibold hover:underline text-base truncate max-w-[280px]">
                    {repo.name}
                  </a>
                  <span className="text-xs px-2 py-2.5 rounded-full border border-[#30363d] text-emerald-400 bg-emerald-500/10">
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
        {/* Footer */}
      <footer className="mt-15 border-t border-[#30363d] pt-7 text-center text-xs text-[#8b949e]">
        <p>© {new Date().getFullYear()} {username}. Powered by Next.js & Vercel and Design by Protech Group with ❤️.</p>
      </footer>
    </div>
  );
}