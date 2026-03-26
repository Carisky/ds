const { execSync } = require("child_process");
const packageMetadata = require("./package.json");

function parseGitHubRepository(input) {
  const raw = String(input || "").trim();
  if (!raw) {
    return null;
  }

  if (/^[^/\s]+\/[^/\s]+$/.test(raw)) {
    const [owner, repo] = raw.split("/");
    return { owner, repo };
  }

  const normalized = raw
    .replace(/^git\+/, "")
    .replace(/^git@github\.com:/i, "https://github.com/")
    .replace(/\.git$/i, "");

  const match = normalized.match(/github\.com\/([^/]+)\/([^/]+)$/i);
  if (!match) {
    return null;
  }

  return {
    owner: match[1],
    repo: match[2]
  };
}

function readGitRemoteRepository() {
  try {
    return execSync("git config --get remote.origin.url", {
      cwd: __dirname,
      stdio: ["ignore", "pipe", "ignore"],
      encoding: "utf8"
    }).trim();
  } catch (error) {
    return "";
  }
}

function resolveGitHubRepository() {
  const repositoryField = typeof packageMetadata.repository === "string"
    ? packageMetadata.repository
    : packageMetadata.repository?.url;

  const candidates = [
    process.env.DS_GITHUB_REPOSITORY,
    process.env.GITHUB_REPOSITORY,
    process.env.DS_GITHUB_OWNER && process.env.DS_GITHUB_REPO
      ? `${process.env.DS_GITHUB_OWNER}/${process.env.DS_GITHUB_REPO}`
      : "",
    repositoryField,
    readGitRemoteRepository()
  ];

  for (const candidate of candidates) {
    const parsed = parseGitHubRepository(candidate);
    if (parsed) {
      return parsed;
    }
  }

  return null;
}

const githubRepository = resolveGitHubRepository();
const extraMetadata = githubRepository
  ? {
      dsUpdate: {
        provider: "github",
        owner: githubRepository.owner,
        repo: githubRepository.repo,
        releaseType: "release"
      }
    }
  : {};

const publish = githubRepository
  ? [
      {
        provider: "github",
        owner: githubRepository.owner,
        repo: githubRepository.repo,
        releaseType: "release"
      }
    ]
  : undefined;

module.exports = {
  appId: "com.dsvoice.lan",
  productName: "DS Voice LAN",
  files: [
    "main.js",
    "preload.js",
    "signal-server.js",
    "index.html",
    "overlay.html",
    "modifier-hotkey-listener.ps1",
    "renderer.js",
    "overlay.js",
    "styles.css",
    "overlay.css",
    "package.json"
  ],
  directories: {
    output: "dist"
  },
  extraMetadata,
  win: {
    target: [
      {
        target: "nsis",
        arch: ["x64"]
      }
    ],
    artifactName: "DS-Voice-LAN-Setup-${version}.${ext}"
  },
  nsis: {
    oneClick: false,
    allowToChangeInstallationDirectory: true
  },
  publish
};
