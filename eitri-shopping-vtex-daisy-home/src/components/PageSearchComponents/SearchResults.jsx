import { Loading } from "eitri-shopping-vtex-daisy-shared";
import ProductCard from "../ProductCard/ProductCard";
import { useTranslation } from 'eitri-i18n'

export default function SearchResults(props) {
  const { searchResults, isLoading } = props;

  const { t } = useTranslation()

  if (searchResults.length === 0 && !isLoading) {
    return <Text>{t('searchResults.resultNotFound')}</Text>;
  }

  return (
      <View direction="column" gap={16}>
        {searchResults.map(
          (product, index) =>
            index % 2 === 0 && (
              <View key={searchResults[index].productId} display="flex">
                <View width="50%" paddingRight="nano">
                  <ProductCard product={searchResults[index]} />
                </View>
                {searchResults[index + 1] && (
                  <View width="50%" paddingLeft="nano">
                    <ProductCard product={searchResults[index + 1]} />
                  </View>
                )}
              </View>
            )
        )}
        {isLoading && (
          <View display="flex" alignItems="center" justifyContent="center">
            <Loading />
          </View>
        )}
      </View>
  );
}
