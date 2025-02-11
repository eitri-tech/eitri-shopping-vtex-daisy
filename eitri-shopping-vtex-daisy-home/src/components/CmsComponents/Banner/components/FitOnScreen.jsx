export default function FitOnScreen(props) {
  const { data, onPress } = props
  return (
    <View>
      {data?.mainTitle && (
        <View className="px-8">
          <Text className="font-bold">{data.mainTitle}</Text>
        </View>
      )}
      <View className="flex justify-between px-8 overflow-scroll">
        {data?.images?.map((image) => (
          <View key={image.imageUrl} onClick={() => onPress(image)}>
            <View backgroundImage={image.imageUrl} />
          </View>
        ))}
      </View>
    </View>
  )
}
