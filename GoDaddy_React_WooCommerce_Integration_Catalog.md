# Integration Guide & Setup Script: React / Next.js with WordPress & WooCommerce (GoDaddy Hosting)

This document provides a complete guide and configuration reference for integrating a custom **React / Next.js front-end** deployed to **GoDaddy Linux (cPanel/PHP) Hosting** with an existing **WordPress + WooCommerce** back-end. It also includes the automated catalog generation script for **20 Corporate Gift Products per category** (Executive Gifts, Employee Recognition, Customized Drinkware, and Tech Accessories) complete with metadata, descriptions, pricing, inventory stock, and realistic unsplash images.

---

## Architecture Overview

```
 +-----------------------------------------------------------------------+
 |                         GoDaddy Linux Hosting                         |
 |                                                                       |
 |  +---------------------------------+  +----------------------------+  |
 |  |     React / Next.js Front-End   |  |   WordPress + WooCommerce  |  |
 |  |    (Exported Static / Node)     |  |       (REST API / GraphQL) |  |
 |  |                                 |  |                            |  |
 |  |  - Public Catalog Pages         |  |  - Product Management      |  |
 |  |  - Dynamic Cart & Checkout      |  |<--| - Order Processing         |  |
 |  |  - Order Status & Confirmation  |  |  - Payment Gateway Hooks   |  |
 |  +---------------------------------+  +----------------------------+  |
 +-----------------------------------------------------------------------+
```

---

## Section 1: GoDaddy PHP/cPanel Deployment Setup

GoDaddy Shared/cPanel PHP hosting typically serves content via Apache or Nginx reverse proxies. Next.js applications are best integrated using **Next.js Static Export** (`output: 'export'`) or via a Node.js App Service in cPanel.

### 1. Next.js Configuration (`next.config.js`)
To deploy statically on GoDaddy standard PHP hosting:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Outputs static HTML/CSS/JS to /out
  images: {
    unoptimized: true, // Required for static export
  },
  trailingSlash: true,
};

module.exports = nextConfig;
```

### 2. Apache `.htaccess` Routing Rules
Upload this `.htaccess` file to your GoDaddy `public_html` root (or subfolder where Next.js resides) to handle client-side routing and pass API requests directly to WordPress:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /

  # Forward /api requests to WordPress REST API if applicable
  RewriteRule ^api/wc/(.*)$ /wp-json/wc/v3/$1 [P,L]

  # Direct standard requests to index.html for client-side routing
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule ^ index.html [L]
</IfModule>
```

---

## Section 2: WooCommerce REST API Integration Layer

Use the `@woocommerce/woocommerce-rest-api` SDK in your Next.js application to fetch products, process cart operations, and submit orders.

### 1. API Client Initialization (`lib/woocommerce.js`)

```javascript
import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

export const WooCommerce = new WooCommerceRestApi({
  url: process.env.NEXT_PUBLIC_WORDPRESS_URL || "https://yourdomain.com",
  consumerKey: process.env.WC_CONSUMER_KEY,
  consumerSecret: process.env.WC_CONSUMER_SECRET,
  version: "wc/v3",
  queryStringAuth: true // Required for HTTP/HTTPS GoDaddy proxy setups
});
```

### 2. Standard Order Placement Payload Structure

When placing an order from your Next.js checkout page to WooCommerce, post a payload formatted as follows to `/wp-json/wc/v3/orders`:

```json
{
  "payment_method": "bacs",
  "payment_method_title": "Direct Bank Transfer / Invoice",
  "set_paid": false,
  "billing": {
    "first_name": "Jane",
    "last_name": "Doe",
    "company": "Acme Corp",
    "address_1": "100 Corporate Blvd",
    "city": "Reston",
    "state": "VA",
    "postcode": "20190",
    "country": "US",
    "email": "jane.doe@acme.com",
    "phone": "555-0199"
  },
  "shipping": {
    "first_name": "Jane",
    "last_name": "Doe",
    "company": "Acme Corp",
    "address_1": "100 Corporate Blvd",
    "city": "Reston",
    "state": "VA",
    "postcode": "20190",
    "country": "US"
  },
  "line_items": [
    {
      "product_id": 101,
      "quantity": 25
    }
  ],
  "shipping_lines": [
    {
      "method_id": "flat_rate",
      "method_title": "Standard Freight",
      "total": "50.00"
    }
  ]
}
```

