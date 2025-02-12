import ProductCard from '../../ProductCard/ProductCard'
import ProductCardLoading from './ProductCardLoading'
import {View, Carousel} from "eitri-luminus";
export default function ShelfOfProductsCarousel(props) {
  const { isLoading, products, gap, locale, currency } = props
  const [currentSlide, setCurrentSlide] = useState(0)

  const products_per_page = 2
  const onChangeSlide = (index) => {
    setCurrentSlide(index)
  }

  return (
    <>
      {isLoading ? (
        <ProductCardLoading gap={gap} />
      ) : (
        <View className="w-full overflow-x-auto flex space-x-4">
          {products && 
            products.map((product, index) => (
              <View key={product.productId} className="flex">
                <View className="w-[210px] pr-8 pl-1">
                  <ProductCard product={product} locale={locale} currency={currency} />
                </View>
              </View>
          ))}
        </View>
      )}
      <View className="mt-8 flex justify-center">
        {products &&
          Array.from(
            {
              length: Math.ceil(products.length / 2),
            },
            (_, index) => (
              <View
                key={index}
                className={`w-8 h-[6px] ${currentSlide === index ? 'bg-primary-700' : 'bg-neutral-300'}`}
              />

            ),
          )}
      </View>
    </>
  )
}
