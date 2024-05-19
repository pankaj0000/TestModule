import React, {useEffect, useState} from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {useUserInfo} from '../../Context/UserProvider';
import {Button, Icon, Text} from '@ui-kitten/components';
import {BundleStrings} from '../../constants/BundleString';

import {TRootStackProp} from '../../types/navigation/stackProps.types';
import {signout} from '../../services/auth.service';
import FastImage from 'react-native-fast-image';
import {checkGalleryPermission} from '../../utils/permission.utils';
import {
  ImagePickerResponse,
  launchImageLibrary,
} from 'react-native-image-picker';
import {
  getDataFromAsync,
  removeDataFromAsync,
  setDataInAsync,
} from '../../utils/async.utils';

const IMAGE_URL =
  'https://w7.pngwing.com/pngs/205/731/png-transparent-default-avatar-thumbnail.png';

export default function ProfileInfo({navigation}: TRootStackProp) {
  const [image, setImage] = useState<ImagePickerResponse | undefined>();
  const {user} = useUserInfo();

  useEffect(() => {
    (async () => {
      const image = await getDataFromAsync('Profile');
      if (image) setImage(image);
    })();
  }, []);

  const renderIcon = (props): React.ReactElement => (
    <Icon {...props} name={'log-out-outline'} />
  );
  async function pickImageFromGallery() {
    try {
      const result = await checkGalleryPermission();
      if (result) {
        const imageLibraryResponse = await launchImageLibrary({
          mediaType: 'photo',
          selectionLimit: 1,
        });
        setImage(imageLibraryResponse);
        await setDataInAsync('Profile', imageLibraryResponse);
      }
    } catch (error) {
      console.error('Error in picking image from gallery', error);
    }
  }

  return (
    <View style={styles.container}>
      <Button
        appearance="outline"
        accessoryLeft={renderIcon}
        onPress={async () => {
          await signout();
          await removeDataFromAsync('Profile');
          navigation.reset({
            index: 0,
            routes: [{name: 'auth'}],
          });
        }}
        style={{marginVertical: 10, alignSelf: 'flex-end', marginBottom: 20}}>
        {BundleStrings.logout}
      </Button>
      <Text>Email: {user?.email}</Text>
      <View style={{marginTop: 20}}>
        <Pressable onPress={pickImageFromGallery}>
          <FastImage
            source={{
              uri: image?.assets?.[0]?.uri
                ? image?.assets?.[0]?.uri
                : IMAGE_URL,
            }}
            style={styles.imageStyle}
          />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
    alignItems: 'center',
  },
  imageStyle: {
    height: 100,
    width: 100,
    borderRadius: 100,
  },
});
