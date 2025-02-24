import {View, Carousel, Image} from "eitri-luminus";
export default function ImageCarousel(props) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const { currentSku } = props
  const beforeChange = (currentSlide, nextSlide) => {
    setCurrentSlide(nextSlide)
  }
  const containerHeight = window.screen.width * 0.8;
  const imageHeight = containerHeight * 0.8;

  return (
    <View>
      <Carousel onSwipe={beforeChange}>
        {currentSku?.images?.slice(0, 8).map((item, index) => {
          return (
            <Carousel.Item key={index}>
              <View className={`flex justify-center items-center h-[${containerHeight}px]`}>
                <Image src={item.imageUrl} className={`max-w-[80%] h-[${imageHeight}px]`} />
              </View>
            </Carousel.Item>
          )
        })}
      </Carousel>
      {currentSku?.images?.length > 1 && (
        <View className="flex justify-center">
          {currentSku?.images?.slice(0, 8).map((item, index) => {
            return (
              <View
                key={index}
                className={`w-[35px] h-[8px] ${currentSlide === index ? "bg-primary-700" : "bg-neutral-300"}`}
              />
            )
          })}
        </View>
      )}
    </View>
  )
}
