export const drawChildTree = ({ ctx, children, offset }) => {
  Object.keys(children).forEach((key, index) => {
    const child = children[key];
    drawChild({ ctx, child, offset });
  });
};

export const drawChild = ({ ctx, child, offset = { x: 0, y: 0 } }) => {
  if (!child.computed) {
    return;
  }
  let { left, top, width, height } = child.computed;
  let offsetLeft = offset.x + left;
  let offsetTop = offset.y + top;

  const props = child.props;

  if (child.type === 'View') {
    ctx.fillStyle = props.style.backgroundColor || 'transparent';

    if (props.style.borderWidth) {
      ctx.strokeStyle = props.style.borderColor || 'transparent';
      ctx.lineWidth = props.style.borderWidth || 0;
      ctx.strokeRect(
        offsetLeft + props.style.borderWidth / 2,
        offsetTop + props.style.borderWidth / 2,
        width - props.style.borderWidth,
        height - props.style.borderWidth
      );
    }
    if (props.style.borderBottomWidth) {
      ctx.strokeStyle =
        props.style.borderBottomColor ||
        props.style.borderColor ||
        'transparent';
      ctx.lineWidth = props.style.borderBottomWidth || 0;
      ctx.beginPath();
      ctx.moveTo(
        offsetLeft,
        offsetTop + height - props.style.borderBottomWidth / 2
      );
      ctx.lineTo(
        offsetLeft + width,
        offsetTop + height - props.style.borderBottomWidth / 2
      );
      ctx.stroke();
    }
    if (props.style.borderTopWidth) {
      ctx.strokeStyle =
        props.style.borderTopColor || props.style.borderColor || 'transparent';
      ctx.lineWidth = props.style.borderTopWidth || 0;
      ctx.beginPath();
      ctx.moveTo(offsetLeft, offsetTop + props.style.borderTopWidth / 2);
      ctx.lineTo(
        offsetLeft + width,
        offsetTop + props.style.borderTopWidth / 2
      );
      ctx.stroke();
    }
    if (props.style.borderLeftWidth) {
      ctx.strokeStyle =
        props.style.borderLeftColor || props.style.borderColor || 'transparent';
      ctx.lineWidth = props.style.borderLeftWidth || 0;
      ctx.beginPath();
      ctx.moveTo(offsetLeft + props.style.borderLeftWidth / 2, offsetTop);
      ctx.lineTo(
        offsetLeft + props.style.borderLeftWidth / 2,
        offsetTop + height
      );
      ctx.stroke();
    }
    if (props.style.borderRightWidth) {
      ctx.strokeStyle =
        props.style.borderRightColor ||
        props.style.borderColor ||
        'transparent';
      ctx.lineWidth = props.style.borderRightWidth || 0;
      ctx.beginPath();
      ctx.moveTo(
        offsetLeft + width - props.style.borderRightWidth / 2,
        offsetTop
      );
      ctx.lineTo(
        offsetLeft + width - props.style.borderRightWidth / 2,
        offsetTop + height
      );
      ctx.stroke();
    }

    const widthOffset = props.style.borderWidth ? props.style.borderWidth : 0;
    const doubleWidthOffset = props.style.borderWidth
      ? props.style.borderWidth * 2
      : 0;

    ctx.beginPath();
    ctx.rect(
      offsetLeft + widthOffset,
      offsetTop + widthOffset,
      width - doubleWidthOffset,
      height - doubleWidthOffset
    );
    ctx.fill();

    if (props.style.overflow === 'hidden') {
      ctx.save();
      ctx.clip();
    }

    if (child.children && Object.keys(child.children).length) {
      child.offset = { x: offsetLeft, y: offsetTop };
      drawChildTree({ ctx, children: child.children, offset: child.offset });
    }

    if (props.style.overflow === 'hidden') {
      ctx.restore();
    }
  } else if (child.type === 'Text') {
    const { fontFamily, fontSize, fontStyle, color } = props.style;
    ctx.font = `${fontStyle || 'normal'} ${fontSize || 14}px ${fontFamily ||
      'Arial'}`;
    ctx.fillStyle = color || 'black';
    ctx.textBaseline = 'top';
    ctx.direction = 'ltr';
    ctx.textAlign = (props.style && props.style.textAlign) || 'left';
    child.lines &&
      child.lines.forEach(line => {
        ctx.fillText(line.text, offsetLeft, offsetTop + line.y);
      });
  }
};

export const redrawSubtree = ({ ctx, target, parent, id, props }) => {
  const paths = parent.split('|');

  paths.forEach((path, i, arr) => {
    if (path !== 'CanvasRoot') {
      target = target.children[path];
    }
  });
  const node = target.children[id];
  drawChild({ ctx, child: node, offset: target.offset });
};
