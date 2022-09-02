import type {
  NativeSyntheticEvent,
  TextInputChangeEventData
} from 'react-native';

export type ResponseType<T = any> = {
  code?: number;
  data?: T;
  message?: string;
};

export type TextInputEvent = NativeSyntheticEvent<TextInputChangeEventData>;
