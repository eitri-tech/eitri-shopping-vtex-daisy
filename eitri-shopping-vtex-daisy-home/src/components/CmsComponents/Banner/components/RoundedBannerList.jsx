import { Text, View} from "eitri-luminus";
import SwiperContent from '../../../SwiperContent/SwiperContent'
export default function RoundedBannerList(props) {
  const { data, onPress } = props
  const imagesList = data.images
  return (
    <View>
      {data?.mainTitle && (
        <View className="px-8">
          <Text className="font-bold">{data.mainTitle}</Text>
        </View>
      )}
      <SwiperContent className="px-8">
        {imagesList &&
          imagesList.map((slider) => (
            <View key={slider.imageUrl} className="flex flex-col mr-2 items-center">
              <View
                key={slider.imageUrl}
                onClick={() => onPress(slider)}
                className="flex items-center justify-center h-full"
              >
                <Image
                  src={slider.imageUrl}
                  maxHeight={`${data?.size?.maxHeight}px` || ''}
                  maxWidth={`${data?.size?.maxWidth}px` || ''}
                  className="bg-neutral grow-1"
                />
              </View>
              {slider?.subLabel && (
                <Text className="font-bold text-center whitespace-nowrap">
                  {slider?.subLabel}
                </Text>
              )}
            </View>
          ))}
      </SwiperContent>
    </View>
  )
}
