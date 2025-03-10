import wishilist from '../../assets/icons/wishlist.svg'
import Rating from '../Rating/Rating'
export default function ProductCardVertical(props) {
  const {
    ratingValue,
    ratingsCount,
    listPrice,
    image,
    name,
    price,
    width,
    installments,
    onWishListPress,
    onPress,
    badge,
  } = props
  const onPressCard = () => {
    if (onPress && typeof onPress === 'function') {
      onPress()
    }
  }
  return (
    <View minWidth={width || 'auto'} maxWidth={width || 'auto'} className="relative p-2 border-neutral-300 border rounded-md">
      <View className="flex flex-col">
        {badge ? (
          <View width="fit-content" className="bg-success px-4 py-1 rounded-full">
            <Text fontFamily="Baloo 2" className="block w-full font-bold">
              {badge}
            </Text>
          </View>
        ) : (
          <View height="32px" />
        )}
        <View width="100%" className="flex justify-center items-center">
          <Image src={image} maxWidth="100%" maxHeight="100%" />
        </View>
        <View height="70px" maxHeight="70px" minHeight="36px" className="mt-2 flex justify-between">
          <Text className="block w-full line-clamp-3">{name}</Text>
          <View onClick={onWishListPress} className="z-99">
            <Image src={wishilist} width="24px" height="24px" />
          </View>
        </View>
        <View>
          {ratingValue ? <Rating ratingValue={ratingValue} ratingsCount={ratingsCount} /> : <View height="16px" />}
        </View>
        <View className="flex flex-col mt-1 h-[66px]">
          {listPrice && (
            <Text className="block w-full line-through font-bold text-sm text-neutral-400">{listPrice}</Text>
          )}
          <Text className="block w-full font-bold text-primary-content text-md">{price}</Text>
          {installments && (
            <Text className="block w-full font-bold text-sm text-neutral-400">{installments}</Text>
          )}
        </View>
      </View>
      <View onClick={onPressCard} className="absolute" />
    </View>
  )
}
