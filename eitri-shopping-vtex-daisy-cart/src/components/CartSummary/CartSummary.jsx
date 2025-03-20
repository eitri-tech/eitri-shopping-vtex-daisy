import { View, Text, Button, Icon } from 'eitri-luminus'
import { CustomButton, Spacing, Divisor } from 'eitri-shopping-vtex-daisy-shared'
import { useTranslation } from 'eitri-i18n'
import { formatAmountInCents } from '../../utils/utils'
import { useLocalShoppingCart } from "../../providers/LocalCart";
import { navigateToCheckout } from "../../services/navigationService";

export default function CartSummary(props) {
	const { cart } = useLocalShoppingCart()

	const [collapsed, setCollapsed] = useState(true)

	const [itemsValue, setItemsValue] = useState({ value: null })
	const [shipping, setShipping] = useState({ value: null })
	const [discounts, setDiscounts] = useState({ value: null })

	const { t } = useTranslation()

	useEffect(() => {
		if (!cart) return
		setItemsValue(getTotalizerById(cart.totalizers, 'Items'))
		setShipping(getTotalizerById(cart.totalizers, 'Shipping'))
		setDiscounts(getTotalizerById(cart.totalizers, 'Discounts'))
	}, [cart])

	const getTotalizerById = (totalizers, id) => totalizers.find(item => item.id === id)

	const goToCheckout = async () => {
		if (isValidToProceed(cart)) {
			navigateToCheckout(cart?.orderFormId)
		}
	}

	const isValidToProceed = cart => {
		if (!cart) return false
		if (!cart?.items) return false
		if (cart?.shipping?.shippingUnavailable) return false
		return cart?.items.length !== 0
	}

	return (
		<>
			<View
				className="bg-base-100 fixed bottom-0 shadow-lg">
				<Divisor />

				<Spacing height={'10px'} />

				<Button
					onClick={() => setCollapsed(!collapsed)}
					className="flex justify-center">
					<Icon
						iconKey={collapsed ? 'chevron-up' : 'chevron-down'}
						width={24}
						height={24}
					/>
				</Button>

				{!collapsed && (
					<>
						<View
							className="card-body">
							{itemsValue?.value && (
								<View
									className="flex justify-between py-2">
									<Text
										className="text-base-content/70 text-sm">
										{t('cartSummary.txtSubtotal')}
									</Text>
									<Text className="text-sm">{formatAmountInCents(itemsValue.value)}</Text>
								</View>
							)}
							{discounts?.value && (
								<View
									className="flex justify-between py-2">
									<Text
										className="text-base-content/70 text-sm">
										{t('cartSummary.txtDiscount')}
									</Text>
									<Text className="text-sm">{formatAmountInCents(discounts.value)}</Text>
								</View>
							)}
							{shipping && (
								<View
									className="flex justify-between py-2">
									<Text
										className="text-base-content/70 text-sm">
										{t('cartSummary.txtDelivery')}
									</Text>
									<Text className="text-sm">{formatAmountInCents(shipping.value)}</Text>
								</View>
							)}
							{cart?.value && (
								<View
									className="flex justify-between py-2">
									<Text
										className="text-base-content font-bold text-base">
										{t('cartSummary.txtTotal')}
									</Text>
									<Text
										className="text-base font-bold text-primary">
										{formatAmountInCents(cart.value)}
									</Text>
								</View>
							)}
						</View>
					</>
				)}

				<Spacing height={'10px'} />

				<View
					className="flex w-screen justify-center px-6 items-center">
					<CustomButton
						marginTop='large'
						borderRadius='small'
						label={t('cartSummary.labelFinish')}
						onPress={goToCheckout}
					/>
				</View>
				<Spacing height={'16px'} />
				<View bottomInset />
			</View>

			<Spacing height={collapsed ? '111px' : '224px'} />
		</>
	)
}
