import {
  siCss,
  siDocker,
  siFlask,
  siGit,
  siGithub,
  siHtml5,
  siJavascript,
  siLinux,
  siNextdotjs,
  siPhp,
  siPostgresql,
  siPython,
  siReact,
  siTypescript,
  type SimpleIcon,
} from "simple-icons";
import type { TechId } from "@/content/site";

/** Ícones monocromáticos das tecnologias (dados do Simple Icons, CC0). Renderizados no servidor. */
const icons: Record<TechId, SimpleIcon> = {
  html5: siHtml5,
  css3: siCss,
  javascript: siJavascript,
  typescript: siTypescript,
  react: siReact,
  nextjs: siNextdotjs,
  python: siPython,
  flask: siFlask,
  php: siPhp,
  postgresql: siPostgresql,
  git: siGit,
  docker: siDocker,
  linux: siLinux,
};

export function TechIcon({ id, className }: { id: TechId; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d={icons[id].path} />
    </svg>
  );
}

export function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d={siGithub.path} />
    </svg>
  );
}
