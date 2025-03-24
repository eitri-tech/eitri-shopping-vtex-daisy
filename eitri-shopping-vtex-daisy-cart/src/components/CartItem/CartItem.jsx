import { View, Text, Button, Image } from 'eitri-luminus'
import trash from '../../assets/images/trash-01.svg'
import Quantity from '../Quantity/Quantity'
import SaveButton from '../SaveButton/SaveButton'
import { View, Loading } from 'eitri-shopping-vtex-daisy-shared'
import { addToWishlist, checkWishlistItem, removeItemFromWishlist } from '../../services/customerService'
import ModalConfirm from '../ModalConfirm/ModalConfirm'
import { useTranslation } from 'eitri-i18n'
import { formatAmountInCents } from '../../utils/utils'

export default function CartItem(props) {
	const {
		item,
		onChangeQuantityItem,
		message,
		handleRemoveCartItem,
		onAddOfferingToCart,
		onRemoveOfferingFromCart,
		locale,
		currency
	} = props
	const [loadingWishlist, setLoadingWishlist] = useState(false)
	const [wishlistId, setWishlistId] = useState('')
	const [showModalRemoveItem, setShowModalRemoveItem] = useState(false)

	const resizedImageUrl = item.imageUrl.replace('60-60', '200-200')

	const { t } = useTranslation()

	useEffect(() => {
		checkWishlist()
	}, [])

	const checkWishlist = async () => {
		setLoadingWishlist(true)
		const { inList, listId } = await checkWishlistItem(item.productId)
		if (inList) {
			setWishlistId(listId)
		}
		setLoadingWishlist(false)
	}

	const handleSaveFavorite = async () => {
		try {
			setLoadingWishlist(true)
			if (wishlistId) {
				await removeItemFromWishlist(wishlistId)
				setWishlistId('')
			} else {
				const result = await addToWishlist(item.productId, item.name, item.id)
				setWishlistId(result?.data?.addToList)
			}
			setLoadingWishlist(false)
		} catch (e) {
			setLoadingWishlist(false)
		}
	}

	const handleQuantityOfItemsCart = quantityToUpdate => {
		onChangeQuantityItem(item.quantity + quantityToUpdate, item.itemIndex)
	}

	const removeCartItem = confirm => {
		if (confirm) {
			handleModalRemoveItem()
			handleRemoveCartItem(item.itemIndex)
			return
		}
		handleModalRemoveItem()
	}

	const handleModalRemoveItem = () => {
		setShowModalRemoveItem(!showModalRemoveItem)
	}

	return (
		<View>
			<View
				className="mt-2 bg-neutral-100 flex flex-col p-4">
				<View
					className="flex justify-center items-start">
					<View
						className="flex items-center justify-center max-w-[30%]">
						<Image
							className="rounded-lg max-h-[100px] max-w-full"
							src={resizedImageUrl}
						/>
					</View>
					<View
						className="flex flex-col justify-between w-[55%] gap-2 pl-2">
						<Text
							className="text-neutral-900 font-medium text-sm">
							{item.name}
						</Text>
						<Text
							className="text-primary-700 font-bold text-base">
							{formatAmountInCents(item.price, locale, currency)}
						</Text>
						{item?.offerings?.length > 0 &&
							!message &&
							item?.offerings
								?.filter(o => !o.isBundled)
								.map((offering, index) => (
									<Button
										key={offering.id + index}
										onClick={() => onAddOfferingToCart(item.itemIndex, offering.id)}
										className="border border-primary-700 rounded-lg p-2 flex justify-center items-center">
										<Text
											className="text-sm text-primary-700 font-medium">
											{`${t('cartItem.txtAdd')} ${offering?.name} ${offering?.price ? formatAmountInCents(offering.price, locale, currency) : ''}`}
										</Text>
									</Button>
								))}
						<View
							className="flex justify-between h-[30%] items-center">
							{!message && (
								<Quantity
									quantity={item.quantity}
									handleItemQuantity={handleQuantityOfItemsCart}
								/>
							)}
							{loadingWishlist ? (
								<View>
									<Loading width='30px' />
								</View>
							) : (
								<SaveButton
									handleSaveFavorite={() => handleSaveFavorite(item.id)}
									isInWishlist={!!wishlistId}
								/>
							)}
						</View>
					</View>
					<View
						className="flex w-[15%] justify-center h-[130px]">
						<Button onClick={handleModalRemoveItem}>
							<Image
								className="h-5"
								src={trash}
							/>
						</Button>
					</View>
				</View>
				{message && (
					<View
						className="flex flex-col justify-center items-center">
						<View className={'h-[10px]'} />
						<Text
							className="text-center text-tertiary-500">
							{message.text || t('cartItem.txtMessageUnavailable')}
						</Text>
						<View className={'h-[10px]'} />
					</View>
				)}
			</View>
			{item?.offerings?.length > 0 &&
				item?.offerings
					?.filter(o => o.isBundled)
					.map((offering, index) => (
						<View
							key={offering.id + index}
							className="bg-neutral-100">
							<View
								className="bg-background-color w-full h-0.5"
							/>
							<View
								className="py-2 px-6 flex justify-between items-center">
								<Text
									className="text-sm font-medium">
									{`${offering?.name}: ${offering?.price ? formatAmountInCents(offering.price, locale, currency) : ''}`}
								</Text>
								<Button onClick={() => onRemoveOfferingFromCart(item.itemIndex, offering.id)}>
									<Image
										className="h-4"
										src={trash}
									/>
								</Button>
							</View>
						</View>
					))}
			<ModalConfirm
				text={t('cartItem.txtRemoveCart')}
				showModal={showModalRemoveItem}
				closeModal={handleModalRemoveItem}
				removeItem={removeCartItem}
			/>
		</View>
	)
}
