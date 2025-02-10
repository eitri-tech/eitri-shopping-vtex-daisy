export default function CollapsableView(props) {
  const { children, title, willStartCollapsed } = props
  const [collapsed, setCollapsed] = useState(willStartCollapsed)
  useEffect(() => {
    setCollapsed(!!willStartCollapsed)
  }, [])
  const toggleCollapsedState = () => {
    setCollapsed(!collapsed)
  }
  return (
    <View borderTopWidth={'hairline'} className="border-neutral-content p-2">
      <View onClick={toggleCollapsedState} className="flex flex flex-row justify-between items-center">
        <Text className="text-lg">{title}</Text>
        {/* {collapsed && (<svg viewBox="0 -5 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>chevron-down</title> <desc>Created with Sketch Beta.</desc> <defs> </defs> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"> <g id="Icon-Set" sketch:type="MSLayerGroup" transform="translate(-572.000000, -1200.000000)" fill="#000000"> <path d="M595.688,1200.28 C595.295,1199.89 594.659,1199.89 594.268,1200.28 L583.984,1211.57 L573.702,1200.28 C573.31,1199.89 572.674,1199.89 572.282,1200.28 C571.89,1200.68 571.89,1201.32 572.282,1201.71 L583.225,1213.72 C583.434,1213.93 583.711,1214.02 583.984,1214 C584.258,1214.02 584.535,1213.93 584.745,1213.72 L595.688,1201.71 C596.079,1201.32 596.079,1200.68 595.688,1200.28" id="chevron-down" sketch:type="MSShapeGroup"> </path> </g> </g> </g></svg>)}
        {!collapsed && (<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M6 15L12 9L18 15" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>)} */}
      </View>
      {!collapsed && <View className="my-2">{children}</View>}
    </View>
  )
}
