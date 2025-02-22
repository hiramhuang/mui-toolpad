import { Typography } from '@mui/material';
import { Box, SxProps } from '@mui/system';
import * as React from 'react';
import JsonView from '../JsonView';

export interface GlobalScopeExplorerProps {
  value?: Record<string, unknown>;
  sx?: SxProps;
}

export default function GlobalScopeExplorer({ value, sx }: GlobalScopeExplorerProps) {
  return (
    <Box sx={{ ...sx, width: 200, display: 'flex', flexDirection: 'column' }}>
      <Typography sx={{ mb: 1 }} variant="subtitle2">
        Scope
      </Typography>
      <Box sx={{ flex: 1, width: '100%', overflow: 'auto' }}>
        <JsonView src={value} />
      </Box>
    </Box>
  );
}
