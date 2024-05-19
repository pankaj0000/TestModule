import auth from '@react-native-firebase/auth';

export function login(
  email: string,
  password: string,
): Promise<UserCredential> {
  return new Promise((resolve, reject) => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(response => resolve(response))
      .catch(err => reject(err));
  });
}

export function signup(email: string, password: string) {
  return new Promise((resolve, reject) => {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(response => resolve(response))
      .catch(err => reject(err));
  });
}

export function signout() {
  return new Promise((resolve, reject) => {
    auth()
      .signOut()
      .then(response => resolve(response))
      .catch(err => reject(err));
  });
}

export {auth};
