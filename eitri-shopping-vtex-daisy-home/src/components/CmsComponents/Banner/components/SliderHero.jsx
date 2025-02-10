export default function SliderHero(props) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const { data, onPress } = props
  const imagesList = data.images
  const onChangeSlide = (index) => {
    setCurrentSlide(index)
  }
  return (
    <View className="relative">
      {data.mainTitle && (
        <View width="100%" className="px-8 flex items-center justify-center">
          <Text className="font-bold mb-8">{data.mainTitle}</Text>
        </View>
      )}
      <Carousel
        autoplay
        autoplaySpeed={4000}
        afterChange={onChangeSlide}
        initialSlide={currentSlide}
        adaptiveHeight
        infinite
      >
        {imagesList &&
          imagesList.map((slider) => (
            <View key={slider.imageUrl} onClick={() => onPress(slider)} width="100vw" className="flex flex-row px-8">
              <Image
                src={slider.imageUrl}
                width="100%"
                aspectRatio={data.aspectRatio ?? '4:3'}
                maxHeight="387px"
                className="bg-neutral grow-1"
              />
            </View>
          ))}
      </Carousel>
      {imagesList.length > 1 && (
        <View width="100%" className="absolute flex justify-center">
          {imagesList &&
            Array.from(
              {
                length: imagesList.length,
              },
              (_, index) => (
                <View
                  key={index}
                  opacity={currentSlide === index ? 'solid' : 'light'}
                  width="32px"
                  height="8px"
                  className="bg-accent"
                />
              ),
            )}
        </View>
      )}
    </View>
  )
}
