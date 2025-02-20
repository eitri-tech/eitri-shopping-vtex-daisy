import imgBox from '../../assets/images/box-01.svg'
export default function NoItem(props) {
  const { title, subtitle } = props
  return (
    <View className="flex flex flex-col justify-center items-center p-8">
      <View>{/* <Icon iconKey="package" color="primary-700" width={48} height={48} /> */}</View>
      <Text className="block w-full text-center font-bold text-sm">{title}</Text>
      <Text className="block w-full text-center text-sm">{subtitle}</Text>
    </View>
  )
}
