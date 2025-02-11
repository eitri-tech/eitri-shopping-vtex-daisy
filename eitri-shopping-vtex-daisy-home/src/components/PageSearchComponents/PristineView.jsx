import { useTranslation } from 'eitri-i18n'
export default function PristineView() {
  const { t } = useTranslation()
  return (
    <View className="flex justify-center items-center">
      <Text className="text-lg text-neutral-content font-bold">{t('pristineView.content')}</Text>
    </View>
  )
}
