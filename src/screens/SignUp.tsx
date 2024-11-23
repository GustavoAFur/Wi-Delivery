import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  Pressable,
  Image,
  TouchableOpacity,
  TextInput,
  TouchableNativeFeedback,
} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import auth from '@react-native-firebase/auth';
import LottieView from 'lottie-react-native';
import LinearGradient from 'react-native-linear-gradient';

import IconBack from '../../assets/svgs/back-w.svg';

export function SignUp({navigation}: {navigation: any}) {
  const {width, height} = Dimensions.get('window');

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const [isFocused, setIsFocused] = useState('');
  const [loading, setLoading] = useState(false);
  const [messageErro, setmessageErro] = useState<string>('');

  function signInWithEmailAndPassword() {
    setLoading(true);

    if (email != '' && password != '') {
      auth()
        .signInWithEmailAndPassword(email, password)
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            setmessageErro('Esse endereço de email já esta em uso!');
          }

          if (error.code === 'auth/invalid-email') {
            setmessageErro('Email ou senha inválida.');
          }

          if (error.code === 'auth/wrong-password') {
            setmessageErro('Sua senha está incorreta.');
          }

          if (error.code === 'auth/invalid-credential') {
            setmessageErro('Tente novamente mais tarde.');
          } else {
            console.log(error.code);
          }
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setmessageErro('Informe um email e senha válidos.');
      setLoading(false);
    }
  }

  return (
    <ScrollView
      keyboardShouldPersistTaps="always"
      showsVerticalScrollIndicator={false}
      style={{
        backgroundColor: '#ffff',
      }}>
      <KeyboardAvoidingView
        keyboardVerticalOffset={Platform.OS === 'ios' ? -15 : -15}
        style={{
          width: width,
          height: '100%',
        }}>
        <StatusBar
          translucent
          backgroundColor={'#00000000'}
          barStyle={'light-content'}
        />

        <LinearGradient
          colors={['#F58106', '#EE2F2A']}
          style={{
            width: '100%',
            height: 250,
            paddingTop: getStatusBarHeight(),
          }}>
          <View
            style={{
              width: '100%',
              height: 42,
              marginTop: 16,
              paddingHorizontal: 30,
            }}>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}>
              <IconBack width={24} height={24} />
            </TouchableOpacity>
          </View>
        </LinearGradient>

        <View
          style={{
            width: '100%',
            marginVertical: 32,
          }}>
          <Text
            style={{
              color: '#323232',
              textAlign: 'center',
              letterSpacing: -1,
              fontSize: 30,
              lineHeight: 30,
              fontFamily: 'DMSans-Regular',
              textAlignVertical: 'center',
            }}>
            Crie sua conta agora,{'\n'}
            <Text style={{color: '#EE2F2A', fontFamily: 'DMSans-SemiBold'}}>
              simples{' '}
            </Text>
            e{' '}
            <Text style={{color: '#EE2F2A', fontFamily: 'DMSans-SemiBold'}}>
              fácil
            </Text>
            .
          </Text>

          <Text
            style={{
              fontSize: 13,
              width: '60%',
              textAlign: 'center',
              fontFamily: 'DMSans-Regular',
              color: '#323232',
              alignSelf: 'center',
              marginTop: 10,
            }}>
            Cadastre-se para ter acesso aos melhores descontos e ofertas.
          </Text>
        </View>

        <View
          style={{
            marginTop: 8,
            paddingHorizontal: 30,
            gap: 16,
          }}>
          <View style={{}}>
            <Text
              style={{
                fontSize: 14,
                fontFamily: 'DMSans-SemiBold',
                color: '#0F1121',
              }}>
              Nome
            </Text>

            <View
              style={{
                width: '100%',
                height: 50,
                backgroundColor: '#F5F5F5',
                borderRadius: 12,
                marginTop: 8,
                borderWidth: 1,
                //@ts-ignore
                borderColor: isFocused == 'nameRef' ? '#EE2F2A' : '#F5F5F5',
              }}>
              <TextInput
                ref={nameRef}
                onSubmitEditing={() => {
                  //@ts-ignore
                  emailRef.current.focus();
                }}
                keyboardType="email-address"
                autoComplete="email"
                placeholder="Digite seu nome"
                placeholderTextColor={'#D5D6DB'}
                autoCorrect={false}
                returnKeyType="go"
                showSoftInputOnFocus={true}
                selectTextOnFocus={true}
                onChangeText={setEmail}
                value={email}
                onFocus={() => {
                  setIsFocused('nameRef');
                }}
                onBlur={() => {
                  setIsFocused('');
                }}
                style={{
                  width: '100%',
                  fontSize: 15,
                  fontFamily: 'DMSans-Medium',
                  color: '#0F1121',
                  height: 48,
                  marginLeft: 10,
                }}
              />
            </View>
          </View>

          <View style={{}}>
            <Text
              style={{
                fontSize: 14,
                fontFamily: 'DMSans-SemiBold',
                color: '#0F1121',
              }}>
              Email
            </Text>

            <View
              style={{
                width: '100%',
                height: 50,
                backgroundColor: '#F5F5F5',
                borderRadius: 12,
                marginTop: 8,
                borderWidth: 1,
                //@ts-ignore
                borderColor: isFocused == 'emailRef' ? '#EE2F2A' : '#F5F5F5',
              }}>
              <TextInput
                ref={emailRef}
                onSubmitEditing={() => {
                  //@ts-ignore
                  passwordRef.current.focus();
                }}
                keyboardType="email-address"
                autoComplete="email"
                placeholder="Digite seu email"
                placeholderTextColor={'#D5D6DB'}
                autoCorrect={false}
                returnKeyType="go"
                showSoftInputOnFocus={true}
                selectTextOnFocus={true}
                onChangeText={setEmail}
                value={email}
                onFocus={() => {
                  setIsFocused('emailRef');
                }}
                onBlur={() => {
                  setIsFocused('');
                }}
                style={{
                  width: '100%',
                  fontSize: 15,
                  fontFamily: 'DMSans-Medium',
                  color: '#0F1121',
                  height: 48,
                  marginLeft: 10,
                }}
              />
            </View>
          </View>

          <View style={{}}>
            <Text
              style={{
                fontSize: 14,
                fontFamily: 'DMSans-SemiBold',
                color: '#0F1121',
              }}>
              Senha
            </Text>

            <View
              style={{
                width: '100%',
                height: 48,
                backgroundColor: '#F5F5F5',
                borderRadius: 12,
                marginTop: 8,
                borderWidth: 1,
                //@ts-ignore
                borderColor: isFocused == 'passwordRef' ? '#EE2F2A' : '#F3F3FA',
              }}>
              <TextInput
                ref={passwordRef}
                onSubmitEditing={() => {
                  signInWithEmailAndPassword();
                }}
                keyboardType="default"
                secureTextEntry={true}
                placeholder="Digite sua senha"
                placeholderTextColor={'#D5D6DB'}
                returnKeyType="send"
                showSoftInputOnFocus={true}
                selectTextOnFocus={true}
                onChangeText={setPassword}
                value={password}
                onFocus={() => {
                  setIsFocused('passwordRef');
                }}
                onBlur={() => {
                  setIsFocused('');
                }}
                style={{
                  width: '100%',
                  fontSize: 15,
                  fontFamily: 'DMSans-Medium',
                  color: '#0F1121',
                  height: 48,
                  marginLeft: 10,
                }}
              />
            </View>
          </View>

          {messageErro && (
            <View style={{alignItems: 'center'}}>
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: 'DMSans-Medium',
                  color: '#EE2F2A',
                }}>
                {messageErro}
              </Text>
            </View>
          )}

          <Pressable
            onPress={() => {
              signInWithEmailAndPassword();
            }}
            style={{
              width: '100%',
              height: 52,
              borderRadius: 50,
              backgroundColor: '#EE2F2A',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 24,
            }}>
            {loading ? (
              <LottieView
                source={require('../../assets/json/loading-w.json')}
                autoPlay
                loop={true}
                speed={1}
                style={{
                  width: 66,
                  height: 66,
                }}
              />
            ) : (
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: 'DMSans-SemiBold',
                  color: '#FFFFFF',
                }}>
                Entrar
              </Text>
            )}
          </Pressable>
        </View>

        <View
          style={{
            width: '100%',
            marginTop: 24,
            paddingHorizontal: 30,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                width: '22%',
                height: 1,
                backgroundColor: '#F3F3FA',
              }}
            />

            <Text
              style={{
                fontSize: 14,
                lineHeight: 16,
                fontFamily: 'DMSans-Regular',
                color: '#67697A',
              }}>
              ou cadastre-se com
            </Text>

            <View
              style={{
                width: '22%',
                height: 1,
                backgroundColor: '#F3F3FA',
              }}
            />
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: 20,
            }}>
            <Pressable
              onPress={() => {
                navigation.navigate('SignUpPaceiro');
              }}
              style={{
                width: 160,
                height: 52,
                borderRadius: 50,
                flexDirection: 'row',
                gap: 8,
                alignItems: 'center',
                justifyContent: 'center',
                borderWidth: 1,
                borderColor: '#F3F3FA',
              }}>
              <Image
                source={require('../../assets/images/gmail.png')}
                style={{
                  width: 20,
                  height: 20,
                }}
              />

              <Text
                style={{
                  fontSize: 14,
                  fontFamily: 'DMSans-Medium',
                  color: '#0F1121',
                }}>
                Google
              </Text>
            </Pressable>

            <Pressable
              onPress={() => {
                navigation.navigate('SignUpGarcom');
              }}
              style={{
                width: 160,
                height: 52,
                borderRadius: 50,
                flexDirection: 'row',
                gap: 8,
                alignItems: 'center',
                justifyContent: 'center',
                borderWidth: 1,
                borderColor: '#F3F3FA',
              }}>
              <Image
                source={require('../../assets/images/facebook.png')}
                style={{
                  width: 20,
                  height: 20,
                }}
              />

              <Text
                style={{
                  fontSize: 14,
                  fontFamily: 'DMSans-Medium',
                  color: '#0F1121',
                }}>
                Facebook
              </Text>
            </Pressable>
          </View>

          <View
            style={{
              marginTop: 32,
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: 14,
                fontFamily: 'DMSans-Regular',
                color: '#0F1121',
              }}>
              Já uma tem conta?{' '}
              <Text
                style={{
                  color: '#EE2F2A',
                  fontFamily: 'DMSans-SemiBold',
                }}>
                Entre
              </Text>
            </Text>
          </View>
        </View>

        <View
          style={{
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            borderTopColor: '#F1F1F1',
            borderTopWidth: 0.8,
            paddingHorizontal: 20,
            marginBottom: 24,
            marginTop: 32,
          }}>
          <Text
            style={{
              width: '90%',
              fontSize: 12,
              fontFamily: 'GeneralSans-Regular',
              color: '#707070',
              marginTop: 16,
              textAlign: 'center',
            }}>
            Ao continuar, você concorda com os nossos{' '}
            <Text style={{fontFamily: 'GeneralSans-Medium', color: '#323232'}}>
              Termos de Serviço
            </Text>{' '}
            e declara que leu nossa
            <Text style={{fontFamily: 'GeneralSans-Medium', color: '#323232'}}>
              {' '}
              Política de Privacidade
            </Text>{' '}
            para saber como coletamos e usamos seus dados.
          </Text>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}
