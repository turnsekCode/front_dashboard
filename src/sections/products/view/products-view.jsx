/* eslint-disable */
import { useState, useEffect } from 'react';

import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Iconify from 'src/components/iconify';

import ProductCard from '../product-card';
import ProductSort from '../product-sort';
import ProductFilters from '../product-filters';
import ProductCartWidget from '../product-cart-widget';
import { useTasks } from 'src/context/TasksContext';
import { Link } from 'react-router-dom';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// ----------------------------------------------------------------------

export default function ProductsView() {
  const [openFilter, setOpenFilter] = useState(false);
  const { tasks, getTasks } = useTasks();

  useEffect(() => {
    getTasks();
  }, []);

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  return (
    <Container style={{ maxWidth: '100%' }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Projects</Typography>

        <Button variant="contained" color="inherit" starticon={<Iconify icon="eva:plus-fill" />}>
          <Link
            to="/add-project"
            variant="contained"
            color="inherit"
            starticon={<Iconify icon="eva:plus-fill" />}
          >
            New Project
          </Link>
        </Button>
      </Stack>

      {/* formulario para los proyector */}

      {tasks.length !== 0 ? (
        <>
          <Stack
            direction="row"
            alignItems="center"
            flexWrap="wrap-reverse"
            justifyContent="flex-end"
            sx={{ mb: 5 }}
          >
            <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
              <ProductFilters
                openFilter={openFilter}
                onOpenFilter={handleOpenFilter}
                onCloseFilter={handleCloseFilter}
              />

              <ProductSort />
            </Stack>
          </Stack>

          <Grid container spacing={3}>
            {tasks.map((product, index) => (
              <Grid key={product?._id} xs={12} sm={6} md={6} lg={4}>
                <Accordion
                  style={{
                    backgroundColor: '#fff',
                    borderRadius: '8px',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                  }}
                  xs={12}
                  sm={6}
                  md={6}
                  lg={4}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={`panel${index}-header`}
                    id={`panel${index}-header`}
                  >
                    <Typography
                      color="inherit"
                      underline="hover"
                      variant="subtitle2"
                      noWrap
                      className="mb-2"
                    >
                      <strong className="text-[18px]">Título:</strong> {product?.title}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <ProductCard product={product} key={product._id} />
                  </AccordionDetails>
                </Accordion>
              </Grid>
            ))}
          </Grid>
        </>
      ) : (
        <h1>No hay tareas</h1>
      )}

      <ProductCartWidget />
    </Container>
  );
}
