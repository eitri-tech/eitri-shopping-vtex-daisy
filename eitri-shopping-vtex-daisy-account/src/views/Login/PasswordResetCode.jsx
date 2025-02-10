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
		navigate(PAGES.PASSWORD_RESET_NEW_PASS, { email: email, recoveryCode })
	}

	const onCodeFilled = value => {
		setRecoveryCode(value)
	}

	return (
		<Window topInset>
			<HeaderTemplate
				headerType={HEADER_TYPE.TEXT}
				contentText={`${t('passwordResetCode.headerText')}`}
			/>

			<View padding='large'>
				<BigTitle
					title={t('passwordResetCode.forgotPass')}
					withBackAction
				/>

				<View marginTop='large'>
					<Text block>
						{t('passwordResetCode.messageEmail')}
						<Text marginLeft='small' fontWeight='bold'>{email}</Text>
					</Text>
				</View>

				<View marginTop='large'>
					<CodeInput
						autoSubmit
						maxLength={6}
						onChange={onCodeFilled}
						accept='numbers'
					/>
				</View>

				<View marginTop='giant'>
					<CustomButton
						disabled={recoveryCode.length !== RECOVERY_CODE_LENGTH}
						label={t('passwordResetCode.sendButton')}
						onPress={goToPasswordNewPass}
					/>
				</View>
			</View>
		</Window>
	)
}
