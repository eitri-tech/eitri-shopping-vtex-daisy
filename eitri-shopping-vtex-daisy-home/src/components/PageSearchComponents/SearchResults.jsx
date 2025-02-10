import { Loading } from 'eitri-shopping-vtex-daisy-shared'
import ProductCard from '../ProductCard/ProductCard'
import { useTranslation } from 'eitri-i18n'
export default function SearchResults(props) {
  const { searchResults, isLoading, locale, currency } = props
  const { t } = useTranslation()
  if (searchResults.length === 0 && !isLoading) {
    return <Text>{t('searchResults.resultNotFound')}</Text>
  }
  return (
    <View className="flex flex-col">
      {searchResults.map(
        (product, index) =>
          index % 2 === 0 && (
            <View key={searchResults[index].productId} className="flex">
              <View width="50%" className="pr-1">
                <ProductCard product={searchResults[index]} locale={locale} currency={currency} />
              </View>
              {searchResults[index + 1] && (
                <View width="50%" className="pl-1">
                  <ProductCard product={searchResults[index + 1]} locale={locale} currency={currency} />
                </View>
              )}
            </View>
          ),
      )}
      {isLoading && (
        <View className="flex items-center justify-center">
          <Loading />
        </View>
      )}
    </View>
  )
}
