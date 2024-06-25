import { buttonVariants } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[99vh] px-2 py-8 flex flex-col gap-3 justify-center items-center text-center">
      <div>
        <h2 className="text-5xl font-bold">404</h2>
        <p className="text-muted-foreground">Página não encontrada</p>
      </div>

      <Link href="/" className={buttonVariants({})}>
      <ArrowLeft />{" "}
        voltar para página inicial
      </Link>
    </div>
  );
}