---

## Section 3: WooCommerce Product Catalog Import Script

Below is a Python script that generates the complete WooCommerce import payload (or CSV) for **20 Corporate Gift Products across 4 categories** (80 products total).

```python
import json

categories = [
    "Executive Gifts",
    "Employee Recognition",
    "Customized Drinkware",
    "Tech Accessories"
]

# Generate 20 products per category
catalog = []
id_counter = 1000

for cat_idx, category in enumerate(categories):
    for i in range(1, 21):
        id_counter += 1
        sku = f"CG-{cat_idx+1}{i:02d}"
        
        if category == "Executive Gifts":
            title = f"Premium Executive Gift Set - Level {i}"
            price = f"{120 + i * 15}.00"
            desc = f"Handcrafted luxury executive gift set featuring leather-bound journal, precision pen, and custom presentation box. Designed for high-level corporate gifting."
            img_id = 1544816155 + i
            img_url = f"https://images.unsplash.com/photo-{img_id}?auto=format&fit=crop&w=800&q=80"
        elif category == "Employee Recognition":
            title = f"Employee Distinction Award & Gift Package #{i}"
            price = f"{45 + i * 5}.00"
            desc = f"Celebrate milestone achievements with this elegant recognition pack including custom engraved plaque and desk accessory set."
            img_id = 1522071820081 # baseline
            img_url = "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
        elif category == "Customized Drinkware":
            title = f"Custom Thermal Insulated Tumbler Model {i}"
            price = f"{22 + i * 2}.00"
            desc = f"Double-wall vacuum insulated stainless steel tumbler. Keeps drinks hot for 12 hours or cold for 24 hours. Custom laser engraving available."
            img_url = "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=800&q=80"
        else: # Tech Accessories
            title = f"Corporate Tech Pack & Power Bank Edition {i}"
            price = f"{35 + i * 8}.00"
            desc = f"High-capacity multi-device charging station and fast wireless power bank with custom screen-printed corporate logo area."
            img_url = "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80"
            
        product = {
            "name": title,
            "type": "simple",
            "regular_price": price,
            "sku": sku,
            "description": desc,
            "short_description": f"Custom corporate branded item: {title}",
            "manage_stock": True,
            "stock_quantity": 100 + (i * 10),
            "categories": [{"name": category}],
            "images": [{"src": img_url, "alt": title}]
        }
        catalog.append(product)

print(f"Generated {len(catalog)} products for WooCommerce REST API batch creation.")
```

---

## Section 4: Full Product Catalog (80 Items Master Table)

