import { ReactNode, createContext, useState } from "react";
import { Product } from "../types";

type CartProviderProps = {
  children: ReactNode;
};

type Cart = {
  products: Product[];
  addProduct(product: Product): void;
  removeProduct(idProduct: string): void;
  addQuantityProduct(idProduct: string): void;
  removeQuantityProduct(idProduct: string): void;
};

export const CartContext = createContext<Cart>({} as Cart);

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  /**
   * Estado para armazenar os items no carrinho
   */
  const [products, setProducts] = useState<Product[]>([]);

  /**
   * Função responsável por adicionar um item ao carrinho
   */
  function addProduct(newProduct: Product): void {
    try {
      if (newProduct.stock === 0) {
        throw new Error("Produto indisponível");
      }

      const existsProductIndex = products.findIndex(
        (product) => product.id === newProduct.id
      );

      if (existsProductIndex >= 0) {
        const newListProducts = products;
        const product = newListProducts[existsProductIndex];
        product.quantity += newProduct.quantity;

        newListProducts[existsProductIndex] = product;

        setProducts(newListProducts);
      } else {
        setProducts([...products, newProduct]);
      }
    } catch (err) {
      alert(err.message);
    }
  }
  /**
   * Função responsável por remover um item do carrinho
   */
  function removeProduct(idProduct: string): void {
    const productIndex = products.findIndex((p) => p.id === idProduct);

    if (productIndex >= 0) {
      const newListProducts = products;
      newListProducts.splice(productIndex, 1);

      if (newListProducts.length === 0) {
        setProducts([]);
      } else {
        setProducts(newListProducts);
      }
    }
  }
  /**
   * Função responsável por adiconar a quantdade de  item do carrinho
   */
  function addQuantityProduct(idProduct: string) {
    const existsProductIndex = products.findIndex(
      (product) => product.id === idProduct
    );

    if (existsProductIndex >= 0) {
      const newListProducts = products;

      const product = newListProducts[existsProductIndex];
      product.quantity = product.quantity + 1;

      newListProducts[existsProductIndex] = product;
      setProducts([...newListProducts]);
    }
  }

  /**
   * Função responsável por remover a quantdade de  item do carrinho
   */
  function removeQuantityProduct(idProduct: string) {
    try {
      const existsProductIndex = products.findIndex(
        (product) => product.id === idProduct
      );

      if (existsProductIndex >= 0) {
        const newListProducts = products;
        const product = newListProducts[existsProductIndex];

        if (product.quantity === 1) {
          throw new Error(
            "Você precisa ter pelo menos um item do produto, caso queira remover clique no botão excluir!"
          );
        }
        product.quantity = product.quantity - 1;

        newListProducts[existsProductIndex] = product;

        setProducts([...newListProducts]);
      }
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <CartContext.Provider
      value={{
        addProduct,
        products,
        removeProduct,
        addQuantityProduct,
        removeQuantityProduct,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
