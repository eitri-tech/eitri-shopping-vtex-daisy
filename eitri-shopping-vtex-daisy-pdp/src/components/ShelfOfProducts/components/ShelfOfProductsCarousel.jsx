import ProductCard from '../../ProductCard/ProductCard'
import ProductCardLoading from './ProductCardLoading'
export default function ShelfOfProductsCarousel(props) {
  const { isLoading, products, gap, locale, currency, paddingHorizontal } = props
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
                <View key={page?.[0]?.productId} className="flex justify-center">
                  <View className={`w-[50%] pl-${paddingHorizontal || '36'} pr-1`}>
                    <ProductCard product={page[0]} locale={locale} currency={currency} />
                  </View>
                  {page.length > 1 ? (
                    <View className={`w-[50%] pl-${paddingHorizontal || '36'} pr-1`}>
                      <ProductCard product={page[1]} locale={locale} currency={currency} />
                    </View>
                  ) : (
                    <View className='h-1 w-[50%]'/>
                  )}
                </View>
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
                className={`w-32 h-6 bg-${currentSlide === index ? 'primary-700' : 'neutral-300'}`}
                key={index}
              />
            ),
          )}
      </View>
    </>
  )
}
