import { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ShoppingCartContext } from "../../context";

function ProductDetailsPage() {
  const params = useParams();
  const { id } = params;

  const {
    productDetails,
    setProductDetails,
    loading,
    setLoading,
    handleAddToCart,
  } = useContext(ShoppingCartContext);
  const navigate = useNavigate();

  async function fetchProductDetails() {
    try {
      setLoading(true);
      const apiResponse = await fetch(`https://dummyjson.com/products/${id}`);
      const result = await apiResponse.json();
      console.log(result);
      if (result) {
        setProductDetails(result);
        setLoading(false);
      }
    } catch (error) {
      console.error("Failed to fetch product:", error);
    } finally {
      setLoading(false);
    }
  }

  console.log(productDetails);

  // function addToCart() {
  //   navigate("/cart");
  // }

  useEffect(() => {
    fetchProductDetails();
  }, [id]);

  if (loading)
    return (
      <h1 className="text-center mt-10 text-xl">Loading product details...</h1>
    );

  return (
    <div className="py-10 px-4 lg:px-20 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-6">
          <div className="rounded-xl shadow-md bg-white p-4 flex items-center justify-center">
            <img
              src={productDetails?.thumbnail}
              alt={productDetails?.title}
              className="rounded-xl w-full max-h-[450px] object-contain"
            />
          </div>

          <div className="flex gap-4 overflow-x-auto">
            {productDetails?.images?.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`Thumbnail ${idx}`}
                className="w-20 h-20 object-cover rounded-lg border hover:scale-105 transition-transform duration-200"
              />
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <h1 className="text-3xl font-bold text-gray-800">
            {productDetails?.title}
          </h1>
          <p className="text-lg text-gray-500">{productDetails?.description}</p>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <span className="text-2xl font-bold text-green-600">
              ${productDetails?.price}
            </span>
            <span className="bg-yellow-200 text-yellow-800 px-3 py-1 rounded-full text-sm">
              Rating: ⭐ {productDetails?.rating}
            </span>
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
              {productDetails?.category}
            </span>
          </div>

          <div>
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-sm font-semibold transition duration-300 shadow-md"
              onClick={() => handleAddToCart(productDetails)}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailsPage;
