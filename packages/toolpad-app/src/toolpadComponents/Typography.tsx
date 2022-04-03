import { ToolpadComponentDefinition } from './componentDefinition';
import importedComponentRenderer from './importedComponentRenderer';

export default {
  id: 'Typography',
  displayName: 'Typography',
  render: importedComponentRenderer('@mui/material', 'Typography'),
  argTypes: {
    children: {
      typeDef: { type: 'string' },
      label: 'value',
      defaultValue: 'Text',
    },
    variant: {
      typeDef: {
        type: 'string',
        enum: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'subtitle1', 'subtitle2', 'body1', 'body2'],
      },
    },
    sx: {
      typeDef: { type: 'object' },
    },
  },
} as ToolpadComponentDefinition;