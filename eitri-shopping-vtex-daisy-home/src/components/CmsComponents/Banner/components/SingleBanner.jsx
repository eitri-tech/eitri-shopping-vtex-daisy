export default function SingleBanner(props) {
  const { data, onPress } = props
  const imagesList = data.images
  console.log('SingleBanner', data)
  return (
    <View className="relative">
      {data.mainTitle && (
        <View width="100%" className="px-8 flex items-center justify-center">
          <Text className="font-bold mb-8">{data.mainTitle}</Text>
        </View>
      )}
      {imagesList && imagesList[0] && (
        <View
          key={imagesList[0].imageUrl}
          onClick={() => onPress(imagesList[0])}
          width="100vw"
          className="flex flex-row px-8"
        >
          <View backgroundImage={imagesList[0].imageUrl} width="100%" className="bg-neutral grow-1" />
        </View>
      )}
    </View>
  )
}
