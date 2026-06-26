export const filterProducts = (products = [], { search = "", category = "All", priceRange = "all" }) => {
  return products.filter((p) => {
    const matchSearch = p.title?.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === "All" || p.category === category;
    const matchPrice =
      priceRange === "under20" ? p.price < 20000 :
      priceRange === "20to50" ? p.price >= 20000 && p.price <= 50000 :
      priceRange === "above50" ? p.price > 50000 : true;
    return matchSearch && matchCat && matchPrice;
  });
};