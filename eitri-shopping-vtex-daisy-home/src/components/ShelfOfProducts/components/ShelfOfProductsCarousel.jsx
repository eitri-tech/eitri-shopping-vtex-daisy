import ProductCard from '../../ProductCard/ProductCard'
import ProductCardLoading from './ProductCardLoading'
import {View} from "eitri-luminus";
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
                <View key={page?.[0]?.productId} className="flex justify-center">
                  <View width="50%" className="pl-8 pr-1">
                    <ProductCard product={page[0]} locale={locale} currency={currency} />
                  </View>
                  {page.length > 1 ? (
                    <View width="50%" className="pr-8 pl-1">
                      <ProductCard product={page[1]} locale={locale} currency={currency} />
                    </View>
                  ) : (
                    <View height="1px" width="50%" />
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
                key={index}
                backgroundColor={currentSlide === index ? 'primary-700' : 'neutral-300'}
                width="32px"
                height="6px"
              />
            ),
          )}
      </View>
    </>
  )
}
