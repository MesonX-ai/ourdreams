'use client';

import React, { useState, useEffect } from 'react';
import { Heart, Eye, ShoppingCart, RefreshCw } from 'lucide-react';
import { getAllCorporateGifts, CORPORATE_GIFT_CATEGORIES } from '@/lib/corporateGifts';
import { getAllProducts } from '@/lib/wcApi';

type Product = {
  id: string;
  name: string;
  price: number;
  regularPrice: number;
  category: string;
  image: string;
  inStock: boolean;
  brand: string;
  isCorporateGift?: boolean;
  source?: 'hardcoded' | 'woocommerce';
};

// Original mock data - preserved as requested
const ORIGINAL_PRODUCTS: Product[] = [
  { id: '1', name: 'Awesome Armchair', price: 123, regularPrice: 200, category: 'Furniture', image: '/images/e-commerce/home/product1.png', inStock: true, brand: 'Poliform' },
  { id: '2', name: 'Wooden casket', price: 90, regularPrice: 120, category: 'Decoration', image: '/images/e-commerce/home/product2.png', inStock: true, brand: 'Roche Bobois' },
  { id: '3', name: 'Awesome Lamp', price: 20, regularPrice: 45, category: 'Lighting', image: '/images/e-commerce/home/product3.png', inStock: true, brand: 'Edra' },
  { id: '4', name: 'Soft Pillow', price: 40, regularPrice: 70, category: 'Bedding', image: '/images/e-commerce/home/product4.png', inStock: true, brand: 'Kartell' },
  { id: '5', name: 'Comfy Cushion', price: 30, regularPrice: 50, category: 'Bedding', image: '/images/e-commerce/home/product5.png', inStock: true, brand: 'Poliform' },
  { id: '6', name: 'Scandinavian Sofa', price: 450, regularPrice: 650, category: 'Furniture', image: '/images/e-commerce/home/product6.png', inStock: true, brand: 'Roche Bobois' },
  { id: '7', name: 'Ceramic Vase', price: 15, regularPrice: 30, category: 'Decoration', image: '/images/e-commerce/home/product7.png', inStock: true, brand: 'Edra' },
  { id: '8', name: 'Minimalist Clock', price: 25, regularPrice: 50, category: 'Decoration', image: '/images/e-commerce/home/product8.png', inStock: true, brand: 'Kartell' },
];

// Original categories
const ORIGINAL_CATEGORIES = [
  { id: 'cat-furniture', title: 'Furniture', key: 'Furniture' },
  { id: 'cat-lighting', title: 'Lighting', key: 'Lighting' },
  { id: 'cat-decoration', title: 'Decoration', key: 'Decoration' },
  { id: 'cat-bedding', title: 'Bedding', key: 'Bedding' },
  { id: 'cat-bath', title: 'Bath & Shower', key: 'Bath & Shower' },
  { id: 'cat-curtains', title: 'Curtains', key: 'Curtains' },
  { id: 'cat-toys', title: 'Toys', key: 'Toys' },
];

const ORIGINAL_BRANDS = ['Poliform', 'Roche Bobois', 'Edra', 'Kartell'];

