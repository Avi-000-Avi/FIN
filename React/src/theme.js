import {
    extendTheme,
    theme as base,
    withDefaultColorScheme,
    withDefaultVariant,
  } from '@chakra-ui/react';
  import { mode } from '@chakra-ui/theme-tools';
  
  const inputSelectStyles = {
    variants: {
      filled: {
        field: {
          _focus: {
            borderColor: 'brand.500',
          },
        },
      },
    },
    sizes: {
      md: {
        field: {
          borderRadius: 'none',
        },
      },
    },
  };
  
  const brandRing = {
    _focus: {
      ring: 2,
      ringColor: 'brand.500',
    },
  };
  
  const theme = extendTheme(
    {
      colors: {
        brand: {
          50: '#f5fee5',
//         100: "#c19161f",
//         200: "#aa7cf2",
//         300: "#23e8a0",
//         400: "#33a4f3",
//         500: "#0fb5dc",
//         600: "#d8d8d8",
          700: '#578602',
          800: '#3c5e00',
          900: '#203300',
        },
      },
      fonts: {
        heading: `Montserrat, ${base.fonts?.heading}`,
        body: `Inter, ${base.fonts?.body}`,
      },
      components: {
        Button: {
          variants: {
            primary: (props) => ({
              rounded: 'none',
              ...brandRing,
              color: mode('white', 'gray.800')(props),
              backgroundColor: mode('brand.500', 'brand.200')(props),
  
              _hover: {
                backgroundColor: mode('brand.600', 'brand.300')(props),
              },
  
              _active: {
                backgroundColor: mode('brand.700', 'brand.400')(props),
              },
            }),
          },
        },
        Input: { ...inputSelectStyles },
        
        Checkbox: {
          baseStyle: {
            control: {
              borderRadius: 'none',
              ...brandRing,
            },
          },
        },
      },
    },
    withDefaultColorScheme({
      colorScheme: 'brand',
      components: ['Checkbox'],
    }),
    withDefaultVariant({
      variant: 'filled',
      components: ['Input', 'Select'],
    })
  );
  
  export default theme;