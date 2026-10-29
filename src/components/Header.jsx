import {
  useState,
  useEffect,
  useRef,
} from "react";

import {
  Link,
  useLocation,
} from "react-router-dom";

import {
  FiSearch,
  FiUser,
  FiHeart,
  FiShoppingBag,
  FiMenu,
  FiX,
  FiChevronDown,
  FiChevronRight,
  FiDroplet,
  FiSun,
} from "react-icons/fi";

import logo from "../assets/images/logo.png";
import ringImage from "../assets/images/1.png";

/* =========================================================
   SHOP MEGA MENU DATA
========================================================= */

const shopColumns = [
  {
    title: "For Her",
    links: [
      {
        label: "Rings",
        href: "/rings",
      },
      {
        label: "Earrings",
        href: "/earrings",
      },
      {
        label: "Necklaces",
        href: "/necklaces",
      },
      {
        label: "Bracelets",
        href: "/bracelets",
      },
      {
        label: "Anklets",
        href: "/anklets",
      },
      {
        label: "Toe Rings",
        href: "/toe-rings",
      },
    ],
  },

  {
    title: "Shop For Him",
    links: [
      {
        label: "Men's Rings",
        href: "/mens-rings",
      },
      {
        label: "Men's Bracelets",
        href: "/mens-bracelets",
      },
      {
        label: "Men's Chains",
        href: "/mens-chains",
      },
    ],
  },

  {
    title: "Shop By Occasion",
    links: [
      {
        label: "Daily Wear",
        href: "/daily-wear",
      },
      {
        label: "Office Wear",
        href: "/office-wear",
      },
      {
        label: "Festive",
        href: "/festive",
      },
      {
        label: "Wedding",
        href: "/wedding",
      },
    ],
  },

  {
    title: "Gifting",
    links: [
      {
        label: "For Her",
        href: "/gifts-for-her",
      },
      {
        label: "For Him",
        href: "/gifts-for-him",
      },
      {
        label: "For Mom",
        href: "/gifts-for-mom",
      },
      {
        label: "For Sister",
        href: "/gifts-for-sister",
      },
      {
        label: "Under ₹1,999",
        href: "/under-1999",
      },
    ],
  },
];

/* =========================================================
   MAIN NAV
========================================================= */

const navLinks = [
  {
    label: "New Arrivals",
    href: "/new-arrivals",
  },
  {
    label: "Rings",
    href: "/rings",
  },
  {
    label: "Earrings",
    href: "/earrings",
  },
  {
    label: "Necklaces",
    href: "/necklaces",
  },
  {
    label: "Bracelets",
    href: "/bracelets",
  },
];

