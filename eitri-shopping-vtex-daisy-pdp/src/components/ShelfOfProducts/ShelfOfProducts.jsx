import { Loading } from 'eitri-shopping-vtex-daisy-shared'
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
        <View className={`flex justify-between items-center px-${paddingHorizontal || '36'}`}>
          <Text className="font-bold">{isLoading ? t('shelfOfProducts.loading') : title}</Text>
          {searchParams && (
            <View onClick={seeMore} className="flex items-center min-w-fit">
              <Text className="font-bold text-primary-content">{t('shelfOfProducts.seeMore')}</Text>
              <View>{/* <Icon iconKey="chevron-right" color="primary-900" width={18} height={18} /> */}</View>
            </View>
          )}
        </View>
      )}
      {mode === 'carousel' && (
        <ShelfOfProductsCarousel
          paddingHorizontal={paddingHorizontal}
          isLoading={isLoading}
          products={products}
          gap={gap}
        />
      )}
      {mode !== 'carousel' && (
        <Stack className={`flex flex-row overflow-x-scroll gap-${gap} snap-x snap-mandatory`}>
          {gap && <View className={`w-${gap} h-1`}/>}
          {/*  */}
          {isLoading && (
            <View className={`flex flex-row flex gap-${gap}`}>
              <View className="w-188 min-h-288 border-info-content border bg-neutral">
                <View className="flex flex-col justify-center items-center p-2">
                  <Loading inline width="80px" />
                </View>
              </View>
              <View className="w-188 min-h-288 border-info-content border bg-neutral">
                <View className="flex flex-col justify-center items-center p-2">
                  <Loading inline width="80px" />
                </View>
              </View>
            </View>
          )}
          {!isLoading &&
            products &&
            products.map((product) => (
              <View className={`snap-start scroll-ml-${gap}`}>
                <ProductCard product={product} key={product?.productId} width="188px" />
              </View>
            ))}
          {gap && <View className={`w-${gap} h-1`}/>}
        </Stack>
      )}
    </View>
  )
}
