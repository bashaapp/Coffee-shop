import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

export const COLORS = {
      // Error
      error: 'rgba(246, 86, 93, 1)',
      error80: 'rgba(246, 86, 93, 0.8)',
      error60: 'rgba(246, 86, 93, 0.6)',
      error20: 'rgba(246, 86, 93, 0.2)',
      error08: 'rgba(246, 86, 93, 0.08)',
  
      // Dark
      dark: 'rgba(13, 15, 35, 1)',
      dark80: 'rgba(13, 15, 35, 0.8)',
      dark60: 'rgba(13, 15, 35, 0.6)',
      dark20: 'rgba(13, 15, 35, 0.2)',
      dark08: 'rgba(13, 15, 35, 0.08)',
  
      // Grey
      grey: 'rgba(160, 161, 180, 1)',
      grey80: 'rgba(160, 161, 180, 0.8)',
      grey60: 'rgba(160, 161, 180, 0.6)',
      grey20: 'rgba(160, 161, 180, 0.2)',
      grey08: 'rgba(160, 161, 180, 0.08)',
      gray: "#898B9A",
      gray2: "#BBBDC1",
      gray3: '#FAFAFA',
  
      // Light Grey
      lightGrey: 'rgba(247, 247, 247, 1)',
      lightGrey80: 'rgba(247, 247, 247, 0.8)',
      lightGrey60: 'rgba(247, 247, 247, 0.6)',
      lightGrey20: 'rgba(247, 247, 247, 0.2)',
      lightGrey08: 'rgba(247, 247, 247, 0.08)',
  
      // Light
      light: 'rgba(255, 255, 255, 1)',
      light80: 'rgba(255, 255, 255, 0.8)',
      light60: 'rgba(255, 255, 255, 0.6)',
      light20: 'rgba(255, 255, 255, 0.2)',
      light08: 'rgba(255, 255, 255, 0.08)',
  
      // Support 1
      support1: 'rgba(110, 162, 255, 1)',
      support1_08: 'rgba(110, 162, 255, 0.08)',
  
      // Support 2
      support2: 'rgba(249, 161, 218, 1)',
      support2_08: 'rgba(249, 161, 218, 0.08)',
  
      // Support 3
      support3: 'rgba(0, 210, 224, 1)',
      support3_08: 'rgba(0, 210, 224, 0.08)',
  
      // Support 4
      support4: 'rgba(255, 132, 13, 1)',
      support4_08: 'rgba(255, 132, 13, 0.08)',
  
      // Support 5
      support5: 'rgba(123, 96, 238, 1)',
      support5_08: 'rgba(123, 96, 238, 0.08)',
  
      // Shadow
      shadow: 'rgba(138, 149, 158, 1)',
      shadow08: 'rgba(138, 149, 158, 0.08)',
    // Primary
    primary: '#D4A056',
    primary1: '#EADBCC',
    primary2:'#141313',
    bgColor: opacity=> `rgba(112, 66, 20, ${opacity})`,
    bgLight: '#d4a574',
    bgDark: '#8c5319',
    text: '#3C2A21',

    // Secondary
    secondary: 'rgba(161, 219, 245, 1)',
    secondary80: 'rgba(161, 219, 245, 0.8)',


     // Light Grey
     lightGrey: 'rgba(247, 247, 247, 1)',
     lightGrey80: 'rgba(247, 247, 247, 0.8)',
     lightGrey60: 'rgba(247, 247, 247, 0.6)',
     lightGrey20: 'rgba(247, 247, 247, 0.2)',
     lightGrey08: 'rgba(247, 247, 247, 0.08)',


     white: '#FFFFFF',
     black: "#000000",
     green: '#008000',
     transparent: 'transparent',
     transparentWhite1: "rgba(255, 255, 255, 0.1)",
     transparentBlack1: "rgba(0, 0, 0, 0.1)",
     transparentBlack7: "rgba(0, 0, 0, 0.7)"
    


  
  
}

export const SIZES = {
    // global sizes
    base: 5,
    font: 14,
    radius: 18,
    padding: 50,
    padding_1:24,
    margin: 33,

    base_1: 8,
    font_1: 14,
    radius_1: 12,
    radius2_1:30,
    padding_11: 24,
    padding2_1:40,

    // font sizes
    largeTitle: 40,
    h1: 30,
    h2: 22,
    h3: 20,
    h4: 14,
    h5: 12,
    body1: 30,
    body2: 22,
    body3: 16,
    body4: 14,
    body5: 12,

    // app dimensions
    width,
    height
};

export const FONTS = {
    largeTitle: {fontSize: SIZES.largeTitle },
    h1: { fontSize: SIZES.h1, lineHeight: 36 },
    h2: {fontSize: SIZES.h2, lineHeight: 30 },
    h3: { fontSize: SIZES.h3, lineHeight: 22 },
    h4: { fontSize: SIZES.h4, lineHeight: 22 },
    h5: { fontSize: SIZES.h5, lineHeight: 22 },
    body1: { fontSize: SIZES.body1, lineHeight: 36 },
    body2: { fontSize: SIZES.body2, lineHeight: 30 },
    body3: { fontSize: SIZES.body3, lineHeight: 22 },
    body4: { fontSize: SIZES.body4, lineHeight: 22 },
    body5: { fontSize: SIZES.body5, lineHeight: 22 },
};

const appTheme = { COLORS, SIZES, FONTS };

export default appTheme;