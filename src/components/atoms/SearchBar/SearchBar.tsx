import { TextInput } from 'react-native';
import { SearchBarProps } from './SearchBar.types';
import { searchBarStyles } from './SearchBar.styles';
import { useStyles } from 'react-native-unistyles';
import { Box } from '../Box';
import { Icon } from '../Icon';
import { useRef } from 'react';

export const SearchBar = ({ style, ...rest }: SearchBarProps) => {
  const { styles, theme } = useStyles(searchBarStyles);
  const ref = useRef<TextInput>(null);
  return (
    <Box style={styles.container}>
      <Icon
        name="SearchIcon"
        color={theme.colors.Blue900}
        height={30}
        width={30}
        style={styles.icon}
      />
      <TextInput ref={ref} style={[styles.textInput, style]} {...rest} />
    </Box>
  );
};
