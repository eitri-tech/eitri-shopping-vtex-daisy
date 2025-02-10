import Eitri from 'eitri-bifrost'
export default function HeaderFilter(props) {
  const { handleFilterModal, facetsModalReady, searchResults, hasFilters, iconColor } = props
  return (
    <View
      onClick={handleFilterModal}
      opacity={facetsModalReady || searchResults.length > 0 ? 'solid' : 'light'}
      className="relative"
    >
      <View>
        <Icon color={iconColor} iconKey="filter" width={24} height={24} />
      </View>
      {hasFilters && <View width="12px" height="12px" right={-4} top={-2} className="absolute bg-primary-content" />}
    </View>
  )
}
