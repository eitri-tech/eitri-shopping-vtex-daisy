export default function ProfileCardButton(props) {
  const { icon, label, onClick } = props
  return (
    <View width="100%" onClick={onClick} className="p-4 flex justify-between w-full shadow-md rounded-md bg-neutral-50">
      <View className="flex items-center">
        <View>{/* <Icon iconKey={icon} width={24} height={24} color="neutral-900" /> */}</View>
        <Text className="text-neutral-content text-sm ml-1">{label}</Text>
      </View>
      <View>{/* <Icon iconKey={'chevron-right'} width={24} height={24} color="neutral-900" /> */}</View>
    </View>
  )
}
