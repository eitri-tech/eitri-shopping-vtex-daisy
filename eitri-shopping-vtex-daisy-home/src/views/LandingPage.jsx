import Eitri from 'eitri-bifrost'
import { openCart } from '../services/NavigationService'
import { Loading, HeaderTemplate, HEADER_TYPE } from 'eitri-shopping-vtex-daisy-shared'
import { useLocalShoppingCart } from '../providers/LocalCart'
import { getCmsContent } from '../services/CmsService'
import { getMappedComponent } from '../utils/getMappedComponent'
import { useTranslation } from 'eitri-i18n'
export default function LandingPage(props) {
  const [cmsContent, setCmsContent] = useState(null)
  const [ladingPageLogo, setLadingPageLogo] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const { t } = useTranslation()
  const loadCms = async () => {
    try {
      const landingPageName = props?.location?.state?.landingPageName
      const { sections, settings } = await getCmsContent('landingPage', landingPageName)
      setCmsContent(sections)
      setLadingPageLogo(settings?.imageLogo?.logoUrl)
      setIsLoading(false)
    } catch (e) {
      setIsLoading(false)
    }
  }
  useEffect(() => {
    loadCms()
  }, [])
  const { cart } = useLocalShoppingCart()
  const navigateCart = () => {
    openCart(cart)
  }
  const navigateToSearch = () => {
    Eitri.navigation.navigate({
      path: 'Search',
    })
  }
  return (
    <Page bottomInset topInset>
      <HeaderTemplate headerType={HEADER_TYPE.RETURN_AND_TEXT} contentText={props?.location?.state?.pageTitle ?? ''} />
      <Loading fullScreen isLoading={isLoading} />
      <View className="py-8 flex flex-col">
        {ladingPageLogo && (
          <View width="100%" className="flex items-center justify-center">
            <Image src={ladingPageLogo} maxHeight="52px" />
          </View>
        )}
        {cmsContent?.map((content) => getMappedComponent(content))}
      </View>
    </Page>
  )
}