export default function Header() {
  const location = useLocation();

  /* =========================================================
     STATES
  ========================================================= */

  const [mobileOpen, setMobileOpen] =
    useState(false);

  const [mobileShopOpen, setMobileShopOpen] =
    useState(false);

  const [searchOpen, setSearchOpen] =
    useState(false);

  const [shopOpen, setShopOpen] =
    useState(false);

  const shopCloseTimer = useRef(null);

  /* =========================================================
     THEME
  ========================================================= */

  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return (
        localStorage.getItem("silpure-theme") ||
        "ocean"
      );
    }

    return "ocean";
  });

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      theme
    );

    document.body.classList.toggle(
      "sky-mode",
      theme === "sky"
    );

    localStorage.setItem(
      "silpure-theme",
      theme
    );
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) =>
      prev === "ocean" ? "sky" : "ocean"
    );
  };

  /* =========================================================
     ACTIVE ROUTE
  ========================================================= */

  const isActive = (href) => {
    return location.pathname === href;
  };

  const isShopSectionActive = shopColumns.some(
    (column) =>
      column.links.some(
        (item) =>
          item.href === location.pathname
      )
  );

  /* =========================================================
     DESKTOP SHOP HOVER DELAY
  ========================================================= */

  const openShopMenu = () => {
    if (shopCloseTimer.current) {
      clearTimeout(
        shopCloseTimer.current
      );
    }

    setShopOpen(true);
  };

  const closeShopMenu = () => {
    if (shopCloseTimer.current) {
      clearTimeout(
        shopCloseTimer.current
      );
    }

    shopCloseTimer.current = setTimeout(
      () => {
        setShopOpen(false);
      },
      350
    );
  };

  const cancelShopClose = () => {
    if (shopCloseTimer.current) {
      clearTimeout(
        shopCloseTimer.current
      );
    }
  };

  useEffect(() => {
    return () => {
      if (shopCloseTimer.current) {
        clearTimeout(
          shopCloseTimer.current
        );
      }
    };
  }, []);

  /* =========================================================
     BODY
  ========================================================= */

  return (
    <>
      <header className="site-header sticky top-0 z-50 bg-white">
        {/* ================================================
            TOP BAR
        ================================================= */}

        <div className="bg-[var(--c-063653)] px-4 py-2.5 text-white">
          <div className="mx-auto flex max-w-7xl items-center justify-center gap-5 text-[10px] font-medium tracking-[0.18em] sm:gap-9 sm:text-xs">
            <span>
              FREE SHIPPING
            </span>

            <span className="h-3 w-px bg-white/30" />

            <span>
              925 STERLING SILVER
            </span>

            <span className="hidden h-3 w-px bg-white/30 sm:block" />

            <span className="hidden sm:inline">
              EASY RETURNS
            </span>
          </div>
        </div>

        {/* ================================================
            MAIN HEADER
        ================================================= */}

        <div className="relative border-b border-[var(--c-dfecef)] bg-white">
          <div className="mx-auto flex h-[88px] max-w-[1500px] items-center justify-between px-5 lg:px-10">
            {/* ============================================
                MOBILE MENU BUTTON
            ============================================= */}

            <button
              type="button"
              onClick={() =>
                setMobileOpen(true)
              }
              className="flex h-10 w-10 items-center justify-center text-[var(--c-082f49)] lg:hidden"
              aria-label="Open menu"
            >
              <FiMenu size={24} />
            </button>

            {/* ============================================
                LOGO
            ============================================= */}

            <Link
              to="/"
              className="shrink-0"
            >
              <img
                src={logo}
                alt="Silpure"
                className="h-[58px] w-auto object-contain sm:h-[62px]"
              />
            </Link>

            {/* ============================================
                DESKTOP NAV
            ============================================= */}

            <nav className="hidden items-center gap-7 lg:flex xl:gap-8">
              {/* HOME */}

              <Link
                to="/"
                className={`text-[14px] font-medium tracking-wide transition ${
                  location.pathname === "/"
                    ? "text-[var(--c-087ca7)]"
                    : "text-[var(--c-173c4e)] hover:text-[var(--c-087ca7)]"
                }`}
              >
                HOME
              </Link>

              {/* ========================================
                  SHOP MEGA MENU
              ========================================= */}

              <div
                className="static"
                onMouseEnter={
                  openShopMenu
                }
                onMouseLeave={
                  closeShopMenu
                }
              >
                <button
                  type="button"
                  onMouseEnter={
                    openShopMenu
                  }
                  className={`flex items-center gap-1.5 py-7 text-[14px] font-medium tracking-wide transition ${
                    shopOpen ||
                    isShopSectionActive
                      ? "text-[var(--c-087ca7)]"
                      : "text-[var(--c-173c4e)] hover:text-[var(--c-087ca7)]"
                  }`}
                >
                  SHOP

                  <FiChevronDown
                    size={15}
                    className={`transition duration-300 ${
                      shopOpen
                        ? "rotate-180"
                        : ""
                    }`}
                  />
                </button>

                {/* ======================================
                    FULL WIDTH DROPDOWN
                ======================================= */}

                <div
                  onMouseEnter={() => {
                    cancelShopClose();
                    setShopOpen(true);
                  }}
                  onMouseLeave={
                    closeShopMenu
                  }
                  className={`
                    absolute
                    left-0
                    right-0
                    top-full
                    z-50
                    border-t
                    border-[var(--c-e3ecef)]
                    bg-white
                    shadow-[0_25px_60px_rgba(3,47,73,0.14)]
                    transition-all
                    duration-300

                    ${
                      shopOpen
                        ? "pointer-events-auto visible translate-y-0 opacity-100"
                        : "pointer-events-none invisible translate-y-2 opacity-0"
                    }
                  `}
                >
                  <div className="mx-auto grid max-w-[1450px] grid-cols-[1fr_270px] gap-10 px-10 py-10">
                    {/* ================================
                        LINKS
                    ================================= */}

                    <div className="grid grid-cols-4 gap-10">
                      {shopColumns.map(
                        (column) => (
                          <div
                            key={
                              column.title
                            }
                          >
                            <h4 className="mb-5 text-[12px] font-semibold uppercase tracking-[0.19em] text-[var(--c-073653)]">
                              {
                                column.title
                              }
                            </h4>

                            <div className="space-y-4">
                              {column.links.map(
                                (
                                  item
                                ) => (
                                  <Link
                                    key={
                                      item.label
                                    }
                                    to={
                                      item.href
                                    }
                                    onClick={() =>
                                      setShopOpen(
                                        false
                                      )
                                    }
                                    className={`block text-[15px] transition duration-200 hover:translate-x-1 hover:text-[var(--c-087ca7)] ${
                                      isActive(
                                        item.href
                                      )
                                        ? "font-medium text-[var(--c-087ca7)]"
                                        : "text-[var(--c-587482)]"
                                    }`}
                                  >
                                    {
                                      item.label
                                    }
                                  </Link>
                                )
                              )}
                            </div>
                          </div>
                        )
                      )}
                    </div>

                    {/* ================================
                        FEATURE CARD
                    ================================= */}

                    <Link
                      to="/new-arrivals"
                      onClick={() =>
                        setShopOpen(
                          false
                        )
                      }
                      className="group/card relative h-[320px] overflow-hidden bg-[var(--c-eef7f9)]"
                    >
                      <img
                        src={ringImage}
                        alt="Silpure jewellery collection"
                        className="h-full w-full object-cover transition duration-700 group-hover/card:scale-105"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-[var(--c-032d47)]/85 via-[var(--c-032d47)]/5 to-transparent" />

                      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                        <p className="text-[10px] uppercase tracking-[0.22em] text-white/80">
                          Silpure Edit
                        </p>

                        <h3
                          className="mt-2 text-2xl"
                          style={{
                            fontFamily:
                              "Georgia, 'Times New Roman', serif",
                          }}
                        >
                          Everyday
                          Elegance
                        </h3>

                        <div className="mt-4 flex items-center gap-2 text-[10px] uppercase tracking-[0.16em]">
                          Explore
                          <FiChevronRight />
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>

              {/* ========================================
                  MAIN NAV LINKS
              ========================================= */}

              {navLinks.map(
                (item) => (
                  <Link
                    key={item.label}
                    to={item.href}
                    className={`whitespace-nowrap text-[14px] font-medium tracking-wide transition ${
                      isActive(
                        item.href
                      )
                        ? "text-[var(--c-087ca7)]"
                        : "text-[var(--c-173c4e)] hover:text-[var(--c-087ca7)]"
                    }`}
                  >
                    {item.label.toUpperCase()}
                  </Link>
                )
              )}
            </nav>

            {/* ============================================
                ICONS
            ============================================= */}

            <div className="flex shrink-0 items-center gap-1 sm:gap-2">
              {/* THEME */}

              <button
                type="button"
                onClick={toggleTheme}
                aria-label="Toggle color theme"
                title={
                  theme === "ocean"
                    ? "Switch to Sky Blue"
                    : "Switch to Deep Ocean"
                }
                className="theme-accent relative flex h-10 w-10 items-center justify-center rounded-full text-[var(--c-123e53)] transition hover:bg-[var(--c-eef7f9)]"
              >
                {theme ===
                "ocean" ? (
                  <FiDroplet
                    size={19}
                  />
                ) : (
                  <FiSun
                    size={19}
                  />
                )}
              </button>

              {/* SEARCH */}

              <button
                type="button"
                onClick={() =>
                  setSearchOpen(
                    !searchOpen
                  )
                }
                className="flex h-10 w-10 items-center justify-center rounded-full text-[var(--c-123e53)] transition hover:bg-[var(--c-eef7f9)]"
                aria-label="Search"
              >
                <FiSearch
                  size={20}
                />
              </button>

              {/* ACCOUNT */}

              <button
                type="button"
                className="hidden h-10 w-10 items-center justify-center rounded-full text-[var(--c-123e53)] transition hover:bg-[var(--c-eef7f9)] sm:flex"
                aria-label="Account"
              >
                <FiUser
                  size={20}
                />
              </button>

              {/* WISHLIST */}

              <button
                type="button"
                className="hidden h-10 w-10 items-center justify-center rounded-full text-[var(--c-123e53)] transition hover:bg-[var(--c-eef7f9)] sm:flex"
                aria-label="Wishlist"
              >
                <FiHeart
                  size={20}
                />
              </button>

              {/* CART */}

              <button
                type="button"
                className="relative flex h-10 w-10 items-center justify-center rounded-full text-[var(--c-123e53)] transition hover:bg-[var(--c-eef7f9)]"
                aria-label="Cart"
              >
                <FiShoppingBag
                  size={20}
                />

                <span className="absolute right-0 top-0 flex h-4 w-4 items-center justify-center rounded-full bg-[var(--c-0b668d)] text-[9px] text-white">
                  0
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* ================================================
            SEARCH BAR
        ================================================= */}

        <div
          className={`overflow-hidden border-b border-[var(--c-e1ecef)] bg-white transition-all duration-300 ${
            searchOpen
              ? "max-h-24 opacity-100"
              : "max-h-0 opacity-0"
          }`}
        >
          <div className="mx-auto flex max-w-4xl items-center gap-3 px-6 py-5">
            <FiSearch
              className="text-[var(--c-73929f)]"
              size={20}
            />

            <input
              type="text"
              placeholder="Search rings, earrings, necklaces..."
              className="w-full bg-transparent text-sm text-[var(--c-183b4d)] outline-none placeholder:text-[var(--c-8ca3ad)]"
            />

            <button
              type="button"
              onClick={() =>
                setSearchOpen(false)
              }
              aria-label="Close search"
            >
              <FiX
                size={20}
              />
            </button>
          </div>
        </div>
      </header>

      {/* =================================================
          MOBILE MENU
      ================================================== */}

      <div
        className={`fixed inset-0 z-[100] ${
          mobileOpen
            ? "visible"
            : "invisible"
        }`}
      >
        {/* OVERLAY */}

        <div
          onClick={() =>
            setMobileOpen(false)
          }
          className={`absolute inset-0 bg-black/45 transition-opacity ${
            mobileOpen
              ? "opacity-100"
              : "opacity-0"
          }`}
        />

        {/* DRAWER */}

        <aside
          className={`absolute left-0 top-0 h-full w-[88%] max-w-[390px] overflow-y-auto bg-white transition-transform duration-300 ${
            mobileOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }`}
        >
          {/* MOBILE HEADER */}

          <div className="flex items-center justify-between border-b border-[var(--c-e2edf0)] px-5 py-5">
            <img
              src={logo}
              alt="Silpure"
              className="h-[55px] w-auto object-contain"
            />

            <button
              type="button"
              onClick={() =>
                setMobileOpen(false)
              }
              aria-label="Close menu"
            >
              <FiX
                size={25}
              />
            </button>
          </div>

          {/* MOBILE LINKS */}

          <div className="p-5">
            {/* HOME */}

            <Link
              to="/"
              onClick={() =>
                setMobileOpen(false)
              }
              className={`block border-b border-[var(--c-edf2f4)] py-4 text-sm font-medium ${
                location.pathname ===
                "/"
                  ? "text-[var(--c-087ca7)]"
                  : "text-[var(--c-143e52)]"
              }`}
            >
              Home
            </Link>

            {/* SHOP BUTTON */}

            <button
              type="button"
              onClick={() =>
                setMobileShopOpen(
                  !mobileShopOpen
                )
              }
              className="flex w-full items-center justify-between border-b border-[var(--c-edf2f4)] py-4 text-sm font-medium text-[var(--c-143e52)]"
            >
              Shop

              <FiChevronDown
                className={`transition duration-300 ${
                  mobileShopOpen
                    ? "rotate-180"
                    : ""
                }`}
              />
            </button>

            {/* MOBILE SHOP MENU */}

            {mobileShopOpen && (
              <div className="bg-[var(--c-f7fbfc)] px-4 py-5">
                {shopColumns.map(
                  (column) => (
                    <div
                      key={
                        column.title
                      }
                      className="mb-7 last:mb-0"
                    >
                      <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--c-073653)]">
                        {
                          column.title
                        }
                      </p>

                      <div>
                        {column.links.map(
                          (
                            item
                          ) => (
                            <Link
                              key={
                                item.label
                              }
                              to={
                                item.href
                              }
                              onClick={() => {
                                setMobileOpen(
                                  false
                                );

                                setMobileShopOpen(
                                  false
                                );
                              }}
                              className={`flex items-center justify-between border-b border-[var(--c-edf2f4)]/70 py-3 text-sm transition ${
                                isActive(
                                  item.href
                                )
                                  ? "font-medium text-[var(--c-087ca7)]"
                                  : "text-[var(--c-5f7984)]"
                              }`}
                            >
                              {
                                item.label
                              }

                              <FiChevronRight
                                size={
                                  14
                                }
                              />
                            </Link>
                          )
                        )}
                      </div>
                    </div>
                  )
                )}
              </div>
            )}

            {/* MAIN NAV MOBILE */}

            {navLinks.map(
              (item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  onClick={() =>
                    setMobileOpen(
                      false
                    )
                  }
                  className={`block border-b border-[var(--c-edf2f4)] py-4 text-sm font-medium ${
                    isActive(
                      item.href
                    )
                      ? "text-[var(--c-087ca7)]"
                      : "text-[var(--c-143e52)]"
                  }`}
                >
                  {item.label}
                </Link>
              )
            )}

            {/* WISHLIST */}

            <button
              type="button"
              className="flex w-full items-center gap-3 border-b border-[var(--c-edf2f4)] py-4 text-sm text-[var(--c-143e52)]"
            >
              <FiHeart />
              Wishlist
            </button>
          </div>
        </aside>
      </div>
    </>
  );
}