| SKU | Category | Title | Price ($) | Stock | Image URL |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **CG-101** | Executive Gifts | Executive Leather Portfolio & Pen Set | 135.00 | 110 | `https://images.unsplash.com/photo-1544816155-12df9643f363` |
| **CG-102** | Executive Gifts | Crystal Desk Clock & Nameplate | 150.00 | 120 | `https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9` |
| **CG-103** | Executive Gifts | Premium Italian Leather Duffel Bag | 165.00 | 130 | `https://images.unsplash.com/photo-1553062407-98eeb64c6a62` |
| **CG-104** | Executive Gifts | Luxury Mahogany Presentation Box | 180.00 | 140 | `https://images.unsplash.com/photo-1513519245088-0e12902e5a38` |
| **CG-105** | Executive Gifts | Executive Brass Fountain Pen | 195.00 | 150 | `https://images.unsplash.com/photo-1583485088034-697b5bc54ccd` |
| **CG-106** | Executive Gifts | Custom Engraved Wine & Decanter Gift Set | 210.00 | 160 | `https://images.unsplash.com/photo-1510812431401-41d2bd2722f3` |
| **CG-107** | Executive Gifts | Deluxe Leather Briefcase & Organizer | 225.00 | 170 | `https://images.unsplash.com/photo-1548036328-c9fa89d128fa` |
| **CG-108** | Executive Gifts | Sterling Silver Cufflink & Tie Bar Set | 240.00 | 180 | `https://images.unsplash.com/photo-1598560917505-59a3ad559071` |
| **CG-109** | Executive Gifts | Smart Temp-Control Travel Mug Set | 255.00 | 190 | `https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd` |
| **CG-110** | Executive Gifts | Executive Wireless Desktop Charging Tray | 270.00 | 200 | `https://images.unsplash.com/photo-1586816829396-9880870fd77d` |
| **CG-111** | Executive Gifts | Custom Monogrammed Cashmere Throw Blanket | 285.00 | 210 | `https://images.unsplash.com/photo-1584100936595-c0654b55a2e2` |
| **CG-112** | Executive Gifts | High-End Noise Cancelling Headphones | 300.00 | 220 | `https://images.unsplash.com/photo-1505740420928-5e560c06d30e` |
| **CG-113** | Executive Gifts | Heritage Leather Laptop Sleeve | 315.00 | 230 | `https://images.unsplash.com/photo-1603302576837-37561b2e2302` |
| **CG-114** | Executive Gifts | Executive Barware Set with Ice Bullets | 330.00 | 240 | `https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b` |
| **CG-115** | Executive Gifts | Handcrafted Marble Desk Organizer | 345.00 | 250 | `https://images.unsplash.com/photo-1507679799987-c73779587ccf` |
| **CG-116** | Executive Gifts | Boutique Espresso Machine & Beans Set | 360.00 | 260 | `https://images.unsplash.com/photo-1517256064527-09c73fc73e38` |
| **CG-117** | Executive Gifts | Fine Grain Wood Desk Humidor | 375.00 | 270 | `https://images.unsplash.com/photo-1527061011665-3652c757a4d4` |
| **CG-118** | Executive Gifts | Custom Engraved Smart Watch | 390.00 | 280 | `https://images.unsplash.com/photo-1523275335684-37898b6baf30` |
| **CG-119** | Executive Gifts | Luxury Leather Luggage Tag & Passport Holder | 405.00 | 290 | `https://images.unsplash.com/photo-1544816155-12df9643f363` |
| **CG-120** | Executive Gifts | Signature Founder's Edition Gift Chest | 420.00 | 300 | `https://images.unsplash.com/photo-1513519245088-0e12902e5a38` |
| **CG-201** | Employee Recognition | Crystal Excellence Trophy | 50.00 | 110 | `https://images.unsplash.com/photo-1522071820081-009f0129c71c` |
| **CG-202** | Employee Recognition | Custom Engraved Wall Plaque | 55.00 | 120 | `https://images.unsplash.com/photo-1579546929518-9e396f3cc809` |
| **CG-203** | Employee Recognition | Service Anniversary Coin & Box | 60.00 | 130 | `https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe` |
| **CG-204** | Employee Recognition | Recognition Certificate Holder Set | 65.00 | 140 | `https://images.unsplash.com/photo-1589829545856-d10d557cf95f` |
| **CG-205** | Employee Recognition | Team Milestone Medal Set | 70.00 | 150 | `https://images.unsplash.com/photo-1569517282132-25d22f4573e6` |
| **CG-206** | Employee Recognition | Star Performer Acrylic Award | 75.00 | 160 | `https://images.unsplash.com/photo-1531403009284-440f080d1e12` |
| **CG-207** | Employee Recognition | Employee of the Month Desk Clock | 80.00 | 170 | `https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c` |
| **CG-208** | Employee Recognition | Modern Glass Award Trophy | 85.00 | 180 | `https://images.unsplash.com/photo-1513519245088-0e12902e5a38` |
| **CG-209** | Employee Recognition | Customized Desk Nameplate & Pen | 90.00 | 190 | `https://images.unsplash.com/photo-1583485088034-697b5bc54ccd` |
| **CG-210** | Employee Recognition | Leadership Honor Wall Plaque | 95.00 | 200 | `https://images.unsplash.com/photo-1579546929518-9e396f3cc809` |
| **CG-211** | Employee Recognition | Spotlight Employee Appreciation Gift Box | 100.00 | 210 | `https://images.unsplash.com/photo-1544816155-12df9643f363` |
| **CG-212** | Employee Recognition | Bronze Triumph Medal Plate | 105.00 | 220 | `https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe` |
| **CG-213** | Employee Recognition | Peer Recognition Badge Set | 110.00 | 230 | `https://images.unsplash.com/photo-1522071820081-009f0129c71c` |
| **CG-214** | Employee Recognition | Champion Culture Trophy | 115.00 | 240 | `https://images.unsplash.com/photo-1531403009284-440f080d1e12` |
| **CG-215** | Employee Recognition | Personalized Pen & Journal Box Set | 120.00 | 250 | `https://images.unsplash.com/photo-1583485088034-697b5bc54ccd` |
| **CG-216** | Employee Recognition | Executive Commemorative Coin Set | 125.00 | 260 | `https://images.unsplash.com/photo-1569517282132-25d22f4573e6` |
| **CG-217** | Employee Recognition | Customized Desk Trophy Lamp | 130.00 | 270 | `https://images.unsplash.com/photo-1507679799987-c73779587ccf` |
| **CG-218** | Employee Recognition | Platinum Service Ribbon Plaque | 135.00 | 280 | `https://images.unsplash.com/photo-1579546929518-9e396f3cc809` |
| **CG-219** | Employee Recognition | Premium Heritage Award Stand | 140.00 | 290 | `https://images.unsplash.com/photo-1513519245088-0e12902e5a38` |
| **CG-220** | Employee Recognition | Legacy Hall of Fame Trophy | 145.00 | 300 | `https://images.unsplash.com/photo-1522071820081-009f0129c71c` |
| **CG-301** | Customized Drinkware | Vacuum Insulated Tumbler 20oz | 24.00 | 110 | `https://images.unsplash.com/photo-1517256064527-09c73fc73e38` |
| **CG-302** | Customized Drinkware | Stainless Steel Water Bottle 24oz | 26.00 | 120 | `https://images.unsplash.com/photo-1602143407151-7111542de6e8` |
| **CG-303** | Customized Drinkware | Ceramic Matte Mug with Wood Lid | 28.00 | 130 | `https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd` |
| **CG-304** | Customized Drinkware | Copper Plated Moscow Mule Mug Set | 30.00 | 140 | `https://images.unsplash.com/photo-1541544741938-0af808871cc0` |
| **CG-305** | Customized Drinkware | Glass Water Bottle with Silicone Sleeve | 32.00 | 150 | `https://images.unsplash.com/photo-1523362628745-0c100150b504` |
| **CG-306** | Customized Drinkware | Smart Temperature Display Bottle | 34.00 | 160 | `https://images.unsplash.com/photo-1517256064527-09c73fc73e38` |
| **CG-307** | Customized Drinkware | Executive Whiskey Glass Pair | 36.00 | 170 | `https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b` |
| **CG-308** | Customized Drinkware | Double-Wall Glass Coffee Cup | 38.00 | 180 | `https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd` |
| **CG-309** | Customized Drinkware | Insulated Travel Wine Flask Set | 40.00 | 190 | `https://images.unsplash.com/photo-1510812431401-41d2bd2722f3` |
| **CG-310** | Customized Drinkware | Sport Hydration Flask 32oz | 42.00 | 200 | `https://images.unsplash.com/photo-1602143407151-7111542de6e8` |
| **CG-311** | Customized Drinkware | Bamboo Exterior Stainless Steel Mug | 44.00 | 210 | `https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd` |
| **CG-312** | Customized Drinkware | Laser Engraved Camping Mug | 46.00 | 220 | `https://images.unsplash.com/photo-1517256064527-09c73fc73e38` |
| **CG-313** | Customized Drinkware | French Press Travel Bottle | 48.00 | 230 | `https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd` |
| **CG-314** | Customized Drinkware | Premium Crystal Stemless Wine Glasses | 50.00 | 240 | `https://images.unsplash.com/photo-1510812431401-41d2bd2722f3` |
| **CG-315** | Customized Drinkware | Insulated Beer Growler 64oz | 52.00 | 250 | `https://images.unsplash.com/photo-1602143407151-7111542de6e8` |
| **CG-316** | Customized Drinkware | Collapsible Silicone Travel Cup | 54.00 | 260 | `https://images.unsplash.com/photo-1523362628745-0c100150b504` |
| **CG-317** | Customized Drinkware | Insulated Cocktail Shaker Set | 56.00 | 270 | `https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b` |
| **CG-318** | Customized Drinkware | Thermal Office Carafe 40oz | 58.00 | 280 | `https://images.unsplash.com/photo-1517256064527-09c73fc73e38` |
| **CG-319** | Customized Drinkware | Custom Infuser Fruit Water Bottle | 60.00 | 290 | `https://images.unsplash.com/photo-1523362628745-0c100150b504` |
| **CG-320** | Customized Drinkware | Heritage Leather-Wrapped Flask Set | 62.00 | 300 | `https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b` |
| **CG-401** | Tech Accessories | 10000mAh Slim Power Bank | 43.00 | 110 | `https://images.unsplash.com/photo-1505740420928-5e560c06d30e` |
| **CG-402** | Tech Accessories | Wireless Charging Pad | 51.00 | 120 | `https://images.unsplash.com/photo-1586816829396-9880870fd77d` |
| **CG-403** | Tech Accessories | Bluetooth Desktop Speaker | 59.00 | 130 | `https://images.unsplash.com/photo-1545454675-3531b543be5d` |
| **CG-404** | Tech Accessories | Active Noise Cancelling Earbuds | 67.00 | 140 | `https://images.unsplash.com/photo-1590658268037-6bf12165a8df` |
| **CG-405** | Tech Accessories | Multi-Port USB-C Hub Organizer | 75.00 | 150 | `https://images.unsplash.com/photo-1616440342335-5136932a3260` |
| **CG-406** | Tech Accessories | Foldable Laptop Stand | 83.00 | 160 | `https://images.unsplash.com/photo-1527864550417-7fd91fc51a46` |
| **CG-407** | Tech Accessories | Smart Tracker Tag 4-Pack | 91.00 | 170 | `https://images.unsplash.com/photo-1505740420928-5e560c06d30e` |
| **CG-408** | Tech Accessories | LED Desk Lamp with Wireless Charger | 99.00 | 180 | `https://images.unsplash.com/photo-1507679799987-c73779587ccf` |
| **CG-409** | Tech Accessories | Executive Leather Mouse Pad & Wrist Rest | 107.00 | 190 | `https://images.unsplash.com/photo-1603302576837-37561b2e2302` |
| **CG-410** | Tech Accessories | Portable HD Projector | 115.00 | 200 | `https://images.unsplash.com/photo-1517256064527-09c73fc73e38` |
| **CG-411** | Tech Accessories | Dual Wireless Charging Stand | 123.00 | 210 | `https://images.unsplash.com/photo-1586816829396-9880870fd77d` |
| **CG-412** | Tech Accessories | Waterproof Outdoor Bluetooth Speaker | 131.00 | 220 | `https://images.unsplash.com/photo-1545454675-3531b543be5d` |
| **CG-413** | Tech Accessories | Smart Cable Management Travel Case | 139.00 | 230 | `https://images.unsplash.com/photo-1616440342335-5136932a3260` |
| **CG-414** | Tech Accessories | Ergonomic Wireless Mouse & Keyboard | 147.00 | 240 | `https://images.unsplash.com/photo-1527864550417-7fd91fc51a46` |
| **CG-415** | Tech Accessories | Magnetic MagSafe Car Phone Mount Set | 155.00 | 250 | `https://images.unsplash.com/photo-1505740420928-5e560c06d30e` |
| **CG-416** | Tech Accessories | Premium HD Web Camera & Ring Light | 163.00 | 260 | `https://images.unsplash.com/photo-1586816829396-9880870fd77d` |
| **CG-417** | Tech Accessories | Solar Powered Power Bank 20000mAh | 171.00 | 270 | `https://images.unsplash.com/photo-1505740420928-5e560c06d30e` |
| **CG-418** | Tech Accessories | Noise Isolating Office Headset | 179.00 | 280 | `https://images.unsplash.com/photo-1505740420928-5e560c06d30e` |
| **CG-419** | Tech Accessories | Digital Smart Notepad & Stylus Set | 187.00 | 290 | `https://images.unsplash.com/photo-1603302576837-37561b2e2302` |
| **CG-420** | Tech Accessories | Ultimate Corporate Executive Tech Kit | 195.00 | 300 | `https://images.unsplash.com/photo-1586816829396-9880870fd77d` |

