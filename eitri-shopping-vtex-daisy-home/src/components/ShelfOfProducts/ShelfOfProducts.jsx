import { Loading } from 'eitri-shopping-vtex-daisy-shared'
import ProductCard from '../ProductCard/ProductCard'
import ShelfOfProductsCarousel from './components/ShelfOfProductsCarousel'
import Eitri from 'eitri-bifrost'
import { useTranslation } from 'eitri-i18n'
export default function ShelfOfProducts(props) {
  const { products, title, gap, paddingHorizontal, isLoading, mode, searchParams, ...rest } = props
  const [currencyProps, setCurrencyProps] = useState({})
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
  useEffect(() => {
    configLanguage()
  }, [])
  const configLanguage = async () => {
    const remoteConfig = await Eitri.environment.getRemoteConfigs()
    const locale = remoteConfig?.storePreferences?.locale || 'pt-BR'
    const currency = remoteConfig?.storePreferences?.currencyCode || 'BRL'
    setCurrencyProps({
      locale,
      currency,
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
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M8 5L15.57 11.6237C15.7976 11.8229 15.7976 12.1771 15.57 12.3763L8 19" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
            </View>
          )}
        </View>
      )}
      {mode === 'carousel' && (
        <ShelfOfProductsCarousel
          isLoading={isLoading}
          products={products}
          gap={gap}
          locale={currencyProps.locale}
          currency={currencyProps.currency}
        />
      )}
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
                <ProductCard
                  product={product}
                  key={product?.productId}
                  width="188px"
                  locale={currencyProps.locale}
                  currency={currencyProps.currency}
                />
              </View>
            ))}
          {gap && <View width={gap} height="1px" />}
        </Stack>
      )}
    </View>
  )
}
