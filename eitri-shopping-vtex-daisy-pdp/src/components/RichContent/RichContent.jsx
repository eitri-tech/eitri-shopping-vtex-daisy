import { getProductById } from '../../services/productService'
import {View} from "eitri-luminus";
export default function RichContent(props) {
  const { product } = props
  const [richContent, setRichContent] = useState(null)
  useEffect(() => {
    if (product) {
      if (product['Conteudo Enriquecido']) {
        setRichContent(product['Conteudo Enriquecido'])
      } else {
        getProductById(product.productId).then((product) => {
          if (product['Conteudo Enriquecido']) {
            setRichContent(product['Conteudo Enriquecido'])
          }
        })
      }
    }
  }, [product])
  if (!richContent) return null
  return (
    <View className="w-full h-full">
      <Webview htmlString={richContent} />
    </View>
  )
}
