import Loading from '../Loading/Loading'
export default function CustomButton(props) {
  const { disabled, color, backgroundColor, label, onPress, isLoanding, borderRadius } = props
  const _onPress = () => {
    if (!disabled && onPress && typeof onPress === 'function') {
      onPress()
    }
  }
  return (
    <View onClick={_onPress}>
      <View
        height="50px"
        width="90vw"
        backgroundColor={isLoanding || disabled ? 'neutral-100' : backgroundColor || 'primary-700'}
        borderRadius={borderRadius || 'circular'}
        className="flex justify-center items-center"
      >
        {isLoanding ? (
          <Loading />
        ) : (
          <Text color={color || 'accent-100'} className="font-bold">
            {label}
          </Text>
        )}
      </View>
    </View>
  )
}
