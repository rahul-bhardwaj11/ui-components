import styled from 'styled-components';
import mixins from '../styles/mixins.js';

const StyledLoader = styled.div`
  &.fullPageloadingScreen {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0px;
    top: 0px;
    background: transparent;
    z-index: ${mixins.zIndex.LOADER};

    & .loader {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }

  &.smallPageLoadingScreen,
  &.fullPageloadingScreen {
    z-index: ${mixins.zIndex.LOADER};
    & .loader {
      text-align: center;
      p {
        font-size: 14px;
        margin-bottom: 0;
      }
    }
    .loadingHeading {
      text-align: center;
      color: #000;
      font-size: 20px;
      line-height: 30px;
      font-weight: 700;
    }
  }

  .spinner {
    text-align: center;
    margin: auto;
    display: block;
    position: relative;
    &.xsmall {
      width: 30px;
      height: 30px;
      div {
        ${mixins.square('16px')};
        border-width: 2px;
      }
    }
    &.small {
      width: 40px;
      height: 40px;
      div {
        ${mixins.square('30px')};
        border-width: 2px;
      }
    }
    &.big {
      width: 64px;
      height: 64px;
      div {
        ${mixins.square('51px')};
        border-width: 3px;
      }
    }
    div {
      box-sizing: border-box;
      display: block;
      position: absolute;
      margin: 6px;
      border: 6px solid #fff;
      border-radius: 50%;
      animation: spinner 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
      border-color: ${({ loaderStyle: { borderColor } = {} }) => {
          return borderColor;
        }}
        transparent transparent transparent;
      &:nth-child(1) {
        animation-delay: -0.45s;
      }
      &:nth-child(2) {
        animation-delay: -0.3s;
      }
      &:nth-child(3) {
        animation-delay: -0.15s;
      }
    }
  }
  @keyframes spinner {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export default StyledLoader;
