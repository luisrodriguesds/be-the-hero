import React, {
  useEffect,
  useRef,
  useState,
} from 'react';
import { TextInput, StyleSheet, View, Text } from 'react-native';
import { useField } from '@unform/core';

export default function Input({ name, label, ...rest }) {
  const inputRef = useRef(null)
  const { fieldName, registerField, defaultValue = '', error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: '_lastNativeText',
    })
  }, [fieldName, registerField]);

  return (
    <View>
      {label && <Text style={styles.inputText}>{label}</Text>}
      <TextInput
        ref={inputRef}
        defaultValue={defaultValue}
        style={error ? styles.inputError : styles.input}
        {...rest}
      />
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  inputText:{
    fontSize:16,
    fontWeight: 'bold',
    color:"#000",
    marginTop:20,
  },
  input:{
    height:48,
    backgroundColor:'#f9f9f9',
    borderRadius:8,
    paddingVertical:8,
    paddingHorizontal:10,
    borderColor:'#eee',
    borderWidth:1,
  },
  inputError:{
    borderColor:'#f00',
    height:48,
    backgroundColor:'#f9f9f9',
    borderRadius:8,
    paddingVertical:8,
    paddingHorizontal:10,
    borderWidth:1,
  },
  error:{
    color: '#f00'
  }
})
