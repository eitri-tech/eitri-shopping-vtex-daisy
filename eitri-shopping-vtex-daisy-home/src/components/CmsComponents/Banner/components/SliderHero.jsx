import { Text, View, Carousel, Image} from "eitri-luminus";
export default function SliderHero(props) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const { data, onPress } = props
  const imagesList = data.images

  const onSwipe = (i) => {
    setCurrentSlide(i);
  };
  
  return (
    <View className="relative">
      {data.mainTitle && (
        <View className="px-8 flex items-center justify-center w-full">
          <Text className="font-bold mb-8">{data.mainTitle}</Text>
        </View>
      )}
      <Carousel
        onSwipe={onSwipe}   
      >
        {imagesList &&
          imagesList.map((image) => (
            <Carousel.Item className="w-full" key={`image_${image.imageUrl}`}>
            <View
              onClick={() => {
                onPress(image);
              }}
            >
              <Image className="w-full" src={image.imageUrl} alt="Burger" />
            </View>
          </Carousel.Item>
          ))}
      </Carousel>
      {imagesList.length > 1 && (
        <View className="mt-8 flex justify-center gap-2"> 
          {imagesList &&
            Array.from(
              {
                length: imagesList.length,
              },
              (_, index) => (
                <View
                  key={index}
                  className={`w-8 h-[6px] ${currentSlide === index ? "bg-green-700" : "bg-neutral-300"}`}
                />
              ),
            )}
        </View>
      )}
    </View>
  )
}
