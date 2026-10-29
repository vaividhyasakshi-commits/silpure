import { useProducts } from "../context/ProductContext";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

import ringImage from "../assets/images/1.png";
import heroImage1 from "../assets/images/11.png";
import heroImage2 from "../assets/images/22.png";

import {
  FiArrowRight,
  FiChevronLeft,
  FiChevronRight,
  FiHeart,
  FiTruck,
  FiShield,
  FiRefreshCcw,
  FiAward,
  FiCheckCircle,
  FiInstagram,
} from "react-icons/fi";

const heroSlides = [
  {
    image: heroImage1,
    eyebrow: "THE EVERYDAY EDIT",
    title: "Jewellery made to live in.",
    description:
      "Thoughtfully designed pieces that bring quiet elegance to every day.",
    button: "Shop Best Sellers",
  },
  {
    image: heroImage2,
    eyebrow: "MODERN. MINIMAL. TIMELESS.",
    title: "Designed for your 9 to 5.",
    description:
      "Refined silver jewellery created for effortless everyday styling.",
    button: "Explore Workwear",
  },
];

const promises = [
  {
    icon: FiAward,
    title: "925 Sterling Silver",
    text: "Certified quality",
  },
  {
    icon: FiShield,
    title: "Skin Friendly",
    text: "Made for everyday wear",
  },
  {
    icon: FiTruck,
    title: "Free Shipping",
    text: "Across India",
  },
  {
    icon: FiRefreshCcw,
    title: "Easy Returns",
    text: "Simple & stress free",
  },
  {
    icon: FiCheckCircle,
    title: "Quality Promise",
    text: "Crafted with care",
  },
];

const categories = [
  {
    title: "Earrings",
    image: ringImage,
  },
  {
    title: "Rings",
    image: ringImage,
  },
  {
    title: "Necklaces",
    image: ringImage,
  },
  {
    title: "Bracelets",
    image: ringImage,
  },
  {
    title: "Gifting",
    image: ringImage,
  },
  {
    title: "Everyday Edit",
    image: ringImage,
  },
];

const occasions = [
  {
    title: "Festive",
    subtitle: "A little more sparkle.",
    image: ringImage,
  },
  {
    title: "Daily Wear",
    subtitle: "Made for every day.",
    image: ringImage,
  },
  {
    title: "Office Wear",
    subtitle: "Polished. Minimal. Effortless.",
    image: ringImage,
  },
  {
    title: "Wedding",
    subtitle: "For unforgettable moments.",
    image: ringImage,
  },
];

const gifts = [
  {
    title: "For Her",
    image: ringImage,
  },
  {
    title: "For Mom",
    image: ringImage,
  },
  {
    title: "For Sister",
    image: ringImage,
  },
  {
    title: "For Yourself",
    image: ringImage,
  },
];

const priceCards = [
  {
    title: "Under ₹1,499",
    text: "Everyday Essentials",
    image: ringImage,
  },
  {
    title: "Under ₹1,999",
    text: "Everyday Favourites",
    image: ringImage,
  },
  {
    title: "Under ₹2,999",
    text: "Signature Designs",
    image: ringImage,
  },
  {
    title: "Above ₹3,000",
    text: "Statement Pieces",
    image: ringImage,
  },
];

const exclusive = [
  {
    title: "Earrings",
    image: ringImage,
  },
  {
    title: "Necklaces",
    image: ringImage,
  },
  {
    title: "Gifting",
    image: ringImage,
  },
  {
    title: "Bracelets",
    image: ringImage,
  },
  {
    title: "Rings",
    image: ringImage,
  },
];

const reviews = [
  {
    name: "Ananya S.",
    text: "The finish is beautiful and the piece looks even more elegant in person. Perfect for daily wear.",
  },
  {
    name: "Mehak R.",
    text: "Minimal, lightweight and very premium. The packaging also made it feel like a proper luxury purchase.",
  },
  {
    name: "Riya K.",
    text: "I have worn my Silpure ring almost every day and absolutely love how effortlessly it goes with everything.",
  },
];

