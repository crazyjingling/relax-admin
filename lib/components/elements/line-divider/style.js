import {Types} from '../../../data-types';
import {getColorString} from '../../../helpers/colors';

export default {
  type: 'lineDivider',
  options: [
    {
      type: 'Columns',
      options: [
        {
          label: 'Line Height',
          type: Types.Pixels,
          id: 'size'
        },
        {
          label: 'Style',
          type: Types.LineStyle,
          id: 'style'
        }
      ]
    },
    {
      label: 'Color',
      type: Types.Color,
      id: 'color'
    },
    {
      label: 'Max Width',
      type: 'Optional',
      id: 'useMaxWidth',
      unlocks: [
        {
          label: 'Max Width',
          type: Types.Pixels,
          id: 'maxWidth'
        },
        {
          label: 'Align',
          type: Types.Select,
          id: 'align',
          props: {
            labels: ['Left', 'Center', 'Right'],
            values: ['left', 'center', 'right']
          }
        }
      ]
    },
    {
      label: 'Padding',
      type: Types.Padding,
      id: 'padding'
    }
  ],
  defaults: {
    size: 1,
    style: 'solid',
    color: {
      value: '#000000',
      opacity: 100
    },
    useMaxWidth: false,
    maxWidth: '100px',
    align: 'center',
    padding: '5px 0px 10px 0px'
  },
  rules: (props) => {
    const rules = {
      line: {},
      holder: {}
    };

    rules.line.borderBottom = props.size + ' ' + props.style + ' ' + getColorString(props.color);
    rules.holder.height = props.size;
    rules.holder.padding = props.padding;

    if (props.useMaxWidth) {
      rules.line.display = 'inline-block';
      rules.line.width = props.maxWidth;
      rules.line.maxWidth = '100%';
      rules.line.verticalAlign = 'top';
      rules.holder.textAlign = props.align;
    }

    return rules;
  },
  getIdentifierLabel: (props) => {
    var str = '';

    str += props.size + 'px';
    str += ' | ';
    str += props.width;

    return str;
  }
};
