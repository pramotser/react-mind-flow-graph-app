import React from "react";
import styled, { css } from "styled-components";
import './LoadingScreen.css';
import { ColorRing } from "react-loader-spinner";
const DarkBackground = styled.div`
  display: none;
  position: fixed; 
  z-index: 999; 
  left: 0;
  top: 0;
  width: 100%; 
  height: 100%; 
  overflow: auto; 
  background-color: rgb(0, 0, 0); 
  background-color: rgba(0, 0, 0, 0.4); 
  align-items:center;
  justify-content:center;
  ${props =>
        props.disappear &&
        css`
      display: flex; 
    `}
`;

function LoadingScreen(props) {
    return (
        <DarkBackground disappear={props.loading}>
            <ColorRing
                visible={true}
                height="100"
                width="100"
                ariaLabel="blocks-loading"
                wrapperStyle={{}}
                wrapperClass="blocks-wrapper"
                colors={['#746687', '#9289a2', '#b3abc4', '#e1dce1', '#a9bdca']}
            />
        </DarkBackground>
    )
}

export default LoadingScreen;