'use client';

import { useState, useMemo } from 'react';
import { CategoryFilter } from '@/components/CategoryFilter';
import { ProductCard } from '@/components/ProductCard';
import { Cart } from '@/components/Cart';
import { products, categories } from '@/lib/products';
import { useCart } from '@/hooks/useCart';

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const { cart, addToCart, removeFromCart, removeItemCompletely, clearCart, getTotalItems, getTotalPrice } = useCart();

  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'Todos') return products;
    return products.filter(product => product.category === selectedCategory);
  }, [selectedCategory]);

  const getCartQuantity = (productId: number) => {
    const item = cart.find(item => item.id === productId);
    return item ? item.quantity : 0;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-4xl font-bold text-center">Loja Moderna</h1>
          <p className="text-muted-foreground text-center mt-2">
            Descubra produtos incríveis com uma experiência de compra excepcional
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Products Section */}
          <div className="flex-1">
            <CategoryFilter
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={addToCart}
                  onRemoveFromCart={removeFromCart}
                  cartQuantity={getCartQuantity(product.id)}
                />
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">
                  Nenhum produto encontrado nesta categoria.
                </p>
              </div>
            )}
          </div>

          {/* Cart Sidebar */}
          <aside className="hidden lg:block">
            <Cart
              cart={cart}
              onRemoveFromCart={removeFromCart}
              onAddToCart={addToCart}
              onRemoveItemCompletely={removeItemCompletely}
              onClearCart={clearCart}
              totalItems={getTotalItems()}
              totalPrice={getTotalPrice()}
            />
          </aside>
        </div>
      </main>

      {/* Mobile Cart Button */}
      <div className="lg:hidden fixed bottom-4 right-4">
        <button className="bg-primary text-primary-foreground rounded-full p-4 shadow-lg hover:scale-110 transition-transform">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.1 5H19M7 13v8a2 2 0 002 2h10a2 2 0 002-2v-3" />
          </svg>
          {getTotalItems() > 0 && (
            <span className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full w-6 h-6 text-xs flex items-center justify-center">
              {getTotalItems()}
            </span>
          )}
        </button>
      </div>
    </div>
  );
}
