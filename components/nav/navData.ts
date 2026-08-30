export type NavLink = { label: string; href: string; desc?: string };

export type MegaMenu = {
  id: string;
  label: string;
  href: string;
  columns: { heading: string; links: NavLink[] }[];
  feature?: { title: string; body: string; href: string };
};

export const megaMenus: MegaMenu[] = [
  {
    id: "offer",
    label: "What we offer",
    href: "/what-we-offer/",
    columns: [
      {
        heading: "Platform",
        links: [
          { label: "Marketplace", href: "/what-we-offer/marketplace/", desc: "Thousands of gifts, one vendor of record" },
          { label: "Multi-recipient sending", href: "/what-we-offer/multi-recipient-sending/", desc: "One cart, many doors" },
          { label: "Virtual swag closet", href: "/what-we-offer/virtual-swag-closet/", desc: "Self-serve company store" },
          { label: "Gift automation", href: "/what-we-offer/gift-automation/", desc: "Triggers → sends, hands-free" },
        ],
      },
      {
        heading: "Programs",
        links: [
          { label: "Team gifting", href: "/what-we-offer/team-gifting/" },
          { label: "Company store", href: "/what-we-offer/company-store/" },
          { label: "eGifting", href: "/what-we-offer/egifting/", desc: "Instant digital redemption" },
          { label: "Personal touches", href: "/what-we-offer/personal-touches/" },
        ],
      },
      {
        heading: "Insight",
        links: [
          { label: "Insights & reporting", href: "/what-we-offer/insights-reporting/" },
          { label: "Seamless integrations", href: "/what-we-offer/seamless-integrations/" },
        ],
      },
    ],
    feature: {
      title: "See automation in action",
      body: "Build a trigger-based gifting campaign in minutes.",
      href: "/what-we-offer/gift-automation/",
    },
  },
  {
    id: "shop",
    label: "Shop",
    href: "/shop/",
    columns: [
      {
        heading: "Categories",
        links: [
          { label: "Home Office", href: "/shop/home-office/" },
          { label: "Wellness", href: "/shop/wellness/" },
          { label: "Tech & Desk", href: "/shop/tech/" },
          { label: "Food & Drink", href: "/shop/food-drink/" },
        ],
      },
      {
        heading: "Browse",
        links: [
          { label: "Apparel", href: "/shop/apparel/" },
          { label: "Eco & ZeroWaste", href: "/shop/eco/" },
          { label: "Occasions", href: "/occasions/" },
          { label: "Collections", href: "/collections/" },
        ],
      },
    ],
    feature: {
      title: "New hire welcome",
      body: "A curated collection for first-day sends.",
      href: "/collections/new-hire-welcome/",
    },
  },
  {
    id: "resources",
    label: "Resources",
    href: "/resources/",
    columns: [
      {
        heading: "Learn",
        links: [
          { label: "Blog", href: "/blog/" },
          { label: "Guides", href: "/guides/" },
          { label: "Case studies", href: "/case-studies/" },
          { label: "FAQ", href: "/faq/" },
        ],
      },
      {
        heading: "Connect",
        links: [
          { label: "Integrations", href: "/integrations/" },
          { label: "About us", href: "/about-us/" },
          { label: "Contact us", href: "/contact-us/" },
        ],
      },
    ],
    feature: {
      title: "Request a demo",
      body: "See the full platform with a specialist.",
      href: "/request-demo/",
    },
  },
];

export const utilityLinks: NavLink[] = [
  { label: "Pricing", href: "/pricing/" },
  { label: "How it works", href: "/how-it-works/" },
  { label: "Login", href: "/login/" },
];
