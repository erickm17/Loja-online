import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ShoppingCart, Trash2, Plus, Minus } from "lucide-react";
import { CartItem } from "@/hooks/useCart";

interface CartProps {
  cart: CartItem[];
  onRemoveFromCart: (productId: number) => void;
  onAddToCart: (product: any) => void;
  onRemoveItemCompletely: (productId: number) => void;
  onClearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

export function Cart({
  cart,
  onRemoveFromCart,
  onAddToCart,
  onRemoveItemCompletely,
  onClearCart,
  totalItems,
  totalPrice
}: CartProps) {
  return (
    <Card className="w-full max-w-md h-fit sticky top-4">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <ShoppingCart className="w-5 h-5" />
          Carrinho ({totalItems})
        </CardTitle>
        {cart.length > 0 && (
          <Button
            variant="outline"
            size="sm"
            onClick={onClearCart}
            className="text-destructive hover:text-destructive"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        )}
      </CardHeader>
      <CardContent>
        {cart.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">
            Seu carrinho está vazio
          </p>
        ) : (
          <div className="space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="flex items-center gap-3">
                <div className="w-12 h-12 bg-muted rounded-md flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">{item.name}</p>
                  <p className="text-sm text-muted-foreground">
                    R$ {item.price.toFixed(2)}
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onRemoveFromCart(item.id)}
                    className="h-8 w-8 p-0"
                  >
                    <Minus className="w-3 h-3" />
                  </Button>
                  <Badge variant="secondary" className="min-w-[2rem] justify-center">
                    {item.quantity}
                  </Badge>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onAddToCart(item)}
                    className="h-8 w-8 p-0"
                  >
                    <Plus className="w-3 h-3" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onRemoveItemCompletely(item.id)}
                    className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            ))}
            <Separator />
            <div className="flex justify-between items-center font-semibold text-lg">
              <span>Total:</span>
              <span>R$ {totalPrice.toFixed(2)}</span>
            </div>
            <Button className="w-full" size="lg">
              Finalizar Compra
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