---

## Section 5: React Front-End Checkout Component (`CheckoutPage.jsx`)

Below is a complete Next.js React client checkout page handling customer billing details and WooCommerce API order submission.

```jsx
import React, { useState } from 'react';

export default function CheckoutPage({ cartItems, clearCart }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    company: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zip: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderComplete, setOrderComplete] = useState(null);

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = {
      payment_method: 'bacs',
      payment_method_title: 'Corporate Invoice / Bank Transfer',
      set_paid: false,
      billing: {
        first_name: formData.firstName,
        last_name: formData.lastName,
        company: formData.company,
        address_1: formData.address,
        city: formData.city,
        state: formData.state,
        postcode: formData.zip,
        email: formData.email,
        country: 'US'
      },
      line_items: cartItems.map(item => ({
        product_id: item.id,
        quantity: item.quantity
      }))
    };

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (data.id) {
        setOrderComplete(data.id);
        clearCart();
      }
    } catch (err) {
      console.error("Order submission failed:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (orderComplete) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <h2>Thank You for Your Corporate Order!</h2>
        <p>Order Reference ID: <strong>#{orderComplete}</strong></p>
        <p>A confirmation email with invoice details has been sent to {formData.email}.</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h1>Corporate Checkout</h1>
      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '15px' }}>
        <div>
          <h3>Billing & Company Information</h3>
          <input required name="firstName" placeholder="First Name" onChange={handleChange} style={{ width: '48%', marginRight: '4%' }} />
          <input required name="lastName" placeholder="Last Name" onChange={handleChange} style={{ width: '48%' }} />
        </div>
        <input required name="company" placeholder="Company Name" onChange={handleChange} style={{ width: '100%' }} />
        <input required type="email" name="email" placeholder="Business Email" onChange={handleChange} style={{ width: '100%' }} />
        <input required name="address" placeholder="Street Address" onChange={handleChange} style={{ width: '100%' }} />
        <div>
          <input required name="city" placeholder="City" onChange={handleChange} style={{ width: '30%', marginRight: '5%' }} />
          <input required name="state" placeholder="State" onChange={handleChange} style={{ width: '30%', marginRight: '5%' }} />
          <input required name="zip" placeholder="ZIP Code" onChange={handleChange} style={{ width: '30%' }} />
        </div>

        <h3>Order Summary</h3>
        <ul>
          {cartItems.map(item => (
            <li key={item.id}>{item.name} x {item.quantity} - ${item.price * item.quantity}</li>
          ))}
        </ul>
        <h4>Total: ${subtotal.toFixed(2)}</h4>

        <button type="submit" disabled={isSubmitting} style={{ padding: '15px', background: '#0056b3', color: '#fff', border: 'none', cursor: 'pointer' }}>
          {isSubmitting ? 'Processing Order...' : 'Submit Corporate Order'}
        </button>
      </form>
    </div>
  );
}
```
