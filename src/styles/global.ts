import { createGlobalStyle } from "styled-components";
import "react-toastify/dist/ReactToastify.css";
import "nprogress/nprogress.css";

export default createGlobalStyle`
  
  body{ 
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.color};
    font-family: 'Inter', sans-serif!important;
  }

  a{ 
    cursor: pointer;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }


::-webkit-scrollbar {
  width: 2px;
}


::-webkit-scrollbar-track {
  background: transparent; 
}
 

::-webkit-scrollbar-thumb {
  background: ${({ theme }) => theme.colors.primary}; 
}


::-webkit-scrollbar-thumb:hover {
  background: ${({ theme }) => theme.colors.color}; 

}
`;
