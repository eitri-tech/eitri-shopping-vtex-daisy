export default function CCheckbox(props) {
  const { checked, onChange, label, renderMode, align, justify } = props
  return (
    <View alignItems={align || 'top'} justifyItems={justify || 'left'} className="flex flex flex-row">
      <Checkbox renderMode={renderMode || 'default'} checked={checked} onChange={() => onChange(!checked)} />
      {label && (
        <View onClick={() => onChange(!checked)} className="ml-1">
          <Text paddinLeft="small" className="block w-full">
            {label}
          </Text>
        </View>
      )}
    </View>
  )
}
