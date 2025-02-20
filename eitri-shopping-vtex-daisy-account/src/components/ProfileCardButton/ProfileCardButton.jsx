export default function ProfileCardButton(props) {
  const { icon, label, onPress } = props
  return (
    <View width="100%" onClick={onPress} className="p-8 flex justify-between">
      <View className="flex items-center">
        <View>{/* <Icon iconKey={icon} width={24} height={24} color="neutral-900" /> */}</View>
        <Text className="text-neutral-content text-sm ml-1">{label}</Text>
      </View>
      <View>{/* <Icon iconKey={'chevron-right'} width={24} height={24} color="neutral-900" /> */}</View>
    </View>
  )
}
