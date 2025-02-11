import { Text, View} from "eitri-luminus";
export default function FitOnScreen(props) {
  const { data, onPress } = props
  const imagesList = data?.images
  return (
    <View>
      {data?.mainTitle && (
        <View className="px-8">
          <Text className="font-bold">{data.mainTitle}</Text>
        </View>
      )}
      <View className="flex flex-wrap px-8 justify-between">
        {imagesList?.map((image) => (
          <View
            key={image.imageUrl}
            onClick={() => onPress(image)}
            width="calc(50% - 8px)" // Adjust for two items per row with spacing
          >
            <Image src={image.imageUrl} width="100%" maxHeight="auto" />
          </View>
        ))}
      </View>
    </View>
  )
}
