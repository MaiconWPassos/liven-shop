import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    name: string;
    colors: {
      primary: string;
      danger: string;

      background: string;
      color: string;

      headerBackground: string;
      headerColor: string;
    };
  }
}
