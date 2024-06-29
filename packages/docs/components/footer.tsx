import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t w-full h-16">
      <div className="container flex items-center justify-center h-full text-muted-foreground text-sm flex-wrap">
        <p className="text-center">
          Criado por{" "}
          <Link
            className="px-1 underline underline-offset-2"
            href="https://github.com/rafael-angonese"
            target="_blank"
          >
            Rafael Angonese
          </Link>
          . O código está disponível no{" "}
          <Link
            className="px-1 underline underline-offset-2"
            href="https://github.com/rafael-angonese/vivi-lang"
            target="_blank"
          >
            GitHub
          </Link>
          .
        </p>
      </div>
    </footer>
  );
}
