import Eitri from 'eitri-bifrost'
import { isLoggedIn } from '../../services/CustomerService'
export default function ProtectedView(props) {
  const { afterLoginRedirectTo, redirectState, labelLoading } = props
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    async function checkIfUserIsLogged() {
      setIsLoading(true)
      const logged = await isLoggedIn()
      if (!logged) {
        Eitri.navigation.navigate({
          path: 'Login',
          replace: true,
          state: {
            redirectTo: afterLoginRedirectTo,
            redirectState: redirectState,
          },
        })
      }
      return setIsLoading(false)
    }
    checkIfUserIsLogged()
  }, [])
  if (isLoading) {
    return (
      <View minHeight="100vh" className="flex justify-center items-center">
        <Text className="block w-full">{labelLoading || 'Carregando...'}</Text>
      </View>
    )
  }
  return <>{props.children}</>
}
