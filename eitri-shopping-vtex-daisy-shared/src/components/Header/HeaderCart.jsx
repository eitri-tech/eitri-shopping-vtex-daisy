export default function HeaderCart(props) {
  const { quantityOfItems, backgroundColor, textColor, iconColor, onPress, width } = props
  return (
    <View onClick={onPress} width={width} backgroundColor={backgroundColor} className="relative">
      <View>
        <Icon width={24} height={24} color={iconColor} iconKey="shopping-cart" />
      </View>
      {quantityOfItems > 0 && (
        <View
          top={-10}
          right={-10}
          backgroundColor={iconColor || 'primary-700'}
          width={20}
          height={20}
          className="absolute flex justify-center items-center"
        >
          <Text color={textColor || 'accent-100'} className="font-bold">
            {quantityOfItems}
          </Text>
        </View>
      )}
    </View>
  )
}
