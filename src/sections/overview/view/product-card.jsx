/* eslint-disable */
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import { Link as Link2 } from 'react-router-dom';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { fCurrency } from 'src/utils/format-number';

import Label from 'src/components/label';
import { ColorPreview } from 'src/components/color-utils';
import { useTasks } from 'src/context/TasksContext';
import LoadingButton from '@mui/lab/LoadingButton';

// ----------------------------------------------------------------------

export default function ShopProductCard({ product }) {
  const { deleteTask } = useTasks();
  //console.log(product)
  const renderStatus = (
    <Label
      variant="filled"
      color={(product.status === 'sale' && 'error') || 'info'}
      sx={{
        zIndex: 9,
        top: 16,
        right: 16,
        position: 'absolute',
        textTransform: 'uppercase',
      }}
    >
      {product.status}
    </Label>
  );

  const renderImg = (
    <Box
      component="img"
      alt={product.title}
      src={product.images[0].url}
      sx={{
        width: 1,
        height: '163px',
        objectFit: 'cover',
        margin: '0 0 5px 0',
      }}
      lg={{
        width: '270px',
        height: '143px',
        objectFit: 'contain',
      }}
    />
  );

  const renderContent = (
    <Typography variant="subtitle1">
      <Typography
        component="span"
        variant="body1"
        sx={{
          color: 'text.disabled',
        }}
      >
        {product.description}
      </Typography>
    </Typography>
  );

  return (
    <Card>
      <Box sx={{ pt: 0, position: 'relative' }}>{renderImg}</Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Typography color="inherit" underline="hover" variant="subtitle2" noWrap>
          {product.title}
        </Typography>

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          {renderContent}
        </Stack>
      </Stack>
    </Card>
  );
}

ShopProductCard.propTypes = {
  product: PropTypes.object,
};
