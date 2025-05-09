import lockIcon from '../../assets/icons/lock.svg'
import BigTitle from '../../components/BigTitle/BigTitle'
import { Loading, HeaderTemplate, HEADER_TYPE, CustomButton, CustomInput } from 'eitri-shopping-vtex-daisy-shared'
import Alert from '../../components/Alert/Alert'
import { navigate, PAGES } from '../../services/NavigationService'
import { useTranslation } from 'eitri-i18n'
export default function PasswordResetNewPass(props) {
  const email = props?.location?.state?.email
  const recoveryCode = props?.location?.state?.recoveryCode
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [showErrorAlert, setShowErrorAlert] = useState(false)
  const { t } = useTranslation()
  const requirements = [
    {
      text: t('passwordResetNewPass.passwordRequirementsCharacters'),
      valid: newPassword.length >= 8,
    },
    {
      text: t('passwordResetNewPass.passwordRequirementsNumber'),
      valid: /[0-9]/.test(newPassword),
    },
    {
      text: t('passwordResetNewPass.passwordRequirementsUppercase'),
      valid: /[A-Z]/.test(newPassword),
    },
    {
      text: t('passwordResetNewPass.passwordRequirementsLowercase'),
      valid: /[a-z]/.test(newPassword),
    },
  ]
  const confirmNewPassword = async () => {
    try {
      if (!email || !recoveryCode || !newPassword) {
        return
      }
      setLoading(true)
      await sendPassword(email, recoveryCode, newPassword)
      navigate('Home')
      setLoading(false)
    } catch (e) {
      logError(PAGE, 'Erro ao redefinir senha', e)
      setShowErrorAlert(true)
      setLoading(false)
    }
  }
  const allRequirementsMet = requirements.every((req) => req.valid)
  const passwordsMatch = newPassword === confirmPassword
  return (
    <Page topInset>
      <Loading isLoading={loading} fullScreen={true} />
      <View className="p-8">
        <BigTitle title={t('passwordResetNewPass.forgotPass')} withBackAction />
        <View className="mt-8">
          <CustomInput
            autoFocus
            icon={lockIcon}
            type="password"
            placeholder={t('passwordResetNewPass.newPass')}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </View>
        <View className="mt-8">
          <CustomInput
            icon={lockIcon}
            type="password"
            placeholder={t('passwordResetNewPass.confirmPass')}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </View>
        <View className="mt-8">
          <Text className="font-bold">{t('passwordResetNewPass.passwordRequirements')}</Text>
          <View>
            {requirements.map((req, index) => (
              <View key={req.text} className="flex items-center">
                <View>
                  {/* <Icon color={req.valid ? 'positive-700' : 'negative-700'} width={16} height={16} iconKey={req.valid ? 'check' : 'x'} /> */}
                </View>
                <Text key={index} color={req.valid ? 'positive-700' : 'negative-700'}>
                  {req.text}
                </Text>
              </View>
            ))}
          </View>
        </View>
        <View className="mt-8">
          <CustomButton
            width="100%"
            disabled={!newPassword || newPassword !== confirmPassword}
            onClick={confirmNewPassword}
          />
        </View>
      </View>
      <Alert
        type="negative"
        show={showErrorAlert}
        onDismiss={() => setShowErrorAlert(false)}
        duration={7}
        message={t('passwordResetNewPass.messageError')}
      />
    </Page>
  )
}
