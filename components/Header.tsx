import Link from "next/link";

import { Button } from "./ui/button";
import Nav from "./Nav";
import MobileNav from "./MobileNav";

function Header() {
  return (
    <header className="py-8 text-white xl:py-12">
      <div className="container flex items-center justify-between mx-auto">
        <Link href="/" className="text-2xl font-semibold" aria-label="Gautham — home">
          <span className="gradient-text">Gautham</span>
        </Link>

        <div className="items-center hidden gap-8 xl:flex">
          <Nav />
          <Button asChild>
            <Link href="/contact">Contact</Link>
          </Button>
        </div>

        <div className="xl:hidden">
          <MobileNav />
        </div>
      </div>
    </header>
  );
}

export default Header;
