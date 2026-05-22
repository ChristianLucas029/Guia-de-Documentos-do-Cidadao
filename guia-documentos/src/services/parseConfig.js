import Parse from 'parse/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// -------------------------------------------------------
// 🔐 Substitua pelos dados do seu app no Back4App
// Back4App → App Settings → Security & Keys
// -------------------------------------------------------
const APPLICATION_ID = '9OqFbsYUO8c56VjESxXZGhuVvITKY07kDEEJQRjk';
const CLIENT_KEY     = 'lccB2r8suKIcty8q81Y3htMbCl0Lddag8AmPQGVU';
const SERVER_URL     = 'https://parseapi.back4app.com/';

Parse.setAsyncStorage(AsyncStorage);
Parse.initialize(APPLICATION_ID, CLIENT_KEY);
Parse.serverURL = SERVER_URL;

export default Parse;