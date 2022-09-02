import type {
  NativeSyntheticEvent,
  TextInputChangeEventData
} from 'react-native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { ParamListBase } from '@react-navigation/native';

export type ResponseType<T = any> = {
  code?: number;
  data?: T;
  message?: string;
};

export type TextInputEvent = NativeSyntheticEvent<TextInputChangeEventData>;

export type Navigation = StackNavigationProp<ParamListBase, string, undefined>;
