import { resolveNavigation } from '../../../services/NavigationService'
import { Text, View} from "eitri-luminus";
export default function CategoryTiles(props) {
  const { data } = props
  const onPress = (content) => {
    if (!content?.facets) return
    resolveNavigation(content?.facets)
  }
  return (
    <View>
      {data?.title && (
        <View minWidth="fit-content" className="px-8">
          <Text className="font-bold">{data?.title}</Text>
        </View>
      )}
      <View className="flex overflow-x-scroll">
        <View width="8px" height="10px">
          &nbsp;
        </View>
        {data?.content?.map((content) => (
          <View key={content.imageUrl} onClick={() => onPress(content)} className="flex flex-col">
            <Image src={content.imageUrl} maxWidth={content.width} maxHeight={content.height} />
            <Text fontFamily="Baloo 2" className="mt-1 text-lg">
              {content.title}
            </Text>
          </View>
        ))}
        <View width="8px" height="10px">
          &nbsp;
        </View>
      </View>
    </View>
  )
}
