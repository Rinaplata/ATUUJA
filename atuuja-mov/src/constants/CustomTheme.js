import { DefaultTheme } from '@react-navigation/native';
import colors from './colors';

const CustomTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.fondoClaro, // Fondo de la app
    card: colors.principal, // Fondo de las tarjetas o la barra de navegación
    text: colors.luminous, // Color de texto en general
    border: colors.variante7, // Color de bordes
    notification: colors.advertencia, // Color para notificaciones
  },
};

export default CustomTheme;
