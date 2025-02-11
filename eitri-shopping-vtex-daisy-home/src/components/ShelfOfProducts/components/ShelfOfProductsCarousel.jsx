import ProductCard from '../../ProductCard/ProductCard'
import ProductCardLoading from './ProductCardLoading'
import {View, Carousel} from "eitri-luminus";
export default function ShelfOfProductsCarousel(props) {
  const { isLoading, products, gap, locale, currency } = props
  const [currentSlide, setCurrentSlide] = useState(0)
  const [productsPage, setProductsPage] = useState([])
  const products_per_page = 2
  useEffect(() => {
    if (Array.isArray(products)) {
      const pages = []
      for (let i = 0; i < products.length; i += products_per_page) {
        pages.push(products.slice(i, i + products_per_page))
      }
      setProductsPage(pages)
    }
  }, [products])
  const onChangeSlide = (index) => {
    setCurrentSlide(index)
  }
  return (
    <>
      {isLoading ? (
        <ProductCardLoading gap={gap} />
      ) : (
        <Carousel afterChange={onChangeSlide} initialSlide={currentSlide} speed={200}>
          {productsPage &&
            productsPage
              .map((page) => (
                <Carousel.Item key={page?.[0]?.productId} className="flex justify-center">
                  <View className="w-1/2 pr-8 pl-1" >
                    <ProductCard product={page[0]} locale={locale} currency={currency} />
                  </View>
                  {page.length > 1 ? (
                   <View className="w-1/2 pr-8 pl-1" >
                      <ProductCard product={page[1]} locale={locale} currency={currency} />
                    </View>
                  ) : (
                    <View className="h-px w-1/2" />
                  )}
                </Carousel.Item> 
              ))
              .filter((item) => !!item)}
        </Carousel>
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
