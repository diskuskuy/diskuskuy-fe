import * as React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Stack from '@mui/material/Stack';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

export default function Breadcrumb({breadcrumbs, handleClick}) {
  return (
    <div className='flex flex-row items-center text-xs pb-10'>
        <Stack spacing={2}>
            <Breadcrumbs
                separator={<ChevronRightIcon fontSize="small" />}
                aria-label="breadcrumb"
            >
                {breadcrumbs}
            </Breadcrumbs>
        </Stack>
    </div>
  );
}