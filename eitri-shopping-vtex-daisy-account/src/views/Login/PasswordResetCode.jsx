import BigTitle from '../../components/BigTitle/BigTitle'
import { HEADER_TYPE, HeaderTemplate, CustomButton } from 'eitri-shopping-vtex-daisy-shared'
import { navigate, PAGES } from '../../services/NavigationService'
import { useTranslation } from 'eitri-i18n'
export default function PasswordResetCode(props) {
  const [recoveryCode, setRecoveryCode] = useState('')
  const RECOVERY_CODE_LENGTH = 6
  const email = props?.location?.state?.email
  const { t } = useTranslation()
  const goToPasswordNewPass = () => {
    if (recoveryCode.length !== RECOVERY_CODE_LENGTH) {
      return
    }
    navigate(PAGES.PASSWORD_RESET_NEW_PASS, {
      email: email,
      recoveryCode,
    })
  }
  const onCodeFilled = (value) => {
    setRecoveryCode(value)
  }
  return (
    <Page topInset>
      {/* <HeaderTemplate headerType={HEADER_TYPE.TEXT} contentText={`${t('passwordResetCode.headerText')}`} /> */}
      <View className="p-8">
        <BigTitle title={t('passwordResetCode.forgotPass')} withBackAction />
        <View className="mt-8">
          <Text className="block w-full">
            {t('passwordResetCode.messageEmail')}
            <Text className="ml-2 font-bold">{email}</Text>
          </Text>
        </View>
        <View className="mt-8">
          {/* <CodeInput autoSubmit maxLength={6} onChange={onCodeFilled} accept="numbers" /> */}
        </View>
        <View>
          <CustomButton disabled={recoveryCode.length !== RECOVERY_CODE_LENGTH} onClick={goToPasswordNewPass} />
        </View>
      </View>
    </Page>
  )
}
