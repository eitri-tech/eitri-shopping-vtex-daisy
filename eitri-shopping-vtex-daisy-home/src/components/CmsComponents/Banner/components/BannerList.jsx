import SwiperContent from '../../../SwiperContent/SwiperContent'
import { Text, View, Image} from "eitri-luminus";
export default function BannerList(props) {
  const { data, onPress } = props
  const imagesList = data.images

  const isANumber = (value) => 
    typeof value === "number" || /^\d+$/.test(value) ? true : false;

  let width = data?.size?.maxWidth;
  let height = data?.size?.maxHeight;

  const widthClass = width && !isNaN(width) ? `w-[${width}px]` : null;
  const heightClass = height && !isNaN(height) ? `h-[${height}px]` : null;

  console.log("BannerList", data?.size ,heightClass, widthClass)
  return (
    <View className="flex flex-col gap-2">
      {data?.mainTitle && (
        <View className="px-4">
          <Text className="font-bold text-xl">{data.mainTitle}</Text>
        </View>
      )} 
      <SwiperContent className="px-4">
        {imagesList &&
          imagesList.map((slider) => (
              <Image
                src={slider.imageUrl}
                className={`bg-neutral rounded-lg flex-grow ${data?.size?.maxHeight ? `h-max-[${data.size.maxHeight}]` : ''} ${data?.size?.maxWidth ? `w-max-[${data.size.maxWidth}]` : ''}
                w-[100px] h-[100px]
                `}
              /> 
          ))}
      </SwiperContent>
    </View>
  )
}
