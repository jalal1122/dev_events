import Image from "next/image";
import Link from "next/link";

const Header = () => {
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/events", label: "Events" },
    { href: "/create-event", label: "Create Event" },
  ];

  return (
    <header className="bg-black/30">
      <nav className="flex justify-between px-3">
        {/* Logo */}

        <Link href="/" className="logo">
            <Image src="/icons/logo.png" width={40} height={40} alt="logo" />
            <p>DevEvents</p>
        </Link>

        <ul className="flex gap-3 justify-center items-center list-none">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="text-white p-3">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
