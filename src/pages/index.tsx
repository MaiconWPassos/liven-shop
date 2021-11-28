import axios from "axios";
import ProductCard from "../components/ProductCard";
import { Product } from "../types";

export default function Home({ products }) {
  return (
    <div className="w-full  md:px-20  flex justify-center items-center flex-wrap">
      {products.map((product: Product) => (
        <ProductCard
          key={product.id}
          name={product.name}
          id={product.id}
          price={product.price}
          image={product.image}
        />
      ))}
    </div>
  );
}

export async function getStaticProps() {
  
  const { data, status } = await axios.get(
    "https://5d6da1df777f670014036125.mockapi.io/api/v1/product"
  );

  let products = [];

  if (status === 200 && data.length > 0) {
    products = data;
  }

  return {
    props: {
      products,
    }, // will be passed to the page component as props
  };
}
