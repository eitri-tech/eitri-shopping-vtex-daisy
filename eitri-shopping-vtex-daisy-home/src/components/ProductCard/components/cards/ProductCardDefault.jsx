import { Vtex } from 'eitri-shopping-vtex-shared'
import { Loading } from 'eitri-shopping-vtex-daisy-shared'
import icon360 from '../../../../assets/images/icon-360.png'
import WishlistIcon from '../../../WishlistIcon/WishlistIcon'
import { useTranslation } from 'eitri-i18n'
export default function ProductCardDefault(props) {
  const {
    listPrice,
    image,
    name,
    price,
    width,
    installments,
    isInCart,
    loadingCartOp,
    loadingWishlistOp,
    isOnWishlist,
    showListItem,
    badge,
    onPressOnCard,
    onPressCartButton,
    onPressOnWishlist,
  } = props
  const { t } = useTranslation()
  return (
    <View minWidth={width || 'auto'} maxWidth={width || 'auto'} className="relative bg-accent p-2">
      <View className="flex flex-col">
        {badge ? (
          <View maxHeight="27px" minHeight="27px" width="fit-content" className="bg-success px-8">
            <Text fontFamily="Baloo 2" className="font-bold">
              {badge}
            </Text>
          </View>
        ) : (
          <View height="27px" />
        )}
        <View
          width="100%"
          height="143px"
          minHeight="143px"
          maxHeight="143px"
          className="relative flex flex flex-col justify-center items-center"
        >
          <Image src={image} maxWidth="100%" maxHeight="100%" />
        </View>
        <View maxHeight="36px" minHeight="36px" className="mt-2 flex justify-between">
          <Text className="line-clamp-3">{name}</Text>
          <View disabled={loadingWishlistOp} onClick={onPressOnWishlist} className="z-98">
            <WishlistIcon checked={isOnWishlist} />
          </View>
        </View>
        <View className="flex flex-col mt-1">
          {listPrice ? (
            <Text className="line-through font-bold text-neutral-content">{listPrice}</Text>
          ) : (
            <View height="16px" />
          )}
          <Text className="font-bold text-primary-content text-sm">{price}</Text>
          {installments ? (
            <Text className="font-bold text-neutral-content">{installments}</Text>
          ) : (
            <View height="16px" />
          )}
        </View>
        <View
          height="36px"
          width="100%"
          backgroundColor={loadingCartOp ? 'neutral-100' : 'primary-700'}
          onClick={onPressCartButton}
          className="mt-1 flex justify-center items-center border-primary-content border z-99"
        >
          {loadingCartOp ? (
            <Loading width="36px" />
          ) : (
            <Text className="text-base-100">
              {isInCart ? t('productCardVertical.cart') : t('productCardVertical.buy')}
            </Text>
          )}
        </View>
      </View>
      <View onClick={onPressOnCard} className="absolute" />
    </View>
  )
}