function SectionHeader({ eyebrow, title, text }) {
  return (
    <div className="mx-auto mb-9 max-w-2xl text-center">
      {eyebrow && (
        <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.27em] text-[var(--c-2c7a96)]">
          {eyebrow}
        </p>
      )}

      <h2
        className="text-[32px] font-normal leading-tight text-[var(--c-07324b)] sm:text-[40px]"
        style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
      >
        {title}
      </h2>

      {text && (
        <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-[var(--c-69828d)]">
          {text}
        </p>
      )}
    </div>
  );
}

function ProductCard({ product }) {
  return (
    <div className="group min-w-[75%] sm:min-w-[44%] lg:min-w-0">
      <div className="relative aspect-[4/5] overflow-hidden bg-[var(--c-f3f7f8)]">
        {product.badge && (
          <span className="absolute left-3 top-3 z-10 bg-white px-3 py-1.5 text-[8px] font-semibold tracking-[0.14em] text-[var(--c-083750)] shadow-sm">
            {product.badge}
          </span>
        )}

        <button className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-[var(--c-204a5c)] shadow-sm transition hover:bg-[var(--c-063653)] hover:text-white">
          <FiHeart size={16} />
        </button>

        <Link to={`/product/${product.slug || product.id}`}>
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-contain p-4 transition duration-700 group-hover:scale-[1.04]"
          />
        </Link>

        <div className="absolute bottom-0 left-0 right-0 translate-y-full px-3 pb-3 transition duration-300 group-hover:translate-y-0">
          <button className="w-full bg-[var(--c-063653)] py-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-white">
            Quick Add
          </button>
        </div>
      </div>

      <div className="pt-4 text-center">
        <Link
          to={`/product/${product.slug || product.id}`}
          className="text-sm font-medium text-[var(--c-183e50)] transition hover:text-[var(--c-0b779d)]"
        >
          {product.name}
        </Link>

        <div className="mt-2 flex items-center justify-center gap-2 text-sm">
          <span className="font-semibold text-[var(--c-082f49)]">₹{Number(product.price || 0).toLocaleString("en-IN")}</span>

          {product.oldPrice && (
            <span className="text-xs text-[var(--c-9aadb4)] line-through">
              {product.oldPrice}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [slide, setSlide] = useState(0);
  const { products, loading: productsLoading, error: productsError } = useProducts();
  const featuredProducts = products.filter((product) => product.isFeatured || product.isNewArrival || product.badge === "BESTSELLER");
  const homeProducts = (featuredProducts.length ? featuredProducts : products).slice(0, 8);

  useEffect(() => {
    const timer = setInterval(() => {
      setSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);

    return () => clearInterval(timer);
  }, []);

  const previousSlide = () => {
    setSlide((prev) =>
      prev === 0 ? heroSlides.length - 1 : prev - 1
    );
  };

  const nextSlide = () => {
    setSlide((prev) => (prev + 1) % heroSlides.length);
  };

  return (
    <>
      <Header />

      <main className="overflow-hidden bg-white">
        {/* HERO */}
        <section className="relative min-h-[620px] overflow-hidden bg-[var(--c-dceef3)] sm:min-h-[720px]">
          {heroSlides.map((item, index) => (
            <div
              key={item.title}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                slide === index
                  ? "z-10 opacity-100"
                  : "pointer-events-none opacity-0"
              }`}
            >
              <img
                src={item.image}
                alt={item.title}
                className="absolute inset-0 h-full w-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-r from-[var(--c-032d47)]/65 via-[var(--c-073954)]/25 to-transparent" />

              <div className="relative mx-auto flex min-h-[620px] max-w-[1500px] items-center px-5 pb-20 pt-8 sm:min-h-[720px] sm:px-8 sm:pb-28 sm:pt-10 lg:px-14">
                <div className="max-w-xl -translate-y-8 text-white sm:-translate-y-10 lg:-translate-y-12">
                  <p className="mb-5 text-[10px] font-semibold tracking-[0.28em] sm:text-xs">
                    {item.eyebrow}
                  </p>

                  <h1
                    className="max-w-[650px] text-[48px] font-normal leading-[1.04] sm:text-[64px] lg:text-[76px]"
                    style={{
                      fontFamily: "Georgia, 'Times New Roman', serif",
                    }}
                  >
                    {item.title}
                  </h1>

                  <p className="mt-6 max-w-md text-sm leading-7 text-white/85 sm:text-base">
                    {item.description}
                  </p>

                  <Link
                    to="/shop"
                    className="mt-8 inline-flex items-center gap-3 bg-white px-7 py-4 text-[11px] font-semibold uppercase tracking-[0.17em] text-[var(--c-073650)] transition hover:bg-[var(--c-063653)] hover:text-white"
                  >
                    {item.button}
                    <FiArrowRight />
                  </Link>
                </div>
              </div>
            </div>
          ))}

          <button
            onClick={previousSlide}
            className="absolute left-4 top-1/2 z-30 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/50 bg-white/10 text-white backdrop-blur-sm transition hover:bg-white hover:text-[var(--c-063653)] sm:flex"
          >
            <FiChevronLeft />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 z-30 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/50 bg-white/10 text-white backdrop-blur-sm transition hover:bg-white hover:text-[var(--c-063653)] sm:flex"
          >
            <FiChevronRight />
          </button>

          <div className="absolute bottom-7 left-1/2 z-30 flex -translate-x-1/2 gap-2">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setSlide(index)}
                className={`h-[3px] transition-all ${
                  slide === index
                    ? "w-10 bg-white"
                    : "w-5 bg-white/50"
                }`}
              />
            ))}
          </div>
        </section>

        {/* PROMISE */}
        <section className="border-b border-[var(--c-e1ecef)] bg-[var(--c-f8fcfd)]">
          <div className="mx-auto grid max-w-[1500px] grid-cols-2 lg:grid-cols-5">
            {promises.map((item, index) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className={`flex items-center gap-3 px-5 py-6 ${
                    index !== promises.length - 1
                      ? "lg:border-r lg:border-[var(--c-deeaee)]"
                      : ""
                  }`}
                >
                  <Icon className="shrink-0 text-[var(--c-1b7a9b)]" size={22} />

                  <div>
                    <p className="text-[11px] font-semibold text-[var(--c-143b4d)]">
                      {item.title}
                    </p>
                    <p className="mt-1 text-[10px] text-[var(--c-8399a2)]">
                      {item.text}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* SHOP CATEGORY */}
        <section className="px-4 py-16 sm:px-6 sm:py-20 lg:px-10">
          <div className="mx-auto max-w-[1450px]">
            <SectionHeader
              eyebrow="FIND YOUR PIECE"
              title="Shop by Category"
              text="Everyday icons, modern classics and little pieces of joy."
            />

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-6">
              {categories.map((category) => (
                <Link
                  key={category.title}
                  to="/shop"
                  className="group"
                >
                  <div className="relative aspect-[4/5] overflow-hidden bg-[var(--c-eef5f7)]">
                    <img
                      src={category.image}
                      alt={category.title}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--c-052d44)]/55 via-transparent to-transparent" />

                    <div className="absolute bottom-0 left-0 right-0 p-4 text-center text-white">
                      <h3
                        className="text-xl sm:text-2xl"
                        style={{
                          fontFamily: "Georgia, 'Times New Roman', serif",
                        }}
                      >
                        {category.title}
                      </h3>

                      <span className="mt-2 inline-block text-[9px] uppercase tracking-[0.18em] opacity-0 transition duration-300 group-hover:opacity-100">
                        Explore Collection
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* OCCASIONS */}
        <section className="bg-[var(--c-f4f9fa)] px-4 py-16 sm:px-6 sm:py-20 lg:px-10">
          <div className="mx-auto max-w-[1450px]">
            <SectionHeader
              eyebrow="MADE FOR YOUR MOMENTS"
              title="Shop by Occasion"
            />

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {occasions.map((occasion) => (
                <Link
                  to="/shop"
                  key={occasion.title}
                  className="group relative aspect-[4/5] overflow-hidden bg-[var(--c-dcecef)]"
                >
                  <img
                    src={occasion.image}
                    alt={occasion.title}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--c-032c46)]/70 via-transparent to-transparent" />

                  <div className="absolute bottom-0 p-6 text-white">
                    <h3
                      className="text-3xl"
                      style={{
                        fontFamily: "Georgia, 'Times New Roman', serif",
                      }}
                    >
                      {occasion.title}
                    </h3>

                    <p className="mt-2 text-xs text-white/75">
                      {occasion.subtitle}
                    </p>

                    <div className="mt-4 flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.17em]">
                      Shop Now
                      <FiArrowRight />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* PRODUCTS */}
        <section className="px-4 py-16 sm:px-6 sm:py-24 lg:px-10">
          <div className="mx-auto max-w-[1450px]">
            <SectionHeader
              eyebrow="SELECTED FOR YOU"
              title="Curated for You"
              text="The Silpure pieces everyone is falling in love with."
            />

            <div className="flex gap-4 overflow-x-auto pb-5 sm:gap-5 lg:grid lg:grid-cols-4 lg:overflow-visible">
              {productsLoading && <p className="py-10 text-sm text-[#69828d]">Loading products...</p>}
              {productsError && <p role="alert" className="py-10 text-sm text-red-600">{productsError}</p>}
              {!productsLoading && !productsError && homeProducts.length === 0 && <p className="py-10 text-sm text-[#69828d]">No featured products available yet.</p>}
              {!productsLoading && !productsError && homeProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                />
              ))}
            </div>

            <div className="mt-10 text-center">
              <Link
                to="/shop"
                className="inline-flex items-center gap-3 border-b border-[var(--c-123e53)] pb-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--c-123e53)]"
              >
                View All Jewellery
                <FiArrowRight />
              </Link>
            </div>
          </div>
        </section>

        {/* EDITORIAL BANNER */}
        <section className="grid lg:grid-cols-2">
          <div className="relative min-h-[500px] overflow-hidden bg-[var(--c-dbeef2)] lg:min-h-[680px]">
            <img
              src={ringImage}
              alt="Silpure signature collection"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>

          <div className="flex items-center bg-[var(--c-063653)] px-7 py-16 text-white sm:px-14 lg:px-20">
            <div className="max-w-lg">
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[var(--c-9ed0df)]">
                THE SILPURE EDIT
              </p>

              <h2
                className="mt-5 text-4xl leading-tight sm:text-5xl lg:text-[58px]"
                style={{
                  fontFamily: "Georgia, 'Times New Roman', serif",
                }}
              >
                Quiet luxury,
                <br />
                made personal.
              </h2>

              <p className="mt-6 max-w-md text-sm leading-7 text-white/65">
                Timeless silhouettes, considered details and elegant finishes.
                Jewellery created to feel uniquely yours.
              </p>

              <Link
                to="/shop"
                className="mt-8 inline-flex items-center gap-3 border-b border-white/70 pb-2 text-[10px] font-semibold uppercase tracking-[0.18em]"
              >
                Discover The Collection
                <FiArrowRight />
              </Link>
            </div>
          </div>
        </section>

        {/* GIFTS */}
        <section className="px-4 py-16 sm:px-6 sm:py-24 lg:px-10">
          <div className="mx-auto max-w-[1450px]">
            <SectionHeader
              eyebrow="SOMETHING MEANINGFUL"
              title="A Gift from the Heart"
              text="Thoughtful pieces for the people who make life beautiful."
            />

            <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-5">
              {gifts.map((gift) => (
                <Link
                  key={gift.title}
                  to="/shop"
                  className="group"
                >
                  <div className="relative aspect-[4/5] overflow-hidden bg-[var(--c-edf5f7)]">
                    <img
                      src={gift.image}
                      alt={gift.title}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--c-032c46)]/60 via-transparent to-transparent" />

                    <h3
                      className="absolute bottom-5 left-0 right-0 text-center text-xl text-white sm:text-3xl"
                      style={{
                        fontFamily: "Georgia, 'Times New Roman', serif",
                      }}
                    >
                      {gift.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* REVIEWS */}
        <section className="bg-[var(--c-eaf4f7)] px-5 py-16 sm:py-20">
          <div className="mx-auto max-w-6xl">
            <SectionHeader
              eyebrow="LOVED BY YOU"
              title="The Silpure Stories"
            />

            <div className="grid gap-5 md:grid-cols-3">
              {reviews.map((review) => (
                <div
                  key={review.name}
                  className="bg-white p-7 sm:p-8"
                >
                  <div className="mb-5 text-sm tracking-[0.1em] text-[var(--c-c4a461)]">
                    ★★★★★
                  </div>

                  <p
                    className="text-xl leading-8 text-[var(--c-244958)]"
                    style={{
                      fontFamily: "Georgia, 'Times New Roman', serif",
                    }}
                  >
                    “{review.text}”
                  </p>

                  <div className="mt-7 border-t border-[var(--c-e5edef)] pt-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[var(--c-113e52)]">
                      {review.name}
                    </p>

                    <p className="mt-1 text-[10px] text-[var(--c-8299a3)]">
                      Verified Buyer
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PRICE */}
        <section className="px-4 py-16 sm:px-6 sm:py-24 lg:px-10">
          <div className="mx-auto max-w-[1450px]">
            <SectionHeader
              eyebrow="BEAUTIFUL AT EVERY BUDGET"
              title="Shop by Price"
              text="Find a little something special at just the right price."
            />

            <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-5">
              {priceCards.map((price) => (
                <Link
                  to="/shop"
                  key={price.title}
                  className="group relative aspect-square overflow-hidden bg-[var(--c-e7f2f5)]"
                >
                  <img
                    src={price.image}
                    alt={price.title}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--c-032c46)]/75 via-[var(--c-032c46)]/5 to-transparent" />

                  <div className="absolute bottom-0 p-4 text-white sm:p-6">
                    <p className="text-[9px] uppercase tracking-[0.18em] text-white/70">
                      {price.text}
                    </p>

                    <h3
                      className="mt-1 text-xl sm:text-3xl"
                      style={{
                        fontFamily: "Georgia, 'Times New Roman', serif",
                      }}
                    >
                      {price.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* FOR HER */}
        <section className="bg-[var(--c-f7fbfc)] px-4 py-16 sm:px-6 sm:py-24 lg:px-10">
          <div className="mx-auto max-w-[1450px]">
            <SectionHeader
              eyebrow="JUST FOR HER"
              title="The Feminine Edit"
            />

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5 lg:gap-5">
              {exclusive.map((item) => (
                <Link
                  to="/shop"
                  key={item.title}
                  className="group"
                >
                  <div className="aspect-[4/5] overflow-hidden bg-[var(--c-e7f0f2)]">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    />
                  </div>

                  <div className="mt-4 text-center">
                    <h3
                      className="text-xl text-[var(--c-123e52)]"
                      style={{
                        fontFamily: "Georgia, 'Times New Roman', serif",
                      }}
                    >
                      {item.title}
                    </h3>

                    <span className="mt-2 inline-flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.16em] text-[var(--c-66838f)]">
                      Shop Now
                      <FiArrowRight />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* INSTAGRAM */}
        <section className="py-16 sm:py-20">
          <div className="mb-9 px-5 text-center">
            <FiInstagram
              className="mx-auto mb-4 text-[var(--c-176989)]"
              size={22}
            />

            <p className="text-[10px] uppercase tracking-[0.24em] text-[var(--c-42768b)]">
              @silpure
            </p>

            <h2
              className="mt-2 text-3xl text-[var(--c-07324b)] sm:text-4xl"
              style={{
                fontFamily: "Georgia, 'Times New Roman', serif",
              }}
            >
              Follow Our Journey
            </h2>

            <p className="mt-3 text-sm text-[var(--c-748b95)]">
              Real moments. Real stories. Real sparkle.
            </p>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <a
                key={item}
                href="#"
                className="group relative aspect-square overflow-hidden bg-[var(--c-e9f2f4)]"
              >
                <img
                  src={ringImage}
                  alt="Silpure Instagram"
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 flex items-center justify-center bg-[var(--c-063653)]/0 transition duration-300 group-hover:bg-[var(--c-063653)]/45">
                  <FiInstagram
                    className="scale-75 text-white opacity-0 transition duration-300 group-hover:scale-100 group-hover:opacity-100"
                    size={25}
                  />
                </div>
              </a>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}