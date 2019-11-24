import yoga from 'yoga-layout';

export const alignMap = {
  center: yoga.ALIGN_CENTER,
  'flex-start': yoga.ALIGN_FLEX_START,
  'flex-end': yoga.ALIGN_FLEX_END,
  stretch: yoga.ALIGN_STRETCH,
  'space-between': yoga.ALIGN_SPACE_BETWEEN,
  'space-around': yoga.ALIGN_SPACE_AROUND,
  baseline: yoga.ALIGN_BASELINE,
  auto: yoga.ALIGN_AUTO,
};

export const justifyMap = {
  center: yoga.JUSTIFY_CENTER,
  'flex-start': yoga.JUSTIFY_FLEX_START,
  'flex-end': yoga.JUSTIFY_FLEX_END,
  'space-between': yoga.JUSTIFY_SPACE_BETWEEN,
  'space-around': yoga.JUSTIFY_SPACE_AROUND,
  'space-evenly': yoga.JUSTIFY_SPACE_EVENLY,
};

export const directionMap = {
  row: yoga.FLEX_DIRECTION_ROW,
  column: yoga.FLEX_DIRECTION_COLUMN,
  'column-reverse': yoga.FLEX_DIRECTION_COLUMN_REVERSE,
  'row-reverse': yoga.FLEX_DIRECTION_ROW_REVERSE,
};

export const wrapMap = {
  wrap: yoga.WRAP_WRAP,
  nowrap: yoga.WRAP_NO_WRAP,
  'wrap-reverse': yoga.WRAP_WRAP_REVERSE,
};

export const overflowMap = {
  hidden: yoga.OVERFLOW_HIDDEN,
  scroll: yoga.OVERFLOW_SCROLL,
  visible: yoga.OVERFLOW_VISIBLE,
};

export const positionMap = {
  absolute: yoga.POSITION_TYPE_ABSOLUTE,
  relative: yoga.POSITION_TYPE_RELATIVE,
};

export const edgeMap = {
  left: yoga.EDGE_LEFT,
  top: yoga.EDGE_TOP,
  right: yoga.EDGE_RIGHT,
  bottom: yoga.EDGE_BOTTOM,
  start: yoga.EDGE_START,
  end: yoga.EDGE_END,
  horizontal: yoga.EDGE_HORIZONTAL,
  vertical: yoga.EDGE_VERTICAL,
  all: yoga.EDGE_ALL,
};

export const displayMap = {
  flex: yoga.DISPLAY_FLEX,
  none: yoga.DISPLAY_NONE,
};

export function applyStyles(node, styles) {
  Object.keys(styles).forEach(style => {
    switch (style) {
      case 'flex':
        node.setFlex(styles[style]);
        break;
      case 'display':
        node.setDisplay(displayMap[styles[style]]);
        break;
      case 'height':
        if (val === 'auto') {
          node.setHeightAuto();
        } else {
          node.setHeight(styles[style]);
        }
        break;
      case 'heightPct':
        node.setHeightPercentage(styles[style]);
        break;
      case 'width':
        let val = styles[style];
        if (val === 'auto') {
          node.setWidthAuto();
        } else {
          node.setWidth(styles[style]);
        }
        break;
      case 'widthPct':
        node.setWidthPercent(styles[style]);
        break;
      case 'padding':
        node.setPadding(yoga.EDGE_ALL, styles[style]);
        break;
      case 'paddingPct':
        node.setPaddingPercent(yoga.EDGE_ALL, styles[style]);
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
      case 'flexWrap':
        node.setFlexWrap(wrapMap[styles[style]]);
        break;
      case 'flexGrow':
        node.setFlexGrow(styles[style]);
        break;
      case 'flexShrink':
        node.setFlexShrink(styles[style]);
        break;
      case 'flexBasis':
        node.setFlexBasis(styles[style]);
        break;
      case 'flexBasisPct':
        node.setFlexBasisPercent(styles[style]);
        break;
      case 'borderWidth':
        node.setBorder(edgeMap.all, styles[style]);
        break;
      case 'borderLeftWidth':
        node.setBorder(edgeMap.left, styles[style]);
        break;
      case 'borderRightWidth':
        node.setBorder(edgeMap.right, styles[style]);
        break;
      case 'borderTopWidth':
        node.setBorder(edgeMap.top, styles[style]);
        break;
      case 'borderBottomWidth':
        node.setBorder(edgeMap.bottom, styles[style]);
        break;
      case 'top':
        node.setPosition(edgeMap.top, styles[style]);
        break;
      case 'bottom':
        node.setPosition(edgeMap.bottom, styles[style]);
        break;
      case 'left':
        node.setPosition(edgeMap.left, styles[style]);
        break;
      case 'right':
        node.setPosition(edgeMap.right, styles[style]);
        break;
      case 'position':
        node.setPositionType(positionMap[styles[style]]);
        break;
      case 'paddingTop':
        node.setPadding(edgeMap.top, styles[style]);
        break;
      case 'paddingLeft':
        node.setPadding(edgeMap.left, styles[style]);
        break;
      case 'paddingRight':
        node.setPadding(edgeMap.right, styles[style]);
        break;
      case 'paddingBottom':
        node.setPadding(edgeMap.bottom, styles[style]);
        break;
      case 'marginTop':
        node.setMargin(edgeMap.top, styles[style]);
        break;
      case 'marginLeft':
        node.setMargin(edgeMap.left, styles[style]);
        break;
      case 'marginRight':
        node.setMargin(edgeMap.right, styles[style]);
        break;
      case 'marginBottom':
        node.setMargin(edgeMap.bottom, styles[style]);
        break;
      default:
        break;
    }
  });
}
