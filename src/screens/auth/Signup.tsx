import React, {useState} from 'react';
import {ImageProps, Pressable, StyleSheet, Text, View} from 'react-native';
import {Colors} from '../../constants/Colors';
import {Formik} from 'formik';
import {BundleStrings} from '../../constants/BundleString';
import {authValidation} from '../../validation/auth.validation';
import TextInput from '../../components/TextInput';
import {Button, Spinner} from '@ui-kitten/components';
import {TRooStack} from '../../types/navigation/compositeProps.types';
import {signup} from '../../services/auth.service';
import {ToastMessage} from '../../components/ToastMessage';

export default function Signup({navigation}: TRooStack) {
  const [loading, setLoading] = useState(false);
  function handleSubmit(e: {email: string; password: string}) {
    setLoading(true);
    signup(e.email, e.password)
      .then(response => {
        navigation.replace('login');
      })
      .catch(err => {
        console.error('Error in login', err);
        setLoading(false);
        ToastMessage(err?.code);
      });
  }

  const LoadingIndicator = (props: ImageProps): React.ReactElement => (
    <View style={[props.style, styles.indicator]}>
      <Spinner size="small" />
    </View>
  );
  return (
    <View style={styles.container}>
      <View style={styles.headingContainer}>
        <Text style={styles.headingTextStyle}>{BundleStrings.signup}</Text>
      </View>
      <Formik
        initialValues={{email: '', password: ''}}
        validationSchema={authValidation}
        onSubmit={e => handleSubmit(e)}>
        {({values, handleChange, errors, handleSubmit, touched}) => (
          <View style={{marginTop: 50, marginHorizontal: 10}}>
            <TextInput
              value={values?.email}
              onChange={handleChange('email')}
              placeholder={BundleStrings.email}
              label={BundleStrings.email}
              caption={errors.email && touched.email ? errors.email : ''}
            />
            <TextInput
              value={values?.password}
              onChange={handleChange('password')}
              placeholder={BundleStrings.password}
              label={BundleStrings.password}
              secureText={true}
              style={{marginTop: 30}}
              caption={
                errors.password && touched.password ? errors.password : ''
              }
            />
            <Button
              size="medium"
              appearance="outline"
              style={styles.buttonStyle}
              onPress={handleSubmit}
              disabled={loading}
              accessoryLeft={loading ? LoadingIndicator : <></>}>
              {BundleStrings.signup}
            </Button>
          </View>
        )}
      </Formik>
      <View style={styles.headingContainer}>
        <Pressable onPress={() => navigation.navigate('login')}>
          <Text style={{color: 'black', fontWeight: '700'}}>
            {BundleStrings.loginLink}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    color: Colors.white,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headingContainer: {
    marginVertical: 10,
  },
  headingTextStyle: {
    fontSize: 30,
    fontWeight: '700',
    color: 'black',
  },
  textInputStyle: {
    width: '90%',
  },
  buttonStyle: {
    marginTop: 90,
  },
  indicator: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
