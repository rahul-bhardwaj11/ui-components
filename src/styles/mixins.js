const theme = require('./theme');

const mixins = {
  // button ----------//
  button: () => `
    font-size: 14px;
    height: 32px;
    font-weight: 600;
  `,
  primaryBtn: () => `
    border: 1px solid ${theme.colors.INDIGO};
    background-color: ${theme.colors.INDIGO};
  `,

  primaryBtnHover: () => `
    border: 1px solid ${theme.colors.JODHPUR};
    background-color: ${theme.colors.JODHPUR};
  `,

  textBtn: () => `
    border: 1px dashed transparent;
    background-color: transparent;
  `,

  fontStack: ({
    fontSize = '14px',
    fontWeight = 600,
    color = '#2A2E36',
    lineHeight = '22px',
    textTransform = 'inherit'
  }) => {
    return `
    font-size: ${fontSize};
    font-weight: ${fontWeight};
    color: ${color};
    line-height: ${lineHeight};
    text-transform: ${textTransform};
  `;
  },

  h1: () =>
    mixins.fontStack({
      fontSize: '24px',
      fontWeight: 600,
      color: theme.colors.SHARK,
      lineHeight: '32px'
    }),
  h2: () =>
    mixins.fontStack({
      fontSize: '20px',
      fontWeight: 600,
      color: theme.colors.SHARK,
      lineHeight: '28px'
    }),
  h2Placeholder: () =>
    mixins.fontStack({
      fontSize: '20px',
      fontWeight: 600,
      color: theme.colors.SILVER,
      lineHeight: '28px'
    }),
  h3: () =>
    mixins.fontStack({
      fontSize: '16px',
      fontWeight: 600,
      color: theme.colors.SHARK,
      lineHeight: '24px'
    }),
  h3Grey: () =>
    mixins.fontStack({
      fontSize: '16px',
      fontWeight: 600,
      color: theme.colors.OUTER_SPACE,
      lineHeight: '24px'
    }),

  zIndex: {
    GET_SUPPORT: 99999,
    TOAST: 9999,
    STATUS_BAR: 9991,
    LOADER: 9990,
    OVERLAY: 9980,
    CONFIRM_BOX: 9970,
    MODAL_WRAPPER: 9912,
    MODAL_MASK: 9911,
    TOOLTIP: 9950,
    POPOVER: 9940,
    HEADER: 9900
  },

  // links ----------//

  actionLink: () =>
    mixins.fontStack({
      fontSize: '14px',
      fontWeight: 600,
      color: theme.colors.INDIGO,
      lineHeight: '20px'
    }),

  blackLink: () =>
    mixins.fontStack({
      fontSize: '14px',
      fontWeight: 600,
      color: theme.colors.SHARK,
      lineHeight: '20px'
    }),
  greyLink: () =>
    mixins.fontStack({
      fontSize: '14px',
      fontWeight: 600,
      color: theme.colors.OUTER_SPACE,
      lineHeight: '20px'
    }),
  inactiveLink: () =>
    mixins.fontStack({
      fontSize: '14px',
      fontWeight: 600,
      color: theme.colors.SILVER,
      lineHeight: '20px'
    }),
  deleteLink: () =>
    mixins.fontStack({
      fontSize: '14px',
      fontWeight: 600,
      color: theme.colors.BITTERSWEET,
      lineHeight: '20px'
    }),

  error: () => ({
    fontSize: '12px',
    fontWeight: 600,
    color: theme.colors.BITTERSWEET,
    lineHeight: '16px'
  }),

  // body text ----------//

  whiteText: () =>
    mixins.fontStack({
      fontSize: '12px',
      fontWeight: 'normal',
      color: theme.colors.WHITE,
      lineHeight: '16px'
    }),

  whiteBoldText: () =>
    mixins.fontStack({
      fontSize: '14px',
      fontWeight: '600',
      color: theme.colors.WHITE,
      lineHeight: '20px'
    }),

  blackText: () =>
    mixins.fontStack({
      fontSize: '14px',
      fontWeight: 'normal',
      color: theme.colors.SHARK,
      lineHeight: '20px'
    }),
  darkText: () =>
    mixins.fontStack({
      fontSize: '14px',
      fontWeight: 'normal',
      color: theme.colors.DARK_OUTER_SPACE,
      lineHeight: '20px'
    }),
  darkSmText: () =>
    mixins.fontStack({
      fontSize: '14px',
      fontWeight: '600',
      color: theme.colors.DARK_OUTER_SPACE,
      lineHeight: '20px'
    }),
  greyText: () =>
    mixins.fontStack({
      fontSize: '14px',
      fontWeight: 'normal',
      color: theme.colors.OUTER_SPACE,
      lineHeight: '20px'
    }),
  placeholderText: () =>
    mixins.fontStack({
      fontSize: '14px',
      fontWeight: 'normal',
      color: theme.colors.SILVER,
      lineHeight: '20px'
    }),

  // small links ----------//

  smallBlackLink: () =>
    mixins.fontStack({
      fontSize: '12px',
      fontWeight: 'normal',
      color: theme.colors.SHARK,
      lineHeight: '16px'
    }),
  smallDarkLink: () =>
    mixins.fontStack({
      fontSize: '12px',
      fontWeight: 'normal',
      color: theme.colors.DARK_OUTER_SPACE,
      lineHeight: '16px'
    }),
  smallGreyLink: () =>
    mixins.fontStack({
      fontSize: '12px',
      fontWeight: 'normal',
      color: theme.colors.OUTER_SPACE,
      lineHeight: '16px'
    }),
  smallInactiveLink: () =>
    mixins.fontStack({
      fontSize: '12px',
      fontWeight: 'normal',
      color: theme.colors.SILVER,
      lineHeight: '16px'
    }),
  smallActiveLink: () =>
    mixins.fontStack({
      fontSize: '12px',
      fontWeight: 'normal',
      color: theme.colors.INDIGO,
      lineHeight: '16px'
    }),

  // labels ----------//

  smallBlackText: () =>
    mixins.fontStack({
      fontSize: '11px',
      fontWeight: 600,
      color: theme.colors.OUTER_SPACE,
      lineHeight: '16px',
      textTransform: 'uppercase'
    }),

  // number ----------//

  bigNumber: () =>
    mixins.fontStack({
      fontSize: '24px',
      fontWeight: 'bold',
      color: theme.colors.SHARK,
      lineHeight: '32px'
    }),
  mediumNumber: () =>
    mixins.fontStack({
      fontSize: '20px',
      fontWeight: 'bold',
      color: theme.colors.SHARK,
      lineHeight: '28px'
    }),
  smallNumber: () =>
    mixins.fontStack({
      fontSize: '20px',
      fontWeight: 'bold',
      color: theme.colors.DARK_OUTER_SPACE,
      lineHeight: '28px'
    }),
  smallestNumber: () =>
    mixins.fontStack({
      fontSize: '13px',
      fontWeight: 'bold',
      color: theme.colors.DARK_OUTER_SPACE,
      lineHeight: '20px'
    }),

  displayIB: () => `
  display: inline-block;
  vertical-align: middle;`,

  displayTableCell: () => `
  display: table-cell;
  vertical-align: middle;`,

  // @function calc-percent($target, $container) {
  //   @return ($target / $container) * 100%;
  // }

  clearfix: () => `
  &:after {
    content: '';
    display: table;
    clear: both;
  }`,

  centerDiv: () => `
  top: 50%;
  left: 50%;
  bottom: auto;
  right: auto;
  transform: translate(-50%, -50%);`,

  size: (width, height) => `
  width: ${width};
  height: ${height};`,

  square: size => {
    return mixins.size(size, size);
  },

  opacity: (opacity = 0.5) => {
    return `
    filter: alpha(opacity=${opacity} * 100);
    filter: progid:DXImageTransform.Microsoft.Alpha(opacity=#{$opacity*100});
    opacity: $opacity;`;
  },

  truncate: width => {
    return `
        max-width: ${width};
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      `;
  }
};

module.exports = mixins;
