import {CompositeScreenProps} from '@react-navigation/native';
import {StackScreenProps} from '@react-navigation/stack';
import {TAuthStack, TMainStack} from './stack.types';

export type TRooStack = CompositeScreenProps<
  StackScreenProps<TAuthStack, 'login'>,
  StackScreenProps<TMainStack>
>;
