import styled from 'styled-components';
import theme from '../styles/theme';
const StyledDescription = styled.div`
  .desc_Heading {
    color: ${theme.colors.OUTER_SPACE};
    text-transform: uppercase;
    font-size: 11px;
    font-weight: normal;
    line-height: 36px;
    display: inline-block;
  }
  .quill {
    position: relative;
    width: 100%;
  }
  .desc_preview {
    font-size: 13px;
    max-height: 136px;
    overflow-y: auto;
    dl {
      padding-left: 15px;
    }
    ol,
    ul {
      padding-left: 35px;
    }
  }
  .desc_buttons {
    position: absolute;
    right: -60px;
    bottom: 0px;
  }
  .desc_editLink {
    color: #0072bc;
    cursor: pointer;
    float: right;
    text-decoration: none;
    font-size: 13px;
    margin: 0px 2px;
  }
  .desc_editor {
    position: relative;
    .customLength {
      color: ${theme.colors.OUTER_SPACE};
      font-size: 12px;
      line-height: 16px;
      text-align: right;
      margin-top: 10px;
    }
    .ql-editor {
      box-sizing: border-box;
      line-height: 20px;
      height: 100%;
      outline: none;
      overflow-y: auto;
      padding: 0px 6px;
      tab-size: 4;
      text-align: left;
      color: ${theme.colors.SILVER};
      white-space: pre-wrap;
      word-wrap: break-word;
      &.ql-blank::before {
        content: attr(data-placeholder);
        pointer-events: none;
        position: absolute;
        font-style: normal;
        color: ${theme.colors.SILVER};
      }
    }

    .ql-container.ql-snow {
      border: 1px solid #ccc;
      background: ${theme.colors.WHITE};
      padding: 5px 0px 5px 5px;
      margin-bottom: 10px;
    }

    .ql-snow {
      box-sizing: border-box;
    }
    .ql-editor,
    p {
      outline: none;
      line-height: 20px;
      margin-bottom: 0px;
      color: ${theme.colors.DARK_OUTER_SPACE};
    }

    ul,
    ol {
      color: ${theme.colors.DARK_OUTER_SPACE};
    }
    .ql-container {
      box-sizing: border-box;
      font-size: 13px;
      margin: 0px;
      position: relative;
      height: calc(${({ descStyle: { height } }) => height} - 62px);
      &.ql-snow {
        font-family: inherit;
        border: 1px solid ${theme.colors.ALTO};
        background: ${theme.colors.WHITE};
        border-radius: 0 0 4px 4px;
        margin-bottom: 0;
        &:active,
        &.active {
          border-color: ${theme.colors.SILVER};
        }
      }
    }

    .ql-toolbar.ql-snow {
      width: ${props => (props.fullToolbar ? '100%' : 'auto')};
      top: ${props => (props.fullToolbar ? '0' : '-35px')};
      position: ${props => (props.fullToolBar ? 'static' : 'absolute')};
      right: 0;
      border: 1px solid ${theme.colors.ALTO};
      border-radius: 4px 4px 0 0;
      box-sizing: border-box;
      font-family: 'Open sans', arial, sans-serif;
      padding: ${props => (props.fullToolBar ? '5px' : '7px')};
      background: ${theme.colors.WHITE};
      cursor: pointer;
      box-shadow: none;
      border-bottom: 0;
      .ql-formats {
        margin-right: 0;
      }
    }

    .ql-snow.ql-toolbar button {
      background: none;
      border: 1px solid ${theme.colors.WHITE};
      cursor: pointer;
      display: inline-block;
      float: left;
      color: #999;
      height: 20px;
      padding: 3px 5px;
      width: auto;
      &:hover,
      &.ql-active {
        border: 1px solid ${theme.colors.TROPICAL_BLUE};
        background: ${theme.colors.TROPICAL_BLUE};
      }
      svg {
        float: left;
        height: 100%;
      }
    }
    .ql-snow .ql-stroke {
      fill: none;
      stroke: #444;
      stroke-linecap: round;
      stroke-linejoin: round;
      stroke-width: 2;
    }

    .ql-editor li:not(.ql-direction-rtl)::before {
      margin-left: -1.5em;
      margin-right: 0.3em;
      text-align: right;
    }

    .ql-editor li::before {
      display: inline-block;
      white-space: nowrap;
      width: 1.2em;
    }

    .ql-clipboard {
      left: -100000px;
      height: 1px;
      overflow-y: hidden;
      position: absolute;
      top: 50%;
    }

    .ql-snow .ql-even {
      fill-rule: evenodd;
    }
    .ql-snow .ql-thin,
    .ql-snow .ql-stroke.ql-thin {
      stroke-width: 1;
    }
  }
  .ql-container {
    box-sizing: border-box;
    font-size: 13px;
    height: 100%;
    margin: 0px;
    position: relative;
  }
  .ql-container.ql-disabled .ql-tooltip {
    visibility: hidden;
  }
  .ql-snow .ql-tooltip {
    position: absolute;
    transform: translateY(10px);
  }
  .ql-snow .ql-tooltip a {
    cursor: pointer;
    text-decoration: none;
  }
  .ql-snow .ql-tooltip.ql-flip {
    transform: translateY(-10px);
  }
  .ql-snow .ql-tooltip {
    background-color: ${theme.colors.WHITE};
    border: 1px solid #ccc;
    box-shadow: 0px 0px 5px ${theme.colors.ALTO};
    color: #444;
    padding: 5px 12px;
    white-space: nowrap;
    margin-left: 80px;
  }
  .ql-snow .ql-tooltip::before {
    content: 'Visit URL:';
    line-height: 26px;
    margin-right: 8px;
  }
  .ql-snow .ql-tooltip input[type='text'] {
    display: none;
    border: 1px solid #ccc;
    font-size: 13px;
    height: 26px;
    margin: 0px;
    padding: 3px 5px;
    width: 170px;
  }
  .ql-snow .ql-tooltip a.ql-preview {
    display: inline-block;
    max-width: 200px;
    overflow-x: hidden;
    text-overflow: ellipsis;
    vertical-align: top;
  }
  .ql-snow .ql-tooltip a.ql-action::after {
    border-right: 1px solid #ccc;
    content: 'Edit';
    margin-left: 16px;
    padding-right: 8px;
  }
  .ql-snow .ql-tooltip a.ql-remove::before {
    content: 'Remove';
    margin-left: 8px;
  }
  .ql-snow .ql-tooltip a {
    line-height: 26px;
  }
  .ql-snow .ql-tooltip.ql-editing a.ql-preview,
  .ql-snow .ql-tooltip.ql-editing a.ql-remove {
    display: none;
  }
  .ql-snow .ql-tooltip.ql-editing input[type='text'] {
    display: inline-block;
  }
  .ql-snow .ql-tooltip.ql-editing a.ql-action::after {
    border-right: 0px;
    content: 'Save';
    padding-right: 0px;
  }
  .ql-snow .ql-tooltip[data-mode='link']::before {
    content: 'Enter link:';
  }
  .ql-snow .ql-tooltip[data-mode='formula']::before {
    content: 'Enter formula:';
  }
  .ql-snow .ql-tooltip[data-mode='video']::before {
    content: 'Enter video:';
  }
  .ql-snow a {
    color: #06c;
  }

  .ql-snow.ql-toolbar button:active:hover,
  .ql-snow .ql-toolbar button:active:hover {
    outline: none;
  }
  .ql-snow.ql-toolbar input.ql-image[type='file'],
  .ql-snow .ql-toolbar input.ql-image[type='file'] {
    display: none;
  }
  .ql-snow {
    box-sizing: border-box;
  }
  .ql-snow * {
    box-sizing: border-box;
  }
  .ql-snow .ql-hidden {
    display: none;
  }
  .ql-snow .ql-out-bottom,
  .ql-snow .ql-out-top {
    visibility: hidden;
  }
`;
export default StyledDescription;
