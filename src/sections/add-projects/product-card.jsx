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
  //console.log(product);
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

  const renderImg = product.images.map((previewUrl, index) => (
    <Box
      component="img"
      alt={previewUrl.title}
      src={previewUrl.url}
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
  ));

  const renderContent = (
    <Typography variant="subtitle1">
      <Typography
        component="span"
        variant="body1"
        sx={{
          color: 'text.disabled',
          textDecoration: 'line-through',
        }}
      >
        {product.description}
      </Typography>
      &nbsp;
      {product.description}
    </Typography>
  );

  return (
    <Card>
      <Box sx={{ pt: 0, position: 'relative' }}>{renderImg}</Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Link color="inherit" underline="hover" variant="subtitle2" noWrap>
          Titulo: {product.title}
        </Link>

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          {renderContent}
        </Stack>
      </Stack>
      <Box>
        <LoadingButton
          onClick={() => {
            deleteTask(product._id);
          }}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-sm mr-2 my-2"
        >
          deleteee
        </LoadingButton>
        <Link2 to={`/tasks/${product._id}`} className="bg-indigo-500 px-4 py-1 rounded-sm">
          edit
        </Link2>
      </Box>
    </Card>
  );
}

ShopProductCard.propTypes = {
  product: PropTypes.object,
};
