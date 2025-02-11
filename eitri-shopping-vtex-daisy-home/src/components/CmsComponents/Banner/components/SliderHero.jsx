import { Text, View, Carousel, Image} from "eitri-luminus";
export default function SliderHero(props) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [index, setIndex] = useState();
  const { data, onPress } = props
  const imagesList = data.images

  const onSwipe = (i) => {
    console.log('@SliderHero.onSwipe Index showed', i);
    try {
      setIndex(imagesList[i]?.name);
    } catch (error) {
      console.log('error', error);
    }
  };
  
  return (
    <View className="relative">
      {data.mainTitle && (
        <View className="px-8 flex items-center justify-center w-full">
          <Text className="font-bold mb-8">{data.mainTitle}</Text>
        </View>
      )}
      <Carousel
        onSwipe={onSwipe} index={index}   
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
        <View className="absolute flex justify-center w-full">
          {imagesList &&
            Array.from(
              {
                length: imagesList.length,
              },
              (_, index) => (
                <View
                  key={index}
                  className="w-8 h-2 bg-accent"
                />
              ),
            )}
        </View>
      )}
    </View>
  )
}
