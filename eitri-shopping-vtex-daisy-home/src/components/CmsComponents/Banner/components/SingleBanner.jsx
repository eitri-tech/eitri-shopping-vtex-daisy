import { Text, View} from "eitri-luminus";
export default function SingleBanner(props) {
  const { data, onPress } = props
  const imagesList = data.images
  return (
    <View className="relative">
      {data.mainTitle && (
        <View className="px-8 flex items-center justify-center w-full">
          <Text className="font-bold mb-8">{data.mainTitle}</Text>
        </View>
      )}
      {imagesList && imagesList[0] && (
        <View
          key={imagesList[0].imageUrl}
          onClick={() => onPress(imagesList[0])}
          className="flex flex-row px-8 w-full"
        >
          <View backgroundImage={imagesList[0].imageUrl} className="bg-neutral grow-1 w-full" />
        </View>
      )}
    </View>
  )
}
