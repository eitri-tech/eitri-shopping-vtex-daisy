import { CustomButton, HEADER_TYPE, HeaderTemplate, Loading } from 'eitri-shopping-vtex-daisy-shared'
import { doLogout, getCustomerData, isLoggedIn } from '../services/CustomerService'
import { navigate, PAGES } from '../services/NavigationService'
import { sendPageView } from '../services/TrackingService'
import { useTranslation } from 'eitri-i18n'
import iconLogout from '../assets/icons/logout.svg'
import Eitri from 'eitri-bifrost'
import ProfileCardButton from '../components/ProfileCardButton/ProfileCardButton'
import { setLanguage, startConfigure } from '../services/AppService'
import BigTitle from '../components/BigTitle/BigTitle'
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
      <View className="px-8 pt-12">
        <BigTitle title="Minha conta" withBackAction />
      </View>
      <View className="px-8 flex gap-4 mt-12">
        <View className="flex items-center p-4 gap-4  w-full shadow-md rounded-md bg-neutral-50">
          <View width={50} height={50} className="flex items-center justify-center rounded-full bg-orange-300">
            <Text contentColor className="text-primary-content text-neutral-50 text-2xl">
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
      <View className="px-8 py-4 flex flex-col gap-2">
        <Text className="font-bold text-lg">Dados pessoais</Text>
        <ProfileCardButton
          icon={'user'}
          label="Minha conta"
          onClick={() =>
            navigate(PAGES.EDIT_PROFILE, {
              customerData,
            })
          }
        />
        <ProfileCardButton icon={'bookmark'} label="Meus Favoritos" onClick={() => navigate(PAGES.WISH_LIST)} />
      </View>
      <View className="px-8 py-4 flex flex-col gap-2">
        <Text className="font-bold text-lg">Pedidos</Text>
        <ProfileCardButton icon={'package'} label="Meus pedidos" onClick={() => navigate(PAGES.ORDER_LIST)} />
      </View>
      <View className="px-8 py-4" >
        <CustomButton
          variant="outlined"
          // iconKey="log-out"
          icon={iconLogout}
          // iconPosition="right"
          // iconJustify="between"
          label="Sair"
          onClick={_doLogout}
        />
      </View>
    </Page>
  )
}
