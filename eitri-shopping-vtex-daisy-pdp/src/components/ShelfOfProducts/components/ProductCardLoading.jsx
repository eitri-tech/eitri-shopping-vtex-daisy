import { Loading } from 'eitri-shopping-vtex-daisy-shared'
export default function ProductCardLoading(props) {
  const { width, gap } = props
  return (
    <View className="flex justify-center">
      <View width="50%" className="p-8 pr-1">
        <View minHeight="341px" className="p-2 border-neutral-content border">
          <View className="flex flex-col justify-center items-center p-2">
            <Loading inline width="80px" />
          </View>
        </View>
      </View>
      <View width="50%" className="p-8 pl-1">
        <View minHeight="341px" className="p-2 border-neutral-content border">
          <View className="flex flex-col justify-center items-center p-2">
            <Loading inline width="80px" />
          </View>
        </View>
      </View>
    </View>
  )
}
