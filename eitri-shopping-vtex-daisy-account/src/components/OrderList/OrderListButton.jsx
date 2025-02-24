export default function OrderListButton(props) {
  const { onPress, label, backgroundColor, color, borderColor } = props
  return (
    <View
      borderColor={borderColor}
      backgroundColor={backgroundColor}
      onClick={onPress}
      className="border flex flex flex-row justify-center items-center p-1"
    >
      <Text className="block w-full text-base-100">{label}</Text>
    </View>
  )
}
