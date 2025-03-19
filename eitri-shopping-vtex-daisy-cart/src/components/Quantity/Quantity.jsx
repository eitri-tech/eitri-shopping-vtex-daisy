import {View, Text, Button} from "eitri-luminus";
export default function Quantity(props) {

    const { quantity, handleItemQuantity, disable } = props

    return (
        <View className="flex border border-neutral-300 rounded-sm w-1/2 h-[35px] justify-between items-center pl-1">
            <View className="w-1/3 flex items-center justify-center">
                {quantity === 1 || disable ?
                    <Icon iconKey="minus" width={16} height={16} color={'neutral-300'} />
                    :
                    <Touchable onPress={() => handleItemQuantity(-1)}>
                        <Icon iconKey="minus" width={16} color={'primary-700'} />
                    </Touchable>
                }
            </View>
            <View className="w-1/3 items-center justify-center pl-1">
                <Text className="font-bold">{quantity}</Text>
            </View>
            <View className="w-1/3 items-center justify-center pl-1">
                {disable ?
                <View className="w-[16px] h-[16px]">
                    <svg width="16px" height="16px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 12H18M12 6V18" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </View>
                    :
                    <Button onPress={() => handleItemQuantity(1)}>
                         <svg width="16px" height="16px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 12H18M12 6V18" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </Button>
                }
            </View>
        </View>
    )
}
