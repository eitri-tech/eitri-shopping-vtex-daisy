import { CustomButton, HEADER_TYPE, HeaderTemplate, Loading } from 'eitri-shopping-vtex-daisy-shared'
import { doLogout, getCustomerData, isLoggedIn } from '../services/CustomerService'
import { navigate, PAGES } from '../services/NavigationService'
import { sendPageView } from '../services/TrackingService'
import { useTranslation } from 'eitri-i18n'
import iconLogout from '../assets/icons/logout.svg'
import Eitri from 'eitri-bifrost'
import ProfileCardButton from '../components/ProfileCardButton/ProfileCardButton'
import { setLanguage, startConfigure } from '../services/AppService'
export default function Home(props) {
  const PAGE = 'Minha Conta'
  const [isLoading, setIsLoading] = useState(true)
  const [customerData, setCustomerData] = useState(props.customerData || {})
  const { t, i18n } = useTranslation()
  useEffect(() => {
    const init = async () => {
      await startConfigure()
      setLanguage(i18n)
      const initialInfos = await Eitri.getInitializationInfos()
      if (initialInfos?.action === 'RequestLogin') {
        navigate(
          PAGES.SIGNIN,
          {
            closeAppAfterLogin: true,
          },
          true,
        )
        return
      }
      const isLogged = await isLoggedIn()
      if (!isLogged) {
        navigate(
          PAGES.SIGNIN,
          {
            redirectTo: 'Home',
          },
          true,
        )
        return
      }
      await loadMe()
      setIsLoading(false)
      sendPageView(PAGE)
    }
    init()
  }, [])
  const loadMe = async () => {
    const customerData = await getCustomerData()
    setCustomerData(customerData)
  }
  const _doLogout = async () => {
    setIsLoading(true)
    await doLogout()
    navigate(
      PAGES.SIGNIN,
      {
        redirectTo: 'Home',
      },
      true,
    )
    setIsLoading(false)
  }
  return (
    <Page bottomInset topInset title={PAGE}>
      <Loading fullScreen isLoading={isLoading} />
      <HeaderTemplate headerType={HEADER_TYPE.TEXT} contentText="Minha conta" />
      <View className="p-8">
        <View className="flex items-center p-8">
          <View width={50} height={50} className="flex items-center justify-center bg-primary-content">
            <Text contentColor className="text-primary-content">
              {(customerData?.firstName ?? customerData?.email)?.charAt(0)?.toLocaleUpperCase()}
            </Text>
          </View>
          <View className="flex flex flex-col">
            {customerData?.firstName && (
              <Text className="font-bold text-sm">{`${customerData.firstName} ${customerData.lastName}`}</Text>
            )}
            {customerData?.email && <Text className="text-sm">{customerData.email}</Text>}
          </View>
        </View>
      </View>
      <View className="p-8 flex flex-col">
        <Text className="font-bold text-lg">Dados pessoais</Text>
        <ProfileCardButton
          icon={'user'}
          onClick={() =>
            navigate(PAGES.EDIT_PROFILE, {
              customerData,
            })
          }
        />
        <ProfileCardButton icon={'bookmark'} onClick={() => navigate(PAGES.WISH_LIST)} />
      </View>
      <View className="p-8 flex flex-col">
        <Text className="font-bold text-lg">Pedidos</Text>
        <ProfileCardButton icon={'package'} onClick={() => navigate(PAGES.ORDER_LIST)} />
      </View>
      <View className="p-8">
        <CustomButton
          variant="outlined"
          iconKey="log-out"
          icon={iconLogout}
          iconPosition="right"
          iconJustify="between"
          onClick={_doLogout}
        />
      </View>
    </Page>
  )
}
