// Products can have a primary category plus additional collections/tags.
// Example: {category: "rings", collections: ["daily-wear", "for-her"]}
// This keeps products out of unrelated collections.
const categoryAliases = {
  "mens-bracelet": ["mens-bracelet", "mens-bracelets"],
  "toerings": ["toerings", "toe-rings"],
  "for-sis": ["for-sis", "for-sister", "gifts-for-sister"],
  "for-her": ["for-her", "gifts-for-her"],
  "for-him": ["for-him", "gifts-for-him"],
  "for-mom": ["for-mom", "gifts-for-mom"],
  "new-arrivals": ["new-arrivals", "new-arrival"],
  "under1999": ["under1999", "under-1999"],
};

export function selectProducts(products, collection) {
  if (!Array.isArray(products)) return [];
  if (collection === "under1999") return products.filter(p => Number(p.price) <= 1999);
  if (collection === "new-arrivals") return products.filter(p => p.isNewArrival === true || p.category === "new-arrivals" || p.category === "new-arrival" || (Array.isArray(p.collections) && p.collections.some(c => ["new-arrivals", "new-arrival"].includes(c))));
  const accepted = categoryAliases[collection] || [collection];
  return products.filter(p => accepted.includes(p.category) ||
    (Array.isArray(p.collections) && p.collections.some(c => accepted.includes(c))) ||
    (Array.isArray(p.tags) && p.tags.some(t => accepted.includes(t))));
}
