import { Link } from "react-router-dom";
import logo from "../assets/images/logo.png";

import {
  FiInstagram,
  FiFacebook,
  FiMail,
  FiPhone,
  FiMapPin,
  FiArrowRight,
} from "react-icons/fi";

const popularLinks = [
  {
    label: "Silver Rings",
    href: "/rings",
  },
  {
    label: "925 Silver Earrings",
    href: "/earrings",
  },
  {
    label: "Silver Bracelets",
    href: "/bracelets",
  },
  {
    label: "Silver Necklaces",
    href: "/necklaces",
  },
  {
    label: "Daily Wear Jewellery",
    href: null,
  },
  {
    label: "Office Wear Jewellery",
    href: null,
  },
  {
    label: "Jewellery Under ₹1999",
    href: null,
  },
  {
    label: "Gifts For Her",
    href: null,
  },
];

export default function Footer() {
  return (
    <footer className="w-full bg-[var(--c-062f4f)] text-white">
      {/* NEWSLETTER */}
      <div className="w-full border-b border-white/10">
        <div className="mx-auto grid w-full max-w-[1500px] gap-10 px-5 py-14 md:grid-cols-2 md:items-center lg:px-10 xl:px-12">
          <div>
            <p className="mb-2 text-[10px] uppercase tracking-[0.28em] text-[var(--c-9cc9da)]">
              The Silpure Circle
            </p>

            <h2
              className="text-3xl font-normal sm:text-4xl lg:text-[42px]"
              style={{
                fontFamily: "Georgia, 'Times New Roman', serif",
              }}
            >
              A little sparkle in your inbox.
            </h2>

            <p className="mt-3 max-w-xl text-sm leading-6 text-white/60">
              Be the first to discover new collections, private offers and
              stories from Silpure.
            </p>
          </div>

          <div className="flex border-b border-white/40">
            <input
              type="email"
              placeholder="Enter your email address"
              className="w-full bg-transparent py-4 text-sm text-white outline-none placeholder:text-white/45"
            />

            <button
              type="button"
              className="flex items-center gap-2 whitespace-nowrap py-4 text-xs font-semibold uppercase tracking-[0.15em]"
            >
              Subscribe
              <FiArrowRight />
            </button>
          </div>
        </div>
      </div>

      {/* MAIN FOOTER */}
      <div className="mx-auto w-full max-w-[1500px] px-5 py-16 lg:px-10 xl:px-12">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-5 lg:gap-12">
          {/* BRAND */}
          <div>
            <Link to="/" className="inline-block">
              <img
                src={logo}
                alt="Silpure"
                className="h-[82px] w-auto object-contain brightness-0 invert"
              />
            </Link>

            <p className="mt-6 max-w-[280px] text-sm leading-7 text-white/55">
              Modern jewellery thoughtfully designed for everyday moments,
              crafted to become a part of your story.
            </p>

            <div className="mt-7 flex gap-3">
              <a
                href="#"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 transition hover:bg-white hover:text-[var(--c-062f4f)]"
              >
                <FiInstagram />
              </a>

              <a
                href="#"
                aria-label="Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 transition hover:bg-white hover:text-[var(--c-062f4f)]"
              >
                <FiFacebook />
              </a>
            </div>
          </div>

          {/* HELP */}
          <div>
            <h4 className="mb-6 text-xs font-semibold uppercase tracking-[0.18em]">
              Help
            </h4>

            <div className="space-y-4 text-sm text-white/55">
              <button
                type="button"
                className="block transition hover:text-white"
              >
                Shipping Policy
              </button>

              <button
                type="button"
                className="block transition hover:text-white"
              >
                Returns & Refunds
              </button>

              <button
                type="button"
                className="block transition hover:text-white"
              >
                Track Your Order
              </button>

              <button
                type="button"
                className="block transition hover:text-white"
              >
                Jewellery Care
              </button>

              <button
                type="button"
                className="block transition hover:text-white"
              >
                Size Guide
              </button>
            </div>
          </div>

          {/* ABOUT */}
          <div>
            <h4 className="mb-6 text-xs font-semibold uppercase tracking-[0.18em]">
              About
            </h4>

            <div className="space-y-4 text-sm text-white/55">
              <button
                type="button"
                className="block transition hover:text-white"
              >
                Our Story
              </button>

              <button
                type="button"
                className="block transition hover:text-white"
              >
                Craftsmanship
              </button>

              <button
                type="button"
                className="block transition hover:text-white"
              >
                Journal
              </button>

              <button
                type="button"
                className="block transition hover:text-white"
              >
                Contact Us
              </button>

              <button
                type="button"
                className="block transition hover:text-white"
              >
                Privacy Policy
              </button>
            </div>
          </div>

          {/* SHOP */}
          <div>
            <h4 className="mb-6 text-xs font-semibold uppercase tracking-[0.18em]">
              Shop
            </h4>

            <div className="space-y-4 text-sm text-white/55">
              <Link
                className="block transition hover:text-white"
                to="/new-arrivals"
              >
                New Arrivals
              </Link>

              <Link
                className="block transition hover:text-white"
                to="/rings"
              >
                Rings
              </Link>

              <Link
                className="block transition hover:text-white"
                to="/earrings"
              >
                Earrings
              </Link>

              <Link
                className="block transition hover:text-white"
                to="/necklaces"
              >
                Necklaces
              </Link>

              <Link
                className="block transition hover:text-white"
                to="/bracelets"
              >
                Bracelets
              </Link>
            </div>
          </div>

          {/* CONTACT */}
          <div>
            <h4 className="mb-6 text-xs font-semibold uppercase tracking-[0.18em]">
              Contact
            </h4>

            <div className="space-y-5 text-sm text-white/55">
              <div className="flex gap-3">
                <FiPhone className="mt-1 shrink-0 text-[var(--c-93c6d8)]" />

                <span>
                  Customer Support
                  <br />
                  +91 00000 00000
                </span>
              </div>

              <div className="flex gap-3">
                <FiMail className="mt-1 shrink-0 text-[var(--c-93c6d8)]" />

                <span>
                  support@silpure.in
                </span>
              </div>

              <div className="flex gap-3">
                <FiMapPin className="mt-1 shrink-0 text-[var(--c-93c6d8)]" />

                <span>
                  India
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* POPULAR SEARCHES */}
        <div className="mt-16 border-t border-white/10 pt-10">
          <h4 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/85">
            Popular Searches
          </h4>

          <div className="mt-4 flex flex-wrap gap-x-2 gap-y-2 text-xs leading-6 text-white/45">
            {popularLinks.map((item, index) => (
              <span key={item.label}>
                {item.href ? (
                  <Link
                    to={item.href}
                    className="transition hover:text-white"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span className="cursor-default text-white/35">
                    {item.label}
                  </span>
                )}

                {index !== popularLinks.length - 1 && (
                  <span className="ml-2 text-white/20">
                    |
                  </span>
                )}
              </span>
            ))}
          </div>
        </div>

        {/* BOTTOM */}
        <div className="mt-10 flex flex-col gap-5 border-t border-white/10 pt-7 text-xs text-white/40 md:flex-row md:items-center md:justify-between">
          <p>
            © 2026 Silpure. All Rights Reserved.
          </p>

          <div className="flex flex-wrap gap-5">
            <span>VISA</span>
            <span>MASTERCARD</span>
            <span>RUPAY</span>
            <span>UPI</span>
            <span>COD</span>
          </div>
        </div>
      </div>
    </footer>
  );
}