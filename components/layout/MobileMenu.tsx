"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { buttonClasses } from "@/components/ui/Button";
import { contactHref, type NavItem } from "@/content/site";

/**
 * Menu mobile com <dialog> nativo: foco preso no menu, Esc fecha, fundo inerte
 * e foco devolvido ao botão ao fechar — sem bibliotecas.
 */
export function MobileMenu({ items }: { items: NavItem[] }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);

  const openMenu = () => {
    dialogRef.current?.showModal();
    setOpen(true);
  };
  const closeMenu = () => dialogRef.current?.close();

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={openMenu}
        aria-expanded={open}
        aria-controls="menu-mobile"
        aria-label="Abrir menu"
        className="inline-flex size-10 items-center justify-center rounded-xl border border-line-strong text-fg transition-colors hover:bg-white/[0.06] lg:hidden"
      >
        <Menu aria-hidden className="size-5" />
      </button>

      <dialog
        ref={dialogRef}
        id="menu-mobile"
        aria-label="Menu"
        onClose={() => {
          setOpen(false);
          triggerRef.current?.focus();
        }}
        onClick={(event) => {
          // Clique no backdrop (fora do painel) fecha o menu.
          if (event.target === dialogRef.current) closeMenu();
        }}
        className="mobile-menu m-0 ml-auto h-dvh max-h-none w-full max-w-sm bg-bg-elevated p-0 text-fg shadow-2xl sm:border-l sm:border-line"
      >
        <div className="flex h-full flex-col">
          <div className="flex h-16 items-center justify-between border-b border-line px-5">
            <Logo />
            <button
              type="button"
              onClick={closeMenu}
              aria-label="Fechar menu"
              className="inline-flex size-10 items-center justify-center rounded-xl border border-line-strong hover:bg-white/[0.06]"
            >
              <X aria-hidden className="size-5" />
            </button>
          </div>

          <nav aria-label="Navegação mobile" className="flex-1 overflow-y-auto px-3 py-4">
            <ul className="flex flex-col">
              {items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={closeMenu}
                    className="flex items-center rounded-xl px-3 py-3.5 font-display text-lg font-semibold text-fg-soft transition-colors hover:bg-white/[0.05] hover:text-fg"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="border-t border-line p-5">
            <Link href={contactHref()} onClick={closeMenu} className={buttonClasses("primary", "lg", "w-full")}>
              Solicitar orçamento
            </Link>
          </div>
        </div>
      </dialog>
    </>
  );
}
