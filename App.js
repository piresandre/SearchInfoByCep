import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Button } from 'react-native';
import api from './src/api';
import { TextInput } from 'react-native-gesture-handler';

export default class App extends Component {
  state ={
    errorMessage: null,
    cep:null,
    logradouro:null,
    localidade:null,
    uf:null,
    newCep:null,
    show:true,
  };
  
  ShowHideComponent = () => {
    if (this.state.show == true) {
      this.setState({ show: false });
    } else {
      this.setState({ show: true });
    }
  };

  signIn = async()=>{
    try{
      if(this.state.newCep == null || this.state.cep == ""){
        this.setState({errorMessage: "Digite um CEP válido"})
      }
      const response =  await api.get(this.state.newCep+'/json/');
      this.setState({cep:response.data.cep});
      this.setState({logradouro:response.data.logradouro});
      this.setState({localidade:response.data.localidade});
      this.setState({uf:response.data.uf});
    }catch(response){
      this.setState({errorMessage: response.error});
    }
  };
  
  render() {
    return (
      <View style={styles.container}>
        {this.state.show && !!this.state.errorMessage && <Text>Error: {this.state.errorMessage}</Text>}
        {!!this.state.cep && <Text>CEP: {this.state.cep}</Text>}
        {!!this.state.logradouro && <Text>Logradouro: {this.state.logradouro}</Text>}
        {!!this.state.localidade && <Text>Localidade: {this.state.localidade}</Text>}
        {!!this.state.uf && <Text>UF: {this.state.uf}</Text>}
        <TextInput placeholder='Digite o cep aqui' style={{marginBottom: 20,height:45, width:"95%", borderColor:"gray", borderWidth: 2}} onChangeText={newCep => this.setState({ newCep })}/>
        <Button onPress={this.signIn} style={{borderWidth: 2, borderColor: "gray", backgroundColor:"blue"}} title='Verificar CEP'></Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});
