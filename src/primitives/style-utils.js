import yoga from 'yoga-layout';

export const alignMap = {
  center: yoga.ALIGN_CENTER,
  'flex-start': yoga.ALIGN_FLEX_START,
  'flex-end': yoga.ALIGN_FLEX_END,
};

export const justifyMap = {
  center: yoga.JUSTIFY_CENTER,
  'flex-start': yoga.JUSTIFY_FLEX_START,
  'flex-end': yoga.JUSTIFY_FLEX_END,
};

export const directionMap = {
  row: yoga.FLEX_DIRECTION_ROW,
  column: yoga.FLEX_DIRECTION_COLUMN,
};

export function applyStyles(node, styles) {
  Object.keys(styles).forEach(style => {
    switch (style) {
      case 'flex':
        node.setFlex(styles[style]);
        break;
      case 'height':
        node.setHeight(styles[style]);
        break;
      case 'width':
        node.setWidth(styles[style]);
        break;
      case 'padding':
        node.setPadding(yoga.EDGE_ALL, styles[style]);
        break;
      case 'margin':
        node.setMargin(yoga.EDGE_ALL, styles[style]);
        break;
      case 'alignItems':
        node.setAlignItems(alignMap[styles[style]]);
        break;
      case 'justifyContent':
        node.setJustifyContent(justifyMap[styles[style]]);
        break;
      case 'flexDirection':
        node.setFlexDirection(directionMap[styles[style]]);
        break;
      default:
        break;
    }
  });
}
