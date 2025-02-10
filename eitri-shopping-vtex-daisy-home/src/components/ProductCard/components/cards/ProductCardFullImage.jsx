import { Vtex } from 'eitri-shopping-vtex-shared'
import { Loading } from 'eitri-shopping-vtex-daisy-shared'
import icon360 from '../../../../assets/images/icon-360.png'
import WishlistIcon from '../../../WishlistIcon/WishlistIcon'
import { useTranslation } from 'eitri-i18n'
export default function ProductCardFullImage(props) {
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
    onPressOnCard,
    onPressCartButton,
    onPressOnWishlist,
  } = props
  const { t } = useTranslation()
  return (
    <View minWidth={width || 'auto'} maxWidth={width || 'auto'} className="relative bg-accent">
      <View className="flex flex-col">
        <View
          width="100%"
          height="240px"
          minHeight="240px"
          maxHeight="240px"
          className="relative flex flex flex-col justify-center items-center"
        >
          <View
            width="100%"
            height="100%"
            backgroundImage={image}
            backgroundSize="cover"
            backgroundPositionY="center"
            backgroundPositionX="center"
            borderRadiusRightTop="micro"
            borderRadiusLeftTop="micro"
          />
          <View width="30px" height="30px" className="absolute flex items-center justify-center bg-accent">
            <View disabled={loadingWishlistOp} onClick={onPressOnWishlist} className="z-98">
              <WishlistIcon checked={isOnWishlist} />
            </View>
          </View>
        </View>
        <View className="p-2">
          <View maxHeight="36px" minHeight="36px" className="mt-2 flex justify-between">
            <Text className="line-clamp-2">{name}</Text>
          </View>
          <View className="flex flex-col mt-1">
            {showListItem && (
              <>
                {listPrice ? (
                  <Text className="line-through font-bold text-neutral-content">{listPrice}</Text>
                ) : (
                  <View height="16px" />
                )}
              </>
            )}
            <Text className="font-bold text-primary-content text-sm">{price}</Text>
            {installments ? (
              <Text className="font-bold text-neutral-content">{installments}</Text>
            ) : (
              <View height="16px" />
            )}
          </View>
          <View>{}</View>
        </View>
        <View
          height="36px"
          width="100%"
          borderRadiusRightBottom="micro"
          borderRadiusLeftBottom="micro"
          backgroundColor={loadingCartOp ? 'neutral-100' : 'primary-700'}
          onClick={onPressCartButton}
          className="flex justify-center items-center border-primary-content border z-99"
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
