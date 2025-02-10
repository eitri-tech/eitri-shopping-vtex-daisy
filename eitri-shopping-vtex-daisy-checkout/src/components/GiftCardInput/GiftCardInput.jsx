import { useLocalShoppingCart } from '../../providers/LocalCart'
import { CustomInput, Loading, CustomButton } from 'eitri-shopping-vtex-daisy-shared'

export default function GiftCardInput(props) {
	const { cart, setPaymentOption } = useLocalShoppingCart()
	const [isLoading, setIsLoading] = useState(false)
	const [redemptionCode, setRedemptionCode] = useState('')

	const addGiftCard = async () => {
		try {
			setIsLoading(true)
			const payload = {
				payments: cart.paymentData.payments,
				giftCards: [
					...cart.paymentData.giftCards,
					{
						redemptionCode: redemptionCode,
						inUse: true,
						isSpecialCard: false
					}
				]
			}
			await setPaymentOption(payload)
			setRedemptionCode('')
			setIsLoading(false)
		} catch (e) {
			console.error('Error adding gift card:', e)
			setIsLoading(false)
		}
	}

	const removeGiftCart = async giftId => {
		try {
			const newGiftCardList = cart?.giftCards?.filter(gift => gift.id !== giftId)
			// console.log('New gift card list:', newGiftCardList)
			setIsLoading(true)
			const payload = {
				payments: cart.paymentData.payments,
				giftCards: newGiftCardList
			}
			await setPaymentOption(payload)
			setRedemptionCode('')
			setIsLoading(false)
		} catch (e) {
			console.error('Error removing gift card:', e)
			setIsLoading(false)
		}
	}

	return (
		<View>
			<Text
				fontSize='small'
				fontWeight='bold'>
				Adicionar vale presente
			</Text>
			<View
				marginTop='nano'
				alignItems='center'
				direction='row'
				gap='10px'>
				<CustomInput
					placeholder='Insira o código do vale presente'
					value={redemptionCode}
					onChange={setRedemptionCode}
				/>
				<CustomButton
					width='fit-content'
					label='Adicionar'
					paddingHorizontal='small'
					onPress={addGiftCard}
				/>
			</View>
			<View>
				{isLoading && <Loading inline />}
				{!isLoading &&
					cart?.giftCards?.length > 0 &&
					cart?.giftCards?.map(gift => (
						<View
							paddingVertical='small'
							paddingHorizontal='extra-small'
							borderWidth='hairline'
							borderColor='neutral-400'
							borderRadius='small'
							gap={20}
							key={gift.id}
							direction='row'
							justifyContent='between'
							marginTop='extra-small'>
							<View
								gap={5}
								direction='row'>
								<Text>{`${gift.redemptionCode} - ${gift.formattedValue}`} </Text>
							</View>
							<Touchable onPress={() => removeGiftCart(gift.id)}>
								<View>
									<Text
										color='primary-500'
										textDecoration='underline'>
										Remover
									</Text>
								</View>
							</Touchable>
						</View>
					))}
			</View>
		</View>
	)
}
