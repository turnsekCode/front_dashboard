/* eslint-disable */
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';

import Link from '@mui/material/Link';
import { Link as Link2 } from 'react-router-dom';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { AiOutlineLoading3Quarters } from 'react-icons/ai';

import { useTasks } from 'src/context/TasksContext';

// ----------------------------------------------------------------------

export default function ShopProductCard({ product }) {
  const { deleteTask, loadingId } = useTasks();

  const renderImg = product?.images.map((previewUrl, index) => (
    <Box
      key={previewUrl._id}
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
    <>
      <Typography variant="subtitle2" className="text-justify">
        <strong className="text-[16px]">Descripción principal:</strong> {product?.description}
      </Typography>
      <Typography variant="subtitle2" className="text-justify">
        <strong className="text-[16px]">Ruta dinamica:</strong> {product?.slug}
      </Typography>
      <Typography variant="subtitle2" className="text-justify">
        <strong className="text-[16px]">Categoría:</strong> {product?.categorie}
      </Typography>
      <Typography variant="subtitle2" className="text-justify">
        <strong className="text-[16px]">Titulo h1:</strong> {product?.title_h1}
      </Typography>
      <Typography variant="subtitle2" className="text-justify">
        <strong className="text-[16px]">Description p 1:</strong> {product?.description_p_1}
      </Typography>
      <Typography variant="subtitle2" className="text-justify">
        <strong className="text-[16px]">Description p 2:</strong> {product?.description_p_2}
      </Typography>
      <Typography variant="subtitle2" className="text-justify">
        <strong v>Description p 3:</strong> {product?.description_p_3}
      </Typography>
      <Typography variant="subtitle2" className="text-justify">
        <strong className="text-[16px]">Url web:</strong> {product?.url_web}
      </Typography>
    </>
  );

  return (
    <Card>
      <Stack spacing={2} sx={{ p: 3 }}>
        <Stack direction="column" alignItems="justify" justifyContent="space-between">
          {renderContent}
        </Stack>
      </Stack>
      <Box sx={{ pt: 0, position: 'relative' }}>{renderImg}</Box>
      <Box>
        <button
          onClick={() => {
            deleteTask(product?._id);
          }}
          className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded-sm mr-2 my-1"
        >
          {loadingId === product?._id ? (
            <AiOutlineLoading3Quarters className="animate-spin h-5 w-5" />
          ) : (
            'delete'
          )}
        </button>
        <Link2
          to={`/add-project/${product?._id}`}
          className="bg-blue-700 px-4 py-1 rounded-sm text-white ml-2"
        >
          edit
        </Link2>
      </Box>
    </Card>
  );
}

ShopProductCard.propTypes = {
  product: PropTypes.object,
};
