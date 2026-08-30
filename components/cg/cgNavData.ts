/**
 * Navigation for the OurDreams style header.
  * Labels + structure mirror ourdreams.com; hrefs are mapped to
 * existing OurDreams routes so nothing 404s.
 */

export type CgNavItem = { label: string; href: string; desc?: string };

export type CgMenu = {
  id: string;
  label: string;
  items: CgNavItem[];
};

export const offerMenu: CgMenu = {
  id: "offer",
  label: "What we offer",
  items: [
    { label: "eCommerce for Our Dreams", desc: "One vendor of record", href: "/shop/" },
    { label: "Gift customization", desc: "Brand it, ship it", href: "/what-we-offer/gift-automation/" },
    { label: "Creative services", desc: "Design support", href: "/what-we-offer/gift-automation/" },
    { label: "eGifting", desc: "Recipients choose", href: "/shop/" },
    { label: "Personal touches", desc: "Videos, notes, landing pages", href: "/what-we-offer/gift-automation/" },
    { label: "Insights & reporting", desc: "Measure engagement", href: "/what-we-offer/gift-automation/" },
    { label: "Gift automation", desc: "Milestones & triggers", href: "/what-we-offer/gift-automation/" },
    { label: "Seamless integrations", desc: "HR systems, CRMs", href: "/what-we-offer/gift-automation/" },
    { label: "Multiple-recipient sending", desc: "Bulk gifting", href: "/shop/" },
    { label: "Virtual swag closet", desc: "Manage inventory online", href: "/shop/" },
    { label: "Team gifting", desc: "Budgets & permissions", href: "/what-we-offer/gift-automation/" },
    { label: "Company swag store", desc: "Sell merch", href: "/shop/" },
  ],
};

export const resourcesMenu: CgMenu = {
  id: "resources",
  label: "Resources",
  items: [
    { label: "Customer stories", href: "/" },
    { label: "Blog", desc: "Guides & inspiration", href: "/" },
    { label: "Video tutorials", href: "/" },
    { label: "FAQs", href: "/" },
  ],
};

export const shopMenu: CgMenu = {
  id: "shop",
  label: "Shop Products",
  items: [
    { label: "Gift Baskets & Sets", href: "/shop/" },
    { label: "Home", desc: "Home & kitchen", href: "/shop/" },
    { label: "Outdoor & Leisure", href: "/shop/" },
    { label: "Wine & Liquor", href: "/shop/" },
    { label: "Office", href: "/shop/" },
    { label: "Food & Candy", desc: "Gourmet food", href: "/shop/" },
    { label: "Tech", desc: "Employee tech gifts", href: "/shop/" },
    { label: "Drinkware", href: "/shop/" },
    { label: "Bags & Luggage", href: "/shop/" },
    { label: "Apparel", href: "/shop/" },
    { label: "Health & Wellness", href: "/shop/" },
    { label: "Swag Kits", href: "/shop/" },
    { label: "New & Trending Arrivals", href: "/shop/" },
  ],
};

export const shopByMenu: CgMenu = {
  id: "shopby",
  label: "Shop By",
  items: [
    { label: "Marketing & Sales Events", href: "/shop/" },
    { label: "Professional Events", href: "/shop/" },
    { label: "Employee Occasions", href: "/shop/" },
    { label: "Life Moments", desc: "Birthdays & more", href: "/shop/" },
    { label: "Seasonal Events", desc: "Holiday 2026", href: "/shop/" },
    { label: "Awareness & Appreciation Events", href: "/shop/" },
    { label: "Popular Collections", desc: "Employee gift ideas", href: "/shop/" },
    { label: "Popular Brands", href: "/shop/" },
    { label: "Personal Value", desc: "Women-owned", href: "/shop/" },
    { label: "Interest", desc: "Beer, wellness & more", href: "/shop/" },
  ],
};

export const allMenus: CgMenu[] = [offerMenu, resourcesMenu, shopMenu, shopByMenu];

export const clientLogos: { src: string; alt: string }[] = [
  { src: "/cg/clients/td-bank.svg", alt: "TD Bank" },
  { src: "/cg/clients/disney.svg", alt: "Walt Disney" },
  { src: "/cg/clients/dell.svg", alt: "Dell" },
  { src: "/cg/clients/kpmg.svg", alt: "KPMG" },
  { src: "/cg/clients/pearson.svg", alt: "Pearson" },
  { src: "/cg/clients/we-work.svg", alt: "WeWork" },
  { src: "/cg/clients/state-farm.svg", alt: "State Farm" },
  { src: "/cg/clients/nbc.svg", alt: "NBC" },
  { src: "/cg/clients/red-hat.svg", alt: "Red Hat" },
  { src: "/cg/clients/yelp.svg", alt: "Yelp" },
  { src: "/cg/clients/ted.svg", alt: "TED" },
  { src: "/cg/clients/cushman-wakefield.svg", alt: "Cushman & Wakefield" },
  { src: "/cg/clients/hcl.svg", alt: "HCL" },
  { src: "/cg/clients/home-advisor.svg", alt: "Home Advisor" },
  { src: "/cg/clients/ricoh.svg", alt: "Ricoh" },
  { src: "/cg/clients/deloitte.svg", alt: "Deloitte" },
  { src: "/cg/clients/amdocs.svg", alt: "Amdocs" },
  { src: "/cg/clients/allergan.svg", alt: "Allergan" },
  { src: "/cg/clients/conde-nast.svg", alt: "Condé Nast" },
  { src: "/cg/clients/mobileye.svg", alt: "Mobileye" },
  { src: "/cg/clients/jimmy-kimmel.svg", alt: "Jimmy Kimmel" },
  { src: "/cg/clients/schumacher.svg", alt: "Schumacher" },
  { src: "/cg/clients/teen-vogue.svg", alt: "Teen Vogue" },
];