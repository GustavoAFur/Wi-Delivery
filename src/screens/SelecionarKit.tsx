import React from 'react';
import { View, Text, Dimensions,TouchableOpacity } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { useAuth } from '../hooks/auth';
import { FlatList } from 'react-native-gesture-handler';
import { ItensKits } from './ItensKits.';

//@ts-ignore
export function SelecionarKit({navigation}) {

  const { width, height } = Dimensions.get("window")

  const {kitsCarrinho, setKitsCarrinho} = useAuth()

  const kitBasico = "https://www.kitranchoescolhacerta.com.br/wp-content/uploads/2018/01/kit-rancho.png"
  const kitLimpeza = "https://calvo.com.br/wp-content/uploads/2022/08/CESTA-CLEAN-MASTER.png"
  const kitPremium = "https://calvo.com.br/wp-content/uploads/2022/10/KIT-ESMERALDA.png"
  const kitMaster = "https://calvo.com.br/wp-content/uploads/2022/10/KIT-ESMERALDA.png"

  const kits = [
    {id_: 1, nome: 'Kit Básico', preco: '50.00', caminho: kitBasico, itens: [{qtd: 3, item: 'Arroz'},{qtd: 2, item: 'Feijão'},{qtd: 5, item: 'Macarrão '},{qtd: 5, item: 'Macarrão '}]},
    {id_: 2, nome: 'Kit Limpeza', preco: '88.50', caminho: kitLimpeza, itens: [{qtd: 2, item: 'Detergente'}]},
    {id_: 3, nome: 'Kit Premium', preco: '659.00',caminho: kitPremium, itens: [{qtd: 1, item: 'Feijão'}]},
    {id_: 4, nome: 'Kit Master', preco: '799.00 ',caminho: kitMaster, itens: [{qtd: 4, item: 'Macarrão'}]},
  ]

  function handleToggleAddCart(value: any, quantidade: number) {
    setKitsCarrinho(prevObjetos => {
      //@ts-ignore
      const objetoExistenteIndex = prevObjetos.findIndex(objeto => objeto.id_ === value.id_);
  
      if (objetoExistenteIndex !== -1) {
        // Se o objeto já existir, exclua-o do array
        const newObjects = [...prevObjetos];
        newObjects.splice(objetoExistenteIndex, 1);
        return newObjects;
      } else {
        // Se o objeto não existir, adicione-o com a quantidade especificada
        return [...prevObjetos, { ...value, quantidade }];
      }
    });
  }

  function delProdCart (value: string){
    //@ts-ignore
    setKitsCarrinho((state)=> state.filter(item => item.id_ !== value)) 
                        
  }

  return (
    <View style={{ 
      width: width, 
      height: height +getStatusBarHeight(),
      paddingTop: getStatusBarHeight(),
      flex: 1,
      backgroundColor: '#fff'
    }}>
      <View
        style={{
          width: width,
          paddingHorizontal: 20
        }}
      >
        <Text style={{
          fontSize: 28,
          alignSelf:'center',
          color: '#323232',
          fontFamily: 'Manrope-SemiBold'
        }}>
          Selecione
          <Text style={{color: '#D9042B',}}>
          {' '}pelo menos{' '}
          </Text>
          um Kit para prosseguir
        </Text>
      </View>

      <FlatList
        contentContainerStyle={{paddingHorizontal: 10, }}
        style={{
          marginBottom: 120,
          marginTop: 10,
          paddingTop: 10
        }}
        data={kits}
        //@ts-ignore
        keyExtractor={item => item.id_}
        //@ts-ignore
        renderItem={({item})=>{
          return(
            <ItensKits
              imagem={item.caminho}
              name={item.nome}
              price={item.preco}
              //@ts-ignore
              selected={kitsCarrinho.length <= 0 ? false :  kitsCarrinho.some(objeto => objeto.id_ === item.id_)}
              selecionar={()=>{
                handleToggleAddCart(item, 1 )
              }}
            />

          )
        }
        }
      />

      <View
        style={{
          width: width,
          height: 120,
          position: 'absolute',
          bottom: 0,
          justifyContent: 'center'
        }}
      >
        <TouchableOpacity
          disabled={kitsCarrinho.length <= 0 ? true : false}
          onPress={()=>{
            navigation.navigate('TabNavigation')
          }}
          style={{
            width: '90%',
            paddingHorizontal: 20,
            paddingVertical: 10,
            backgroundColor: '#F2B705',
            alignSelf: 'center',
            borderRadius: 10,
            opacity: kitsCarrinho.length <= 0 ? .5 : 1
          }}
        >
          <Text style={{
            fontSize: 18,
            alignSelf:'center',
            color: '#fff',
            fontFamily: 'Manrope-SemiBold'
          }}>
            Continuar
          </Text>
        </TouchableOpacity>
      </View>
      

    </View>
  );
}
