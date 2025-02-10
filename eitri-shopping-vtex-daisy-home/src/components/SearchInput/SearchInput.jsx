import Eitri from 'eitri-bifrost'
import { Vtex } from 'eitri-shopping-vtex-shared'
import { autocompleteSuggestions } from '../../services/ProductService'
import CInput from '../CInput/CInput'
import searchIcon from '../../assets/icons/search-normal.svg'
import { useTranslation } from 'eitri-i18n'
let timeoutId
export default function SearchInput(props) {
  const { onSubmit, incomingValue } = props
  const [searchTerm, setSearchTerm] = useState(incomingValue || '')
  const [searchSuggestion, setSearchSuggestion] = useState([])
  const { t } = useTranslation()
  const legacySearch = Vtex?.configs?.searchOptions?.legacySearch
  const debounce = (func, delay) => {
    return function (...args) {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => func.apply(this, args), delay)
    }
  }
  const fetchSuggestions = async (value) => {
    try {
      if (!value) {
        setSearchSuggestion([])
        return
      }
      const result = await autocompleteSuggestions(value)
      setSearchSuggestion(result?.searches)
    } catch (error) {
      console.log('Entrada de pesquisa', 'Erro ao buscar sugestão', error)
    }
  }
  const handleAutocomplete = async (value) => {
    setSearchTerm(value)
    if (legacySearch) {
      return
    }
    const debouncedFetchSuggestions = debounce(fetchSuggestions, 400)
    debouncedFetchSuggestions(value)
  }
  const handleSuggestionSearch = (suggestion) => {
    setSearchTerm(suggestion)
    handleSearch(suggestion)
  }
  const handleSearch = (suggestion) => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    setSearchSuggestion([])
    if (typeof onSubmit === 'function') onSubmit(suggestion)
  }
  const onBlurHandler = () => {
    setTimeout(() => {
      setSearchSuggestion([])
    }, 200)
  }
  const navigateBack = () => {
    Eitri.navigation.back()
  }
  return (
    <View width="100%" className="flex relative items-center">
      <View
        onClick={navigateBack}
        height="36px"
        width="36px"
        className="bg-neutral border-neutral border flex items-center justify-center"
      >
        <svg height="16" id="chevron-left" viewBox="0 0 16 16" width="16" xmlns="http://www.w3.org/2000/svg"><path d="M20 1 L24 5 L14 16 L24 27 L20 31 L6 16 z"/></svg>
      </View>
      <View width="100%">
        <CInput
          icon={searchIcon}
          placeholder={t('searchInput.content')}
          value={searchTerm}
          onChange={(value) => handleAutocomplete(value)}
          onSubmit={(value) => handleSearch(value)}
          onBlur={onBlurHandler}
          autoFocus={!incomingValue}
        />
      </View>
      {searchTerm && searchSuggestion && searchSuggestion.length > 0 && (
        <View
          // width='calc( 100vw - 32px )'
          width="100vw"
          customColor="#fdfdfd"
          className="absolute z-9999 top-50 p-8 flex flex-col"
        >
          {searchSuggestion.map((suggestion, key) => (
            <View
              key={suggestion.term}
              width="100%"
              onClick={() => {
                handleSuggestionSearch(suggestion.term)
              }}
              className="rounded-none border-0"
            >
              <Text width="100%" className="text-primary-content text-lg">
                {suggestion.term}
              </Text>
            </View>
          ))}
        </View>
      )}
    </View>
  )
}
