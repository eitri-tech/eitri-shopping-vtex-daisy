import formatDate from '../utils/Date'
import { getCustomerData, setCustomerData } from '../services/CustomerService'
import { sendPageView } from '../services/TrackingService'
import Eitri from 'eitri-bifrost'
import { CustomButton, CustomInput, HEADER_TYPE, HeaderTemplate, Loading } from 'eitri-shopping-vtex-daisy-shared'
export default function EditProfile(props) {
  const [user, setUser] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  useEffect(() => {
    const customerData = props?.location?.state?.customerData
    if (!customerData) {
      loadMe()
    } else {
      setUser({
        ...user,
        ...customerData,
        birthDate: formatDate(customerData?.birthDate),
      })
    }
    sendPageView('Edição')
  }, [])
  const handleInputChange = (target, value) => {
    setUser({
      ...user,
      [target]: value,
    })
  }
  const handleSave = async () => {
    setIsLoading(true)
    const { isValid, isoDate } = convertToISO(user.birthDate)
    if (!isValid) {
      setIsLoading(false)
      return
    }
    const updatedUser = await setCustomerData({
      ...user,
      birthDate: isoDate,
    })
    setUser({
      ...updatedUser,
      birthDate: formatDate(updatedUser?.birthDate),
    })
    setIsLoading(false)
  }
  const loadMe = async () => {
    setIsLoading(true)
    const customerData = await getCustomerData()
    setUser({
      ...customerData,
      birthDate: formatDate(customerData?.birthDate),
    })
    setIsLoading(false)
  }
  function convertToISO(dateStr) {
    const dt = dateStr.replaceAll('/', '')
    const day = parseInt(dt.substring(0, 2), 10)
    const month = parseInt(dt.substring(2, 4), 10)
    const year = parseInt(dt.substring(4, 8), 10)
    const date = new Date(year, month - 1, day)
    // Valid date
    let isValid = date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day
    if (!isValid) {
      return {
        isValid,
      }
    }
    // More than 18 years
    const today = new Date()
    isValid =
      today.getFullYear() - year > 18 ||
      (today.getFullYear() - year === 18 && today.getMonth() > month) ||
      (today.getFullYear() - year === 18 && today.getMonth() === month && today.getDate() >= day)
    if (!isValid) {
      return {
        isValid,
      }
    }
    return {
      isValid,
      isoDate: date.toISOString(),
    }
  }
  const openWhatsApp = async () => {
    try {
      await Eitri.openBrowser({
        url: 'https://api.whatsapp.com/send?phone=+5511959612798',
      })
    } catch (e) {
      console.error('Error mailToSac', e)
    }
  }
  return (
    <Page bottomInset topInset>
      <HeaderTemplate headerType={HEADER_TYPE.RETURN_AND_TEXT} viewBackButton={true} contentText={'Editar perfil'} />
      <Loading fullScreen isLoading={isLoading} />
      <View className="p-8 flex flex-col">
        <View>
          <Text className="block w-full font-bold">Nome</Text>
          <View className="mt-1 flex">
            <CustomInput
              placeholder="Nome"
              value={user?.firstName || ''}
              onChange={(value) => handleInputChange('firstName', value)}
              className="bg-base-100"
            />
            <CustomInput
              placeholder="Sobrenome"
              value={user?.lastName || ''}
              onChange={(value) => handleInputChange('lastName', value)}
              className="bg-base-100"
            />
          </View>
        </View>
        <View>
          <Text className="block w-full mb-1 font-bold">Data de nascimento</Text>
          <CustomInput
            placeholder="DD/MM/AAAA"
            inputMode="numeric"
            mask="99/99/9999"
            value={user?.birthDate || ''}
            onChange={(value) => handleInputChange('birthDate', value)}
            className="bg-base-100"
          />
        </View>
        <View>
          <Text className="block w-full mb-1 font-bold">Telefone</Text>
          <CustomInput
            placeholder="(99) 99999-9999"
            value={user?.homePhone?.replace('+55', '') || ''}
            inputMode="numeric"
            onChange={(value) => handleInputChange('homePhone', value)}
            mask="(99) 99999-9999"
            className="bg-base-100"
          />
        </View>
        <View>
          <Text className="block w-full mb-1 font-bold">Sexo</Text>
          <View className="flex">
            <View align="center" className="flex flex-row">
              <Radio
                value={'male'}
                checked={user?.gender === 'male'}
                onChange={(value) => handleInputChange('gender', value)}
              />
              <Text className="block w-full ml-1">Masculino</Text>
            </View>
            <View align="center" className="flex flex-row">
              <Radio
                value={'female'}
                checked={user?.gender === 'female'}
                onChange={(value) => handleInputChange('gender', value)}
              />
              <Text className="block w-full ml-1">Feminino</Text>
            </View>
          </View>
        </View>
        <View>
          <Text className="block w-full mb-1 font-bold">CPF</Text>
          <CustomInput
            placeholder="000.000.000-00"
            value={user.document || ''}
            inputMode="numeric"
            onChange={(value) => handleInputChange('document', value)}
            mask="999.999.999-99"
            className="bg-base-100"
          />
        </View>
        <View>
          <CustomButton width="100%" onClick={handleSave} />
        </View>
      </View>
    </Page>
  )
}
