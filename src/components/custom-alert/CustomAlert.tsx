import { Platform, Alert } from 'react-native';
import type { AlertButton } from 'react-native';

type AlertParams = {
  title?: string;
  message?: string;
  buttons?: AlertButton[];
};

function CustomAlert({ title, message, buttons }: AlertParams): void {
  if (Platform.OS === 'android' || Platform.OS === 'ios') {
    Alert.alert(title || '提示', message || '', buttons || [{ text: '确认' }]);
  }

  if (Platform.OS === 'web') {
    alert(message);
  }
}

export default CustomAlert;
