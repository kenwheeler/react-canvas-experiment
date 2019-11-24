export const drawChildTree = ({ ctx, children }) => {
  Object.keys(children).forEach((key, index) => {
    const child = children[key];
    drawChild({ ctx, child });
  });
};

export const drawChild = ({ ctx, child }) => {
  if (!child.width) {
    return;
  }
  let { x, y, width, height } = child;

  const props = child.props;

  if (child.type === 'View') {
    ctx.fillStyle = props.style.backgroundColor || 'transparent';

    if (props.style.borderWidth) {
      ctx.strokeStyle = props.style.borderColor || 'transparent';
      ctx.lineWidth = props.style.borderWidth || 0;
      ctx.strokeRect(
        x + props.style.borderWidth / 2,
        y + props.style.borderWidth / 2,
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
      ctx.moveTo(x, y + height - props.style.borderBottomWidth / 2);
      ctx.lineTo(x + width, y + height - props.style.borderBottomWidth / 2);
      ctx.stroke();
    }
    if (props.style.borderTopWidth) {
      ctx.strokeStyle =
        props.style.borderTopColor || props.style.borderColor || 'transparent';
      ctx.lineWidth = props.style.borderTopWidth || 0;
      ctx.beginPath();
      ctx.moveTo(x, y + props.style.borderTopWidth / 2);
      ctx.lineTo(x + width, y + props.style.borderTopWidth / 2);
      ctx.stroke();
    }
    if (props.style.borderLeftWidth) {
      ctx.strokeStyle =
        props.style.borderLeftColor || props.style.borderColor || 'transparent';
      ctx.lineWidth = props.style.borderLeftWidth || 0;
      ctx.beginPath();
      ctx.moveTo(x + props.style.borderLeftWidth / 2, y);
      ctx.lineTo(x + props.style.borderLeftWidth / 2, y + height);
      ctx.stroke();
    }
    if (props.style.borderRightWidth) {
      ctx.strokeStyle =
        props.style.borderRightColor ||
        props.style.borderColor ||
        'transparent';
      ctx.lineWidth = props.style.borderRightWidth || 0;
      ctx.beginPath();
      ctx.moveTo(x + width - props.style.borderRightWidth / 2, y);
      ctx.lineTo(x + width - props.style.borderRightWidth / 2, y + height);
      ctx.stroke();
    }

    const widthOffset = props.style.borderWidth ? props.style.borderWidth : 0;
    const doubleWidthOffset = props.style.borderWidth
      ? props.style.borderWidth * 2
      : 0;

    ctx.beginPath();
    ctx.rect(
      x + widthOffset,
      y + widthOffset,
      width - doubleWidthOffset,
      height - doubleWidthOffset
    );
    ctx.fill();

    if (props.style.overflow === 'hidden') {
      ctx.save();
      ctx.clip();
    }

    if (child.children && Object.keys(child.children).length) {
      drawChildTree({ ctx, children: child.children });
    }

    if (props.style.overflow === 'hidden') {
      ctx.restore();
    }
  } else if (child.type === 'Text') {
    const { fontFamily, fontSize, fontWeight, color } = props.style;
    ctx.font = `normal ${fontWeight || 'normal'} ${fontSize ||
      14}px ${fontFamily || 'Arial'}`;
    ctx.fillStyle = color || 'black';
    ctx.textBaseline = 'top';
    ctx.direction = 'ltr';
    ctx.textAlign = (props.style && props.style.textAlign) || 'left';
    child.lines &&
      child.lines.forEach(line => {
        ctx.fillText(line.text, x, y + line.y);
      });
  }
};
