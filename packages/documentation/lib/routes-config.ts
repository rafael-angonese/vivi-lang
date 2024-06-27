// remove disabled for now its added because there are no pages for that route

export const ROUTES = [
  {
    title: "Introdução",
    href: "getting-started",
    items: [
      {
        title: "Tabela de símbolos",
        href: "/symbols-table",
      },
      {
        title: "Autômatos",
        href: "/automata",
      },
      {
        title: "Definição da estrutura da sintaxe",
        href: "/structure",
      },
      {
        title: "Gramática LL(1)",
        href: "/grammar",
      },
      {
        title: "First e Follow",
        href: "/first-and-follow",
      },
      {
        title: "Tabela sintática",
        href: "/syntatic-table",
      },
      {
        title: "Installation",
        href: "/installation",
      },
      {
        title: "components.json",
        href: "/components-json",
      },
    ],
  },
  {
    title: "Components",
    href: "components",
    items: [
      {
        title: "Accordian",
        href: "/accordian",
      },
      {
        title: "Alert Dialog",
        href: "/alert-dialog",
        disabled: true,
      },
    ],
  },
];

export const FLATTEND_ROUTES = ROUTES.map(({ href, items }) => {
  return items.map((link) => {
    return {
      title: link.title,
      href: href + link.href,
      disabled: link.disabled,
    };
  });
}).flat();
