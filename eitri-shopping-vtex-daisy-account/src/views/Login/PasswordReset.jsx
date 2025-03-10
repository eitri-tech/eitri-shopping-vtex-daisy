import mailIcon from '../../assets/icons/mail-01.svg'
import BigTitle from '../../components/BigTitle/BigTitle'
import { sendPasswordResetCode } from '../../services/CustomerService'
import { Loading, HeaderTemplate, HEADER_TYPE, CustomButton, CustomInput } from 'eitri-shopping-vtex-daisy-shared'
import Alert from '../../components/Alert/Alert'
import { sendPageView } from '../../services/TrackingService'
import { navigate, PAGES } from '../../services/NavigationService'
import { useTranslation } from 'eitri-i18n'
export default function PasswordReset(props) {
  const [username, setUsername] = useState('')
  const [loading, setLoading] = useState(false)
  const [showErrorAlert, setShowErrorAlert] = useState(false)
  const { t } = useTranslation()
  useEffect(() => {
    const email = props?.location?.state?.email
    if (email) {
      setUsername(email)
    }
    sendPageView(t('passwordReset.recoveryPass'))
  }, [])
  const goToPasswordResetCode = async () => {
    try {
      if (!username) {
        return
      }
      setLoading(true)
      await sendPasswordResetCode(username)
      navigate(PAGES.PASSWORD_RESET_CODE, {
        email: username,
      })
      setLoading(false)
    } catch (e) {
      setShowErrorAlert(true)
      setLoading(false)
    }
  }
  return (
    <Page topInset>
      <Loading isLoading={loading} fullScreen={true} />
      <View className="p-8 py-12">
        <BigTitle title={t('passwordReset.forgotPass')} withBackAction />
        <View className="mt-8">
          <CustomInput
            icon={mailIcon}
            placeholder={t('passwordReset.setEmail')}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </View>
        <View className="mt-4">
          <Text className="block w-full text-sm" >{t('passwordReset.messageRecovery')}</Text>
        </View>
        <View className="mt-8">
          <CustomButton width="100%" label={t('passwordReset.sendButton')} onClick={goToPasswordResetCode} />
        </View>
      </View>
      <Alert
        type="negative"
        show={showErrorAlert}
        onDismiss={() => setShowErrorAlert(false)}
        duration={7}
        message={t('passwordReset.messageError')}
      />
    </Page>
  )
}
