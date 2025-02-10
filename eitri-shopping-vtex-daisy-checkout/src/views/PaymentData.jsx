import { CustomButton, Loading, HeaderTemplate, HEADER_TYPE } from 'eitri-shopping-vtex-daisy-shared'
import Eitri from 'eitri-bifrost'
import { useLocalShoppingCart } from '../providers/LocalCart'
import PaymentMethods from '../components/Methods/PaymentMethods'
import { sendPageView } from '../services/trackingService'
import { useTranslation } from 'eitri-i18n'
import GiftCardInput from '../components/GiftCardInput/GiftCardInput'

export default function PaymentData(props) {
	const { cart, selectedPaymentData, setPaymentOption } = useLocalShoppingCart()
	const [isLoading, setIsLoading] = useState(false)

	const { t } = useTranslation()

	useEffect(() => {
		sendPageView('Dados de pagamento')
	}, [])

	// TODO ver cenário onde o carrinho já vem com um metodo de pagamento. Para evitar que o usuário tenha que selecionar novamente
	// useEffect(() => {
	// 	if (!selectedPaymentData) {
	// 		const currentGroup = cart?.paymentSystems.find(system => system.isCurrentPaymentSystemGroup)
	// 		if (currentGroup) {
	// 			setSelectedPaymentData({ groupName: currentGroup.groupName })
	// 		}
	// 	}
	// }, [cart])

	const submitPaymentSystemSelected = async () => {
		setIsLoading(true)
		await handlePaymentOptionsChange()
		setIsLoading(false)
		await Eitri.navigation.back()
	}

	const handlePaymentOptionsChange = async () => {
		let tempGiftCard = []
		if (cart.giftCards.length > 0) {
			tempGiftCard = cart.giftCards
			await setPaymentOption({ giftCards: [] })
		}
		const payload = {
			payments: selectedPaymentData?.payload && !cart.payOnlyInGiftCard ? [selectedPaymentData.payload] : [],
			giftCards: tempGiftCard
		}
		await setPaymentOption(payload)
	}

	if (!cart) {
		return
	}

	return (
		<Window bottomInset topInset>

			<HeaderTemplate
				headerType={HEADER_TYPE.RETURN_AND_TEXT}
				viewBackButton={true}
				contentText={t('paymentData.title')}
			/>

			<Loading
				fullScreen
				isLoading={isLoading}
			/>

			<View
				padding='large'
				flex={1}
				direction='column'>
				<View
					justifyContent='between'
					direction='row'
					alignItems='center'>
					<Text
						fontSize='extra-small'
						fontWeight='bold'>
							{t('paymentData.txtTotalPayment')}
					</Text>
					<Text
						fontSize='small'
						fontWeight='bold'
						color='primary-700'>
						{cart.formattedValue}
					</Text>
				</View>

				<View marginVertical='extra-small'>
					<GiftCardInput onPressAddGiftCard={handlePaymentOptionsChange} />
				</View>

				<View
					display='flex'
					gap={16}
					direction='column'
					marginTop='large'>
					<PaymentMethods paymentSystems={cart?.paymentSystems} />

					<View
						marginHorizontal='nano'
						marginVertical='small'>
						<CustomButton
							disabled={!selectedPaymentData?.isReadyToPay}
							label={t('paymentData.labelButton')}
							onPress={submitPaymentSystemSelected}
						/>
					</View>
				</View>
			</View>
		</Window>
	)
}
