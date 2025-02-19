import { Text, View} from "eitri-luminus";
export default function SwiperContent(props) {
  const { title, children, marginBottom, paddingHorizontal, gap } = props
  return (
    <View className={`px-4`}>
    {title && (
      <View>
        <Text className="font-bold">{title}</Text>
      </View>
    )}
    <View className="flex flex-row overflow-x-scroll snap-x snap-mandatory">
      <View className={`gap-4 min-h-[72px] flex flex-row`}>
        {children}
      </View>
      {paddingHorizontal && (
        <View className={`mr-${paddingHorizontal} h-px`}>&nbsp;</View>
      )}
    </View>
  </View>
  
  )
}
