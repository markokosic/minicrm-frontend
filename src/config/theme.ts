import {
  ActionIcon,
  Badge,
  Button,
  Card,
  createTheme,
  Input,
  InputWrapper,
  MantineColorsTuple,
  NavLink,
  Paper,
  Table,
} from '@mantine/core';

const enterpriseBlue: MantineColorsTuple = [
  '#ebf5ff',
  '#d6eafe',
  '#b0d7fe',
  '#7ec0fc',
  '#46a2fa',
  '#1d72e8', // primary shade
  '#1458cc',
  '#1346a5',
  '#153b84',
  '#14316c',
];

export const theme = createTheme({
  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  headings: {
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    fontWeight: '700',
  },
  colors: {
    blue: enterpriseBlue,
    brand: enterpriseBlue,
  },
  primaryColor: 'blue',
  primaryShade: 5,

  defaultRadius: 'md',

  shadows: {
    xs: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    sm: '0 1px 3px 0 rgba(0, 0, 0, 0.08), 0 1px 2px -1px rgba(0, 0, 0, 0.08)',
    md: '0 4px 12px -2px rgba(0, 0, 0, 0.08), 0 2px 6px -1px rgba(0, 0, 0, 0.04)',
    lg: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.04)',
    xl: '0 20px 30px -10px rgba(0, 0, 0, 0.12), 0 10px 12px -8px rgba(0, 0, 0, 0.06)',
  },

  components: {
    Input: Input.extend({
      defaultProps: {
        size: 'md',
      },
    }),
    InputWrapper: InputWrapper.extend({
      defaultProps: {
        size: 'md',
      },
    }),

    Button: Button.extend({
      defaultProps: {
        variant: 'filled',
        size: 'md',
      },
      styles: {
        root: {
          fontWeight: 600,
          letterSpacing: '-0.01em',
          transition: 'all 180ms ease',
          '&:hover': {
            transform: 'translateY(-1px)',
            boxShadow: '0 4px 12px rgba(29, 114, 232, 0.25)',
          },
          '&:active': {
            transform: 'translateY(0) scale(0.98)',
          },
        },
      },
    }),

    Card: Card.extend({
      defaultProps: {
        shadow: 'sm',
        withBorder: true,
      },
      styles: {
        root: {
          transition: 'transform 200ms ease, box-shadow 200ms ease, border-color 200ms ease',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: 'var(--mantine-shadow-md)',
          },
        },
      },
    }),

    Paper: Paper.extend({
      defaultProps: {
        shadow: 'xs',
        withBorder: true,
      },
    }),

    NavLink: NavLink.extend({
      styles: {
        root: {
          borderRadius: 'var(--mantine-radius-md)',
          fontWeight: 500,
          transition: 'all 150ms ease',
          margin: '2px 0',
          '&[data-active]': {
            fontWeight: 600,
          },
        },
      },
    }),

    Badge: Badge.extend({
      defaultProps: {
        radius: 'sm',
      },
      styles: {
        root: {
          fontWeight: 600,
          textTransform: 'none',
          letterSpacing: '0',
        },
      },
    }),

    ActionIcon: ActionIcon.extend({
      styles: {
        root: {
          transition: 'transform 150ms ease',
          '&:active': {
            transform: 'scale(0.94)',
          },
        },
      },
    }),

    Table: Table.extend({
      styles: {
        table: {
          borderRadius: 'var(--mantine-radius-md)',
        },
        tr: {
          transition: 'background-color 150ms ease',
        },
      },
    }),
  },
});
