import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      primary: string;
      danger: string;

      background: string;
      color: string;
    };
  }
}
