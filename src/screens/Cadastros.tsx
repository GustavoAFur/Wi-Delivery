import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import firestore from '@react-native-firebase/firestore';

export function Cadastros() {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [details, setDetails] = useState('');
  const [images, setImages] = useState('');

  const handleCadastro = async () => {
    // Verifica se há vírgulas. Se não houver, trata como um único elemento em um array.
    const imagesArray = images.includes(',') 
      ? images.split(',').map(item => item.trim())  // Separa em array se houver vírgulas
      : [images.trim()];  // Coloca como um único item no array se for uma URL só

    try {
      await firestore().collection('products').add({
        name,
        category,
        price,
        details,
        images: imagesArray,  // Envia como array
      });
      console.log('Produto cadastrado com sucesso!');
    } catch (error) {
      console.error('Erro ao cadastrar o produto:', error);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text>Cadastros</Text>
      <TextInput placeholderTextColor={'#7C7C7C'} placeholder="Nome" value={name} onChangeText={setName} />
      <TextInput placeholderTextColor={'#7C7C7C'} placeholder="Categoria" value={category} onChangeText={setCategory} />
      <TextInput placeholderTextColor={'#7C7C7C'} placeholder="Preço" value={price} onChangeText={setPrice} keyboardType="numeric" />
      <TextInput placeholderTextColor={'#7C7C7C'} placeholder="Detalhes" value={details} onChangeText={setDetails} />
      <TextInput placeholderTextColor={'#7C7C7C'} placeholder="Imagens (separadas por vírgula)" value={images} onChangeText={setImages} />

      <Pressable
        onPress={handleCadastro}
        style={{ backgroundColor: 'blue', padding: 10, borderRadius: 5, marginTop: 10 }}
      >
        <Text style={{ color: 'white', textAlign: 'center' }}>Cadastrar</Text>
      </Pressable>
    </View>
  );
}