export default function CatalogPage() {
  const [selectedCategories, setSelectedCategoryFilter] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrandsFilter] = useState<string[]>([]);
  const [inStockOnly, setInStockOnly] = useState<boolean | null>(null);
  const [rangePrice, setRangePrice] = useState<number>(5000);
  
  const [hoveredProductId, setHoveredProductId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showMobileFilter, setShowMobileFilter] = useState<boolean>(false);
  const [width, setWidth] = useState<number>(1440);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [allCategories, setAllCategories] = useState<any[]>([]);
  const [allBrands, setAllBrands] = useState<string[]>([]);
  
  // New state for WooCommerce sync
  const [isLoadingWC, setIsLoadingWC] = useState<boolean>(false);
  const [useWooCommerce, setUseWooCommerce] = useState<boolean>(false);
  const [wcLoadError, setWcLoadError] = useState<string | null>(null);
  const [dataSource, setDataSource] = useState<'hardcoded' | 'woocommerce'>('hardcoded');

  // Load and merge products on component mount
  useEffect(() => {
    const corporateGifts = getAllCorporateGifts().map((cg) => ({
      id: `corp-${cg.id}`,
      name: cg.name,
      price: cg.price,
      regularPrice: cg.regularPrice,
      category: cg.category,
      image: cg.image,
      inStock: cg.inStock,
      brand: cg.brand,
      isCorporateGift: true,
      source: 'hardcoded' as const,
    }));

    // Merge original products with corporate gifts
    const merged = [...ORIGINAL_PRODUCTS, ...corporateGifts];
    setAllProducts(merged);

    // Merge categories
    const corporateCategories = CORPORATE_GIFT_CATEGORIES.map((cc) => ({
      id: `cat-${cc.id}`,
      title: cc.name,
      key: cc.name,
      isCorporate: true,
    }));
    setAllCategories([...ORIGINAL_CATEGORIES, ...corporateCategories]);

    // Merge brands
    const corporateBrands = Array.from(
      new Set(corporateGifts.map((cg) => cg.brand))
    );
    setAllBrands([...ORIGINAL_BRANDS, ...corporateBrands]);
  }, []);

  // Function to load products from WooCommerce
  const loadFromWooCommerce = async () => {
    setIsLoadingWC(true);
    setWcLoadError(null);
    
    try {
      const { products: wcProducts, total } = await getAllProducts(100, 5);
      
      if (wcProducts.length === 0) {
        setWcLoadError('No products found in WooCommerce. Keeping hardcoded data.');
        setIsLoadingWC(false);
        return;
      }

      // Convert WooCommerce products to our format
      const converted: Product[] = wcProducts.map((wcProd) => ({
        id: `wc-${wcProd.id}`,
        name: wcProd.name,
        price: parseFloat(wcProd.price) || 0,
        regularPrice: parseFloat(wcProd.regular_price) || parseFloat(wcProd.price) || 0,
        category: wcProd.categories[0]?.name || 'Uncategorized',
        image: wcProd.images[0]?.src || '/images/e-commerce/home/product1.png',
        inStock: wcProd.stock_status === 'instock',
        brand: 'WooCommerce',
        source: 'woocommerce' as const,
      }));

      // Keep original products and add WC products
      const combined = [...ORIGINAL_PRODUCTS, ...converted];
      setAllProducts(combined);

      // Update categories from WooCommerce
      const wcCategoryMap = new Map<string, any>();
      wcProducts.forEach((prod) => {
        prod.categories?.forEach((cat) => {
          if (!wcCategoryMap.has(cat.name)) {
            wcCategoryMap.set(cat.name, {
              id: `cat-wc-${cat.id}`,
              title: cat.name,
              key: cat.name,
              isCorporate: false,
              isWooCommerce: true,
            });
          }
        });
      });

      const wcCats = Array.from(wcCategoryMap.values());
      setAllCategories([...ORIGINAL_CATEGORIES, ...wcCats]);

      // Update brands
      const wcBrands = Array.from(new Set(converted.map((p) => p.brand)));
      setAllBrands([...ORIGINAL_BRANDS, ...wcBrands]);

      setUseWooCommerce(true);
      setDataSource('woocommerce');
      triggerToast(`✓ Loaded ${converted.length} products from WooCommerce!`);
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Failed to load products from WooCommerce';
      setWcLoadError(errorMsg);
      triggerToast(`✗ ${errorMsg}`);
    } finally {
      setIsLoadingWC(false);
    }
  };

  // Function to revert to hardcoded data
  const revertToHardcoded = () => {
    const corporateGifts = getAllCorporateGifts().map((cg) => ({
      id: `corp-${cg.id}`,
      name: cg.name,
      price: cg.price,
      regularPrice: cg.regularPrice,
      category: cg.category,
      image: cg.image,
      inStock: cg.inStock,
      brand: cg.brand,
      isCorporateGift: true,
      source: 'hardcoded' as const,
    }));

    const merged = [...ORIGINAL_PRODUCTS, ...corporateGifts];
    setAllProducts(merged);

    const corporateCategories = CORPORATE_GIFT_CATEGORIES.map((cc) => ({
      id: `cat-${cc.id}`,
      title: cc.name,
      key: cc.name,
      isCorporate: true,
    }));
    setAllCategories([...ORIGINAL_CATEGORIES, ...corporateCategories]);

    const corporateBrands = Array.from(
      new Set(corporateGifts.map((cg) => cg.brand))
    );
    setAllBrands([...ORIGINAL_BRANDS, ...corporateBrands]);

    setUseWooCommerce(false);
    setDataSource('hardcoded');
    setWcLoadError(null);
    triggerToast('✓ Reverted to hardcoded data');
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWidth(window.innerWidth);
      const handleResize = () => setWidth(window.innerWidth);
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  const toggleCategory = (catKey: string) => {
    setSelectedCategoryFilter((prev) => {
      if (prev.includes(catKey)) {
        return prev.filter(c => c !== catKey);
      } else {
        return [...prev, catKey];
      }
    });
  };

  const toggleBrand = (brand: string) => {
    setSelectedBrandsFilter(prev => 
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const filteredProducts = allProducts.filter(product => {
    const matchesCategory = selectedCategories.length > 0 ? selectedCategories.includes(product.category) : true;
    const matchesBrand = selectedBrands.length > 0 ? selectedBrands.includes(product.brand) : true;
    const matchesPrice = product.price <= rangePrice;
    const matchesStock = inStockOnly === null ? true : (inStockOnly ? product.inStock : !product.inStock);
    return matchesCategory && matchesBrand && matchesPrice && matchesStock;
  });

  return (
    <>
      <div className="container mb-5" style={{ marginTop: '32px' }}>
        {toastMessage && (
          <div style={{
            position: 'fixed',
            top: '100px',
            right: '40px',
            backgroundColor: '#2D2928',
            color: '#fff',
            padding: '12px 24px',
            borderRadius: '4px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            zIndex: 2000,
            fontSize: '14px',
            fontWeight: 600
          }}>
            {toastMessage}
          </div>
        )}

        <div className="row">
          {/* Our Dreams sidebar filter column */}
          <div className={`col-lg-3 col-md-4 col-12 filter-sidebar-col ${showMobileFilter ? 'show-mobile' : ''}`}>
            <div className="filter-sidebar-header d-flex justify-content-between align-items-center mb-4">
              <h5 className="font-weight-bold text-uppercase mb-0 text-dark">Categories</h5>
              {width <= 768 && <span onClick={() => setShowMobileFilter(false)} style={{ cursor: 'pointer', fontSize: '20px' }}>✕</span>}
            </div>

            {/* Our Dreams Categories checkboxes */}
            <div className="d-flex flex-column gap-3 mb-5">
              {allCategories.map((cat) => (
                <div key={cat.id} className="d-flex align-items-center">
                  <label className="checkbox-container">
                    <input 
                      type="checkbox" 
                      checked={selectedCategories.includes(cat.key)} 
                      onChange={() => toggleCategory(cat.key)} 
                    />
                    <span className="checkmark" />
                    <span className="checkbox-text font-weight-semibold ml-3">
                      {cat.title}
                      {cat.isCorporate && <span className="badge badge-info ml-2" style={{ fontSize: '10px' }}>Corporate</span>}
                    </span>
                  </label>
                </div>
              ))}
            </div>

            {/* Our Dreams Price Filter */}
            <h5 className="font-weight-bold text-uppercase mb-4 mt-5 text-dark">Price</h5>
            <p className="text-muted" style={{ fontSize: '13px' }}>Price Range: $0 - <strong>${rangePrice}</strong></p>
            <div className="mb-5">
              <input 
                type="range" 
                className="custom-range w-100" 
                min="0" 
                max="5000" 
                step="50" 
                value={rangePrice} 
                onChange={(e) => setRangePrice(Number(e.target.value))}
                style={{ accentColor: '#E93172' }}
              />
              <div className="d-flex justify-content-between mt-2 text-muted" style={{ fontSize: '11px' }}>
                <span>$0</span>
                <span>$5000</span>
              </div>
            </div>

            {/* Our Dreams Brands filter */}
            <h5 className="font-weight-bold text-uppercase mb-4 mt-5 text-dark">Brands</h5>
            <div className="d-flex flex-column gap-3 mb-5">
              {allBrands.slice(0, 20).map((brand) => (
                <div key={brand} className="d-flex align-items-center">
                  <label className="checkbox-container">
                    <input 
                      type="checkbox" 
                      checked={selectedBrands.includes(brand)} 
                      onChange={() => toggleBrand(brand)} 
                    />
                    <span className="checkmark" />
                    <span className="checkbox-text font-weight-semibold ml-3">{brand}</span>
                  </label>
                </div>
              ))}
              {allBrands.length > 20 && (
                <p className="text-muted" style={{ fontSize: '12px', marginTop: '8px' }}>
                  ...and {allBrands.length - 20} more brands
                </p>
              )}
            </div>

            {/* Availability Stock Filter */}
            <h5 className="font-weight-bold text-uppercase mb-4 mt-5 text-dark">Availability</h5>
            <div className="d-flex flex-column gap-3 mb-4">
              <div className="d-flex align-items-center">
                <label className="checkbox-container">
                  <input 
                    type="checkbox" 
                    checked={inStockOnly === true} 
                    onChange={() => setInStockOnly(prev => prev === true ? null : true)} 
                  />
                  <span className="checkmark" />
                  <span className="checkbox-text font-weight-semibold ml-3">On Stock</span>
                </label>
              </div>
              <div className="d-flex align-items-center">
                <label className="checkbox-container">
                  <input 
                    type="checkbox" 
                    checked={inStockOnly === false} 
                    onChange={() => setInStockOnly(prev => prev === false ? null : false)} 
                  />
                  <span className="checkmark" />
                  <span className="checkbox-text font-weight-semibold ml-3">Out of Stock</span>
                </label>
              </div>
            </div>
          </div>

          {/* Product grid columns */}
          <div className="col-lg-9 col-md-8 col-12">
            
            {/* Data Source Indicator and Toggle */}
            {width > 768 && (
              <div className="mb-4 p-3" style={{ backgroundColor: '#f9f8f7', borderRadius: '6px', border: '1px solid #e1e5eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ fontSize: '12px', fontWeight: 600, color: '#666' }}>Data Source:</span>
                  <span style={{ 
                    backgroundColor: dataSource === 'woocommerce' ? '#28a745' : '#6c757d',
                    color: 'white',
                    padding: '4px 10px',
                    borderRadius: '12px',
                    fontSize: '11px',
                    fontWeight: 600
                  }}>
                    {dataSource === 'woocommerce' ? '🔴 Live (WooCommerce)' : '🔵 Hardcoded'}
                  </span>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  {!useWooCommerce ? (
                    <button
                      onClick={loadFromWooCommerce}
                      disabled={isLoadingWC}
                      style={{
                        padding: '8px 16px',
                        fontSize: '12px',
                        fontWeight: 600,
                        backgroundColor: '#E93172',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: isLoadingWC ? 'not-allowed' : 'pointer',
                        opacity: isLoadingWC ? 0.7 : 1,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}
                    >
                      <RefreshCw size={14} style={{ animation: isLoadingWC ? 'spin 1s linear infinite' : 'none' }} />
                      {isLoadingWC ? 'Loading...' : 'Load from WooCommerce'}
                    </button>
                  ) : (
                    <button
                      onClick={revertToHardcoded}
                      style={{
                        padding: '8px 16px',
                        fontSize: '12px',
                        fontWeight: 600,
                        backgroundColor: '#6c757d',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                      }}
                    >
                      Revert to Hardcoded
                    </button>
                  )}
                </div>
              </div>
            )}

            {wcLoadError && (
              <div style={{
                backgroundColor: '#fff3cd',
                borderLeft: '4px solid #ffc107',
                padding: '12px 16px',
                marginBottom: '16px',
                borderRadius: '4px',
                fontSize: '13px',
                color: '#856404'
              }}>
                ⚠️ {wcLoadError}
              </div>
            )}
              
              {/* Top Toolbar matching Our Dreams web exactly */}
            {width > 768 ? (
              <div className="d-flex justify-content-between align-items-center mb-5" style={{ paddingBottom: '20px', borderBottom: '1px solid #f0edf8' }}>
                <h6 className="mb-0 text-muted" style={{ fontSize: '14px' }}>
                  Showing <span className="font-weight-bold" style={{ color: '#E93172' }}>{filteredProducts.length}</span> of <span className="font-weight-bold" style={{ color: '#E93172' }}>{allProducts.length}</span> Products
                </h6>
                
                <div className="d-flex align-items-center">
                  <h6 className="text-nowrap mr-3 mb-0 text-muted" style={{ fontSize: '13px' }}>Sort by:</h6>
                  <select className="form-control" style={{ height: '48px', width: '180px', fontSize: '13px', borderRadius: '4px', borderColor: '#e1e5eb' }}>
                    <option>Most Popular</option>
                    <option>Newest</option>
                    <option>Price: low to high</option>
                    <option>Price: high to low</option>
                  </select>
                </div>
              </div>
            ) : (
              <div>
                <div className="d-flex justify-content-between mb-4">
                  <button 
                    className="text-dark bg-transparent border-0 p-0 font-weight-bold" 
                    onClick={() => setShowMobileFilter(true)}
                    style={{ fontSize: '14px', cursor: 'pointer' }}
                  >
                    <img src="/images/e-commerce/filter.svg" alt="filter" className="mr-2" /> Filters
                  </button>
                  <button className="text-dark bg-transparent border-0 p-0 font-weight-bold" style={{ fontSize: '14px' }}>
                    <img src="/images/e-commerce/relevant.svg" alt="relevant" className="mr-2" /> Sorting
                  </button>
                </div>
                <div className="mb-4" style={{ display: 'flex', gap: '8px' }}>
                  {!useWooCommerce ? (
                    <button
                      onClick={loadFromWooCommerce}
                      disabled={isLoadingWC}
                      style={{
                        padding: '8px 12px',
                        fontSize: '11px',
                        fontWeight: 600,
                        backgroundColor: '#E93172',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: isLoadingWC ? 'not-allowed' : 'pointer',
                        opacity: isLoadingWC ? 0.7 : 1,
                        flex: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '4px'
                      }}
                    >
                      <RefreshCw size={12} style={{ animation: isLoadingWC ? 'spin 1s linear infinite' : 'none' }} />
                      {isLoadingWC ? 'Loading...' : 'Load WC'}
                    </button>
                  ) : (
                    <button
                      onClick={revertToHardcoded}
                      style={{
                        padding: '8px 12px',
                        fontSize: '11px',
                        fontWeight: 600,
                        backgroundColor: '#6c757d',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        flex: 1,
                      }}
                    >
                      Revert
                    </button>
                  )}
                </div>
              </div>
            )}

            {filteredProducts.length === 0 ? (
              <div className="text-center py-5 border" style={{ borderRadius: '6px', backgroundColor: '#fcfbf9' }}>
                <h5 className="font-weight-bold text-muted mb-0">No products found matching the criteria.</h5>
              </div>
            ) : (
              <div className="row">
                {filteredProducts.map((product) => {
                  const discount = Math.round(((product.regularPrice - product.price) / product.regularPrice) * 100);
                  return (
                    <div key={product.id} className="col-lg-4 col-md-6 col-12 mb-4">
                      <div 
                        className="product-card"
                        onMouseEnter={() => setHoveredProductId(product.id)}
                        onMouseLeave={() => setHoveredProductId(null)}
                      >
                        <div className="product-image">
                          <img src={product.image} alt={product.name} />
                          {discount > 0 && <div className="product-badge">{discount}% SALE</div>}
                          {hoveredProductId === product.id && (
                            <div className="product-actions">
                              <button 
                                className="action-btn" 
                                title="Wishlist"
                                onClick={() => triggerToast(`${product.name} added to wishlist!`)}
                              >
                                <Heart size={20} />
                              </button>
                              <button 
                                className="action-btn" 
                                title="View"
                                onClick={() => window.location.href = `/shop/product/${product.id}`}
                              >
                                <Eye size={20} />
                              </button>
                              <button 
                                className="action-btn" 
                                title="Add to Cart"
                                onClick={() => triggerToast(`${product.name} added to cart!`)}
                              >
                                <ShoppingCart size={20} />
                              </button>
                            </div>
                          )}
                        </div>
                        <div className="product-info">
                          <div className="product-category">{product.category}</div>
                          <a href={`/shop/product/${product.id}`} className="product-name">
                            {product.name}
                          </a>
                          <div className="product-price">
                            ${product.price}
                            <span className="product-old-price">${product.regularPrice}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Info Block Sandwiched */}
        <hr className="mt-5" />
        <div className="info-ourdreams-store py-4 my-4">
          <div className="row w-100 m-0 text-center">
            <div className="col-md-4 col-12 info-item-ourdreams-store mb-3 mb-md-0">
              <div className="d-flex align-items-center justify-content-center">
                <img src="/images/e-commerce/home/car.svg" alt="Free Shipping" style={{ width: '40px', height: '40px', marginRight: '16px' }} />
                <div className="text-left">
                  <h5 className="font-weight-bold text-uppercase mb-1" style={{ fontSize: '14px' }}>free shipping</h5>
                  <p className="text-muted mb-0" style={{ fontSize: '12px' }}>On all orders of $ 150</p>
                </div>
              </div>
            </div>
            <div className="col-md-4 col-12 info-item-ourdreams-store mb-3 mb-md-0">
              <div className="d-flex align-items-center justify-content-center">
                <img src="/images/e-commerce/home/headphones.svg" alt="24/7 Support" style={{ width: '40px', height: '40px', marginRight: '16px' }} />
                <div className="text-left">
                  <h5 className="font-weight-bold text-uppercase mb-1" style={{ fontSize: '14px' }}>24/7 support</h5>
                  <p className="text-muted mb-0" style={{ fontSize: '12px' }}>Get help when you need it</p>
                </div>
              </div>
            </div>
            <div className="col-md-4 col-12 info-item-ourdreams-store">
              <div className="d-flex align-items-center justify-content-center">
                <img src="/images/e-commerce/home/Sync.svg" alt="Money Back" style={{ width: '40px', height: '40px', marginRight: '16px' }} />
                <div className="text-left">
                  <h5 className="font-weight-bold text-uppercase mb-1" style={{ fontSize: '14px' }}>100% money back</h5>
                  <p className="text-muted mb-0" style={{ fontSize: '12px' }}>30 day money back guarantee</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr className="mb-5" />

        {/* Instagram Gallery Widget in catalog page footprint too */}
        <div className="row g-2">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="col-lg-2 col-md-4 col-4">
              <img 
                src={`/images/e-commerce/home/insta${i}.jpg`} 
                alt="Insta" 
                className="img-fluid" 
                style={{ borderRadius: '4px', height: '180px', width: '100%', objectFit: 'cover' }} 
              />
            </div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        /* Our Dreams Custom Checkbox Styles */
        .checkbox-container {
          display: flex;
          align-items: center;
          position: relative;
          cursor: pointer;
          user-select: none;
          margin-bottom: 0;
        }

        .checkbox-container input {
          position: absolute;
          opacity: 0;
          cursor: pointer;
          height: 0;
          width: 0;
        }

        .checkmark {
          height: 18px;
          width: 18px;
          background-color: #fff;
          border: 1px solid #232323;
          border-radius: 2px;
          display: inline-block;
          position: relative;
          transition: border-color 0.2s ease;
        }

        .checkbox-container input:checked ~ .checkmark {
          border-color: #E93172;
        }

        .checkmark:after {
          content: "";
          position: absolute;
          display: none;
        }

        .checkbox-container input:checked ~ .checkmark:after {
          display: block;
        }

        .checkbox-container .checkmark:after {
          left: 5px;
          top: 2px;
          width: 5px;
          height: 10px;
          border: solid #E93172;
          border-width: 0 2px 2px 0;
          transform: rotate(45deg);
        }

        .checkbox-text {
          font-size: 14px;
          color: #2D2928;
        }

        /* Sidebar styles */
        @media (max-width: 768px) {
          .filter-sidebar-col {
            position: fixed;
            top: 0;
            left: -1004px;
            width: 320px;
            height: 100vh;
            background-color: #ffffff;
            box-shadow: 4px 0 20px rgba(0,0,0,0.15);
            z-index: 2000;
            padding: 30px;
            overflow-y: auto;
            transition: left 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          }
          .filter-sidebar-col.show-mobile {
            left: 0;
          }
        }

        /* Product catalog listing styling */
        .product-card {
          background: #fcfbf9;
          border-radius: 6px;
          overflow: hidden;
          position: relative;
          transition: all 0.3s ease;
          cursor: pointer;
        }
        
        .product-card:hover {
          box-shadow: 0 12px 32px rgba(0, 0, 0, 0.1);
        }
        
        .product-image {
          position: relative;
          width: 100%;
          padding-bottom: 100%;
          background: #fdfdfd;
          overflow: hidden;
        }
        
        .product-image img {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
        
        .product-badge {
          position: absolute;
          top: 12px;
          left: 12px;
          background-color: #E93172;
          color: white;
          padding: 4px 10px;
          border-radius: 4px;
          font-size: 11px;
          font-weight: 700;
          z-index: 5;
        }
        
        .product-actions {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          opacity: 0;
          transition: opacity 0.3s ease;
          z-index: 10;
        }
        
        .product-card:hover .product-actions {
          opacity: 1;
        }
        
        .action-btn {
          width: 44px;
          height: 44px;
          background: white;
          border: none;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s;
          color: #2D2928;
        }
        
        .action-btn:hover {
          background: #f0e6e0;
          color: #E93172;
        }
        
        .product-info {
          padding: 20px;
        }
        
        .product-category {
          font-size: 11px;
          font-weight: 600;
          text-transform: uppercase;
          color: #6b7280;
          margin-bottom: 8px;
        }
        
        .product-name {
          font-size: 16px;
          font-weight: 600;
          color: #2D2928;
          margin-bottom: 8px;
          text-decoration: none;
          display: block;
          transition: color 0.2s;
        }
        
        .product-card:hover .product-name {
          color: #E93172;
        }
        
        .product-price {
          font-size: 16px;
          font-weight: 700;
          color: #E93172;
        }
        
        .product-old-price {
          font-size: 13px;
          color: #9ca3af;
          text-decoration: line-through;
          margin-left: 8px;
        }

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </>
  );
}