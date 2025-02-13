import { Text, View} from "eitri-luminus";
export default function SwiperContent(props) {
  const { title, children, marginBottom, paddingHorizontal, gap } = props
  return (
    <View className={`${marginBottom ? `mb-[${marginBottom}]` : ''} px-8`}>
    {title && (
      <View className={`px-${paddingHorizontal || '8'}`}>
        <Text className="font-bold">{title}</Text>
      </View>
    )}
    <View className="flex flex-row overflow-x-scroll snap-x snap-mandatory">
      {paddingHorizontal && (
        <View className={`ml-${paddingHorizontal} h-px`}>&nbsp;</View>
      )}
      <View className={`gap-${gap || '2'} min-h-[72px] flex flex-row`}>
        {children}
      </View>
      {paddingHorizontal && (
        <View className={`mr-${paddingHorizontal} h-px`}>&nbsp;</View>
      )}
    </View>
  </View>
  
  )
}
