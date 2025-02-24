import arrowLeft from '../../assets/icons/arrow-left.svg'
import Eitri from 'eitri-bifrost'
export default function BigTitle(props) {
  const { title, withBackAction } = props
  const goBack = () => {
    Eitri.navigation.back()
  }
  return (
    <View className="flex w-full justify-between"> 
      {withBackAction && (
        <View className="w-[40px] h-[40px] min-w-[40px] min-h-[40px] rounded-full bg-neutral flex items-center justify-center border border-neutral">
          <View onClick={goBack}>
            <Image src={arrowLeft} className="w-[16px] h-[16px]" />
          </View>
        </View>
      )}
      <Text fontFamily="Baloo 2" className="block font-bold text-3xl">
        {title}
      </Text>
    </View>
  )
}
