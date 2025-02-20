import userIcon from '../../assets/icons/user.svg'
import lockIcon from '../../assets/icons/lock.svg'
import Eitri from 'eitri-bifrost'
import { Loading, HeaderTemplate, HEADER_TYPE, CustomButton, CustomInput } from 'eitri-shopping-vtex-daisy-shared'
import {
  doLogin,
  getCustomerData,
  getSavedUser,
  loginWithEmailAndKey,
  sendAccessKeyByEmail,
} from '../../services/CustomerService'
import Alert from '../../components/Alert/Alert'
import { sendPageView } from '../../services/TrackingService'
import { navigate, PAGES } from '../../services/NavigationService'
import BigTitle from '../../components/BigTitle/BigTitle'
import { useTranslation } from 'eitri-i18n'
export default function SignIn(props) {
  const redirectTo = props?.location?.state?.redirectTo
  const closeAppAfterLogin = props?.location?.state?.closeAppAfterLogin
  const LOGIN_WITH_EMAIL_AND_PASSWORD = 'emailAndPassword'
  const LOGIN_WITH_EMAIL_AND_ACCESS_KEY = 'emailAndAccessKey'
  const TIME_TO_RESEND_EMAIL = 60
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [showLoginErrorAlert, setShowLoginErrorAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')
  const [loginMode, setLoginMode] = useState(LOGIN_WITH_EMAIL_AND_PASSWORD)
  const [verificationCode, setVerificationCode] = useState('')
  const [emailCodeSent, setEmailCodeSent] = useState(false)
  const [timeOutToResentEmail, setTimeOutToResentEmail] = useState(0)
  const [loadingSendingCode, setLoadingSendingCode] = useState(false)
  const { t } = useTranslation()
  useEffect(() => {
    const loadSavedUser = async () => {
      const user = await getSavedUser()
      if (user && user.email) {
        setUsername(user.email)
      }
    }
    loadSavedUser()
    sendPageView('Login')
  }, [])
  useEffect(() => {
    if (timeOutToResentEmail > 0) {
      setTimeout(() => {
        setTimeOutToResentEmail((prevState) => prevState - 1)
      }, 1000)
    }
  }, [timeOutToResentEmail])
  const goToPasswordReset = () => {
    navigate(PAGES.PASSWORD_RESET, {
      email: username,
    })
  }
  const setLoginMethod = (method) => {
    setLoginMode(method)
  }
  const sendAccessKey = async () => {
    try {
      if (timeOutToResentEmail > 0) {
        return
      }
      setLoadingSendingCode(true)
      await sendAccessKeyByEmail(username)
      setEmailCodeSent(true)
      setTimeOutToResentEmail(TIME_TO_RESEND_EMAIL)
      setLoadingSendingCode(false)
    } catch (e) {
      console.log('erro ao enviar email', e)
      setAlertMessage(t('signIn.errosSendAccess'))
      setShowLoginErrorAlert(true)
      setEmailCodeSent(false)
      setTimeOutToResentEmail(0)
      setLoadingSendingCode(false)
    }
  }
  const handleLogin = async () => {
    setLoading(true)
    try {
      await doLogin(username, password)
      const customerData = await getCustomerData()
      if (redirectTo) {
        navigate(
          redirectTo,
          {
            customerData,
          },
          true,
        )
      } else if (closeAppAfterLogin) {
        Eitri.close()
      } else {
        Eitri.navigation.back()
      }
    } catch (e) {
      setAlertMessage(t('signIn.errorInvalidUser'))
      setShowLoginErrorAlert(true)
    }
    setLoading(false)
  }
  const loginWithEmailAndAccessKey = async () => {
    const loggedIn = await loginWithEmailAndKey(username, verificationCode)
    const customerData = await getCustomerData()
    if (loggedIn === 'WrongCredentials') {
      setAlertMessage(t('signIn.wrongCredentials'))
      setShowLoginErrorAlert(true)
    } else if (loggedIn === 'Success') {
      if (redirectTo) {
        navigate(
          redirectTo,
          {
            customerData,
          },
          true,
        )
      } else if (closeAppAfterLogin) {
        Eitri.close()
      } else {
        Eitri.navigation.back()
      }
    } else {
      setAlertMessage(t('signIn.verifyAgain'))
      setShowLoginErrorAlert(true)
    }
  }
  const resendCode = timeOutToResentEmail > 0
  return (
    <Page topInset>
      <Loading isLoading={loading} fullScreen={true} />
      <View className="py-12 px-8">
          <BigTitle title={t('signIn.welcome')} withBackAction />
            
        {loginMode === LOGIN_WITH_EMAIL_AND_PASSWORD && (
          <>
            <View className="mt-8">
              <CustomInput
                icon={userIcon}
                value={username}
                placeholder={t('signIn.formName')}
                onChange={(value) => setUsername(value)}
              />
            </View>
            <View className="mt-4">
              <CustomInput
                placeholder={t('signIn.formPass')}
                icon={lockIcon}
                value={password}
                type="password"
                onChange={(value) => setPassword(value)}
              />
            </View>
            <View className="mt-4">
              <CustomButton 
                width="100%"
                label={t('signIn.labelButton')}
                onClick={handleLogin} />
            </View>
            <View className="mt-4">
              <CustomButton
                width="100%"
                variant="outlined"
                label={t('signIn.labelAccessWithCode')}
                onClick={() => setLoginMethod(LOGIN_WITH_EMAIL_AND_ACCESS_KEY)}
              />
            </View>
            <View className="flex justify-center mt-4">
              <View onClick={goToPasswordReset}>
                <Text className="block w-full text-primary-content underline">{t('signIn.forgotPass')}</Text>
              </View>
            </View>
            <View className="mt-4 flex justify-center">
              <View
                onClick={() => {
                  navigate(PAGES.SIGNUP)
                }}
              >
                <Text className="block w-full text-primary-content underline">{t('signIn.noRegister')}</Text>
              </View>
            </View>
          </>
        )}
        {loginMode === LOGIN_WITH_EMAIL_AND_ACCESS_KEY && (
          <View className="px-8">
            <CustomInput
              icon={userIcon}
              value={username}
              type="email"
              placeholder={t('signIn.formEmail')}
              onChange={(value) => {
                setUsername(value)
              }}
              showClearInput={false}
              required={true}
            />
            {emailCodeSent && (
              <>
                <View className="mt-8">
                  <CustomInput
                    label={t('signIn.formCodeVerification')}
                    placeholder={t('signIn.formCodeVerification')}
                    inputMode="numeric"
                    value={verificationCode}
                    onChange={(text) => setVerificationCode(text)}
                    height="45px"
                  />
                </View>
                <View className="mt-4">
                  <CustomButton 
                    label={t('signIn.labelButton')} 
                    onClick={loginWithEmailAndAccessKey} 
                    disabled={!username || !verificationCode} 
                  />
                </View>
              </>
            )}
            <View className="mt-4">
              <CustomButton
                label={
                  !emailCodeSent
                    ? t('signIn.textSendCode')
                    : `${t('signIn.textResendCode')}${resendCode ? ` (${timeOutToResentEmail})` : ''
                    }`
                }
                disabled={resendCode || !username || loadingSendingCode} 
                onClick={sendAccessKey} />
            </View>
            <View className="mt-4">
              <CustomButton 
                variant="outlined"
                label={t('signIn.labelLoginWithPass')}
                onClick={() => setLoginMethod(LOGIN_WITH_EMAIL_AND_PASSWORD)} 
                />
            </View>
          </View>
        )}
      </View>
      <Alert
        type="negative"
        show={showLoginErrorAlert}
        onDismiss={() => setShowLoginErrorAlert(false)}
        duration={7}
        message={alertMessage}
      />
    </Page>
  )
}
