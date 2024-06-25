import { buttonVariants } from "@/components/ui/button";
import { FLATTEND_ROUTES } from "@/lib/routes-config";
import { TerminalIcon } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-[88vh] flex-col items-center justify-center text-center px-2 py-8">
      <h1 className="text-3xl font-bold mb-4 sm:text-7xl text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-400">
        Vivi Lang.
      </h1>
      <p className="mb-8 sm:text-xl max-w-[800px] text-muted-foreground">
        Vivi Lang é uma linguagem de programação criada como parte do curso de Compiladores no curso de Ciência da Computação da{" "}
        <Link target="_blank" className="text-indigo-500" href={"https://www.unochapeco.edu.br/"}>
          Unochapecó
        </Link>.
        Ela foi desenvolvida para aplicar conceitos fundamentais na construção de compiladores.
      </p>
      <div className="flex flex-row items-center gap-5">
        <Link
          href={`/docs/${FLATTEND_ROUTES[0].href}`}
          className={buttonVariants({ className: "px-6", size: "lg" })}
        >
          Comece aqui
        </Link>

      </div>
      <span className="flex flex-row items-center gap-2 text-zinc-400 text-md mt-7 -mb-12 max-[800px]:mb-12">
        <TerminalIcon className="w-4 h-4" /> ~ vivi-lang
      </span>
    </div>
  );
}
