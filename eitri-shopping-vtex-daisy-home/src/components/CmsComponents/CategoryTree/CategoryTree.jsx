import Eitri from 'eitri-bifrost'
import { Vtex } from 'eitri-shopping-vtex-shared'
import { resolveNavigation } from '../../../services/NavigationService'
import ListWithImages from './components/ListWithImages'
import SimpleList from './components/SimpleList'
export default function CategoryTree(props) {
  const { data } = props
  const [currentShelf, setCurrentShelf] = useState(null)
  const legacySearch = Vtex?.configs?.searchOptions?.legacySearch
  useEffect(() => {
    if (data?.shelfs) {
      setCurrentShelf(data.shelfs[0])
    }
  }, [data?.shelfs])
  const onChooseShelf = (shelf) => {
    setCurrentShelf(shelf)
  }
  const chooseCategory = (category) => {
    if (legacySearch) {
      console.log('chooseCategory >> legacySearch >>', JSON.stringify(category))
      Eitri.navigation.navigate({
        path: 'ProductCatalog',
        state: {
          facets: category.facets,
          title: category.title,
        },
      })
      return
    }
    resolveNavigation(category.facets)
  }
  return (
    <>
      {(data.shelfs?.length > 1 || (data.shelfs?.length === 1 && data.shelfs[0].title)) && (
        <View className="overflow-x-auto flex px-8">
          {data.shelfs?.map((shelf) => (
            <>
              {shelf.title && (
                <View
                  minWidth="fit-content"
                  key={shelf.title}
                  onClick={() => onChooseShelf(shelf)}
                  backgroundColor={shelf.title === currentShelf?.title ? 'secondary-500' : 'neutral-100'}
                  borderColor={shelf.title === currentShelf?.title ? 'secondary-500' : 'neutral-300'}
                  className="py-1 border"
                >
                  <Text
                    color={shelf.title === currentShelf?.title ? 'secondary-500' : 'neutral-300'}
                    contentColor
                    fontFamily="Baloo 2"
                  >
                    {shelf.title}
                  </Text>
                </View>
              )}
            </>
          ))}
        </View>
      )}
      {currentShelf &&
        (currentShelf.showAsSimpleItem ? (
          <SimpleList currentShelf={currentShelf} chooseCategory={chooseCategory} />
        ) : (
          <ListWithImages currentShelf={currentShelf} chooseCategory={chooseCategory} />
        ))}
    </>
  )
}
