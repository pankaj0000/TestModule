import AsyncStorage from '@react-native-async-storage/async-storage';

export async function setDataInAsync(STORAGE_KEY: string, STORAGE_DATA: any) {
  try {
    if (!STORAGE_KEY)
      throw Error('No key found in saving data in Async storage');
    if (!STORAGE_DATA) throw Error('Data is either null or undefined');
    const data = {
      data: STORAGE_DATA,
    };
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error(
      'Error in saving data into async storage',
      error,
      '\nKeyname',
      STORAGE_KEY,
      '\nSTORAGE_DATA',
      STORAGE_DATA,
    );
  }
}

export async function getDataFromAsync(STORAGE_KEY: string) {
  try {
    if (!STORAGE_KEY)
      throw Error('No key found getting data from Async storage');
    const asyncData = await AsyncStorage.getItem(STORAGE_KEY);
    if (asyncData) {
      const parsedData = JSON.parse(asyncData);
      return parsedData?.data;
    }
    return null;
  } catch (error) {
    console.error(
      'Error in getting data from async storage',
      error,
      '\nKeyname',
      STORAGE_KEY,
    );
  }
}

export async function removeDataFromAsync(STORAGE_KEY: string) {
  try {
    if (!STORAGE_KEY)
      throw Error('No key found for removing data from Async storage');
    await AsyncStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error(
      'Error in removing data from async storage',
      error,
      '\nkeyname',
      STORAGE_KEY,
    );
  }
}
