import { Loading } from 'eitri-shopping-vtex-daisy-shared'
import { Text, View} from "eitri-luminus";
import ProductCard from '../ProductCard/ProductCard'
import ShelfOfProductsCarousel from './components/ShelfOfProductsCarousel'
import Eitri from 'eitri-bifrost'
import { useTranslation } from 'eitri-i18n'
export default function ShelfOfProducts(props) {
  const { products, title, gap, paddingHorizontal, isLoading, mode, searchParams, ...rest } = props
  const { t } = useTranslation()
  const seeMore = () => {
    Eitri.navigation.navigate({
      path: 'ProductCatalog',
      state: {
        params: searchParams,
        title: title,
      },
    })
  }
  return (
    <View>
      {title && (
        <View paddingHorizontal={paddingHorizontal || 'large'} className="flex justify-between items-center">
          <Text className="font-bold">{isLoading ? t('shelfOfProducts.loading') : title}</Text>
          {searchParams && (
            <View onClick={seeMore} minWidth="fit-content" className="flex items-center">
              <Text className="font-bold text-primary-content">{t('shelfOfProducts.seeMore')}</Text>
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M9 6L15 12L9 18" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
            </View>
          )}
        </View>
      )}
      {mode === 'carousel' && <ShelfOfProductsCarousel isLoading={isLoading} products={products} gap={gap} />}
      {mode !== 'carousel' && (
        <Stack gap={gap} scrollSnapType="x mandatory" className="flex flex-row overflow-x-scroll">
          {gap && <View width={gap} height="1px" />}
          {isLoading && (
            <View gap={gap} className="flex flex-row flex">
              <View width="188px" minHeight="288px" className="border-info-content border bg-neutral">
                <View className="flex flex-col justify-center items-center p-2">
                  <Loading inline width="80px" />
                </View>
              </View>
              <View width="188px" minHeight="288px" className="border-info-content border bg-neutral">
                <View className="flex flex-col justify-center items-center p-2">
                  <Loading inline width="80px" />
                </View>
              </View>
            </View>
          )}
          {!isLoading &&
            products &&
            products.map((product) => (
              <View scrollSnapAlign="start" scrollMarginLeft={gap}>
                <ProductCard product={product} key={product?.productId} width="188px" />
              </View>
            ))}
          {gap && <View width={gap} height="1px" />}
        </Stack>
      )}
    </View>
  )
}
