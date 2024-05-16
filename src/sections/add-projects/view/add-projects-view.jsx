/* eslint-disable */
import { useState, useEffect } from 'react';

import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import LoadingButton from '@mui/lab/LoadingButton';
import Button from '@mui/material/Button';

import { products } from 'src/_mock/products';

import ProductCard from '../product-card';
import ProductSort from '../product-sort';
import ProductFilters from '../product-filters';
import ProductCartWidget from '../product-cart-widget';
import { useForm } from 'react-hook-form';
import { useAuth } from 'src/context/AuthContext';
import { useTasks } from 'src/context/TasksContext';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { toast, Toaster } from 'sonner';

// ----------------------------------------------------------------------

export default function AddProject() {
  const { createTask, getTasks, getTask, updateTask, error } = useTasks();
  const navigate = useNavigate();
  const params = useParams();
  const [preview, setPreview] = useState('');
  const [file, setFile] = useState([]);
  const [post, setPost] = useState({
    title: '',
    slug: '',
    categorie: '',
    title_h1: '',
    description_p_1: '',
    description_p_2: '',
    description_p_3: '',
    url_web: '',
    description: '',
    image: [],
  });
  useEffect(() => {
    (async () => {
      if (params.id) {
        const post = await getTask(params.id);
        setPost(post);
        //console.log(post)
        setPreview(post.images.map((image) => image.url));
      }
    })();
    getTasks();
  }, [params.id]);

  //funcion que previzualiza la imagen antes de subirla
  const previewImage = (event) => {
    const selectedFiles = Array.from(event.target.files); // Convertir FileList a Array
    setFile(selectedFiles); // Actualizar el estado con los archivos seleccionados

    // Previsualizar cada archivo seleccionado
    selectedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview((prevState) => [...prevState, reader.result]); // Agregar la vista previa al estado
      };
      reader.readAsDataURL(file);
    });
  };

  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 5 }}>
        Projects
      </Typography>
      {/* formulario para los proyector */}
      <Grid container spacing={1} className="justify-center">
        <Grid xs={12} md={8} lg={8}>
          <Card>
            <Box sx={{ p: 3, pb: 1 }}>
              <Formik
                initialValues={post}
                validationSchema={Yup.object({
                  title: Yup.string().required('Title is required'),
                  slug: Yup.string().required('slug is required'),
                  categorie: Yup.string().required('Categorie is required'),
                  title_h1: Yup.string().required('Title h1 is required'),
                  description_p_1: Yup.string().required('Description p 1 is required'),
                  description_p_2: Yup.string().required('Description p 2 is required'),
                  description_p_3: Yup.string().required('Description p 3 is required'),
                  url_web: Yup.string().required('Url_web is required'),
                  description: Yup.string().required('Descripcion is required'),
                  image: Yup.mixed().test('is-image', 'Image is required', function (value) {
                    if (!value) {
                      // Si no hay ningún valor, lanzar un error
                      return false;
                    }
                    if (Array.isArray(value)) {
                      // Si es un array, no cumple con la validación
                      return this.createError({
                        path: this.path,
                        message: 'Image is required',
                      });
                    }
                    // Si es un objeto, pasa la validación
                    return true;
                  }),
                })}
                onSubmit={async (values, actions) => {
                  const formData = new FormData();
                  formData.append('title', values.title);
                  formData.append('slug', values.slug);
                  formData.append('categorie', values.categorie);
                  formData.append('title_h1', values.title_h1);
                  formData.append('description_p_1', values.description_p_1);
                  formData.append('description_p_2', values.description_p_2);
                  formData.append('description_p_3', values.description_p_3);
                  formData.append('url_web', values.url_web);
                  formData.append('description', values.description);
                  // Agregar cada archivo al objeto FormData
                  file.forEach((file) => {
                    formData.append(`image`, file);
                  });
                  if (params.id) {
                    await updateTask(params.id, formData);
                  } else {
                    await createTask(formData);
                  }
                  actions.resetForm();
                  actions.setSubmitting(false);
                  navigate('/products');
                  setPreview('');
                }}
                enableReinitialize
              >
                {({ handleSubmit, setFieldValue, isSubmitting }) => (
                  <Form onSubmit={handleSubmit}>
                    <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">
                      Title
                    </label>
                    <Field
                      name="title"
                      placeholder="Title"
                      className="rounded-[20px] border appearance-none border-gray-300 w-full py-3 px-4 text-gray-700 outline-none focus:outline-none focus:border-transparent focus:shadow-md focus:ring-transparent"
                    ></Field>
                    <ErrorMessage component="p" name="title" className="text-red-400 text-sm" />
                    <label
                      htmlFor="slug"
                      className="block text-gray-700 text-sm font-bold mb-2 mt-4"
                    >
                      Dinamic route
                    </label>
                    <Field
                      name="slug"
                      placeholder="Dinamic route"
                      className="rounded-[20px] border appearance-none border-gray-300 w-full py-3 px-4 text-gray-700 outline-none focus:outline-none focus:border-transparent focus:shadow-md focus:ring-transparent"
                    ></Field>
                    <ErrorMessage component="p" name="slug" className="text-red-400 text-sm" />
                    <label
                      htmlFor="categorie"
                      className="block text-gray-700 text-sm font-bold mb-2 mt-4"
                    >
                      Categorie
                    </label>
                    <Field
                      name="categorie"
                      placeholder="categorie"
                      className="rounded-[20px] border appearance-none border-gray-300 w-full py-3 px-4 text-gray-700 outline-none focus:outline-none focus:border-transparent focus:shadow-md focus:ring-transparent"
                    ></Field>
                    <ErrorMessage component="p" name="categorie" className="text-red-400 text-sm" />
                    <label
                      htmlFor="title_h1"
                      className="block text-gray-700 text-sm font-bold mb-2 mt-4"
                    >
                      Tilte h1
                    </label>
                    <Field
                      name="title_h1"
                      placeholder="Tilte h1"
                      className="rounded-[20px] border appearance-none border-gray-300 w-full py-3 px-4 text-gray-700 outline-none focus:outline-none focus:border-transparent focus:shadow-md focus:ring-transparent"
                    ></Field>
                    <ErrorMessage component="p" name="title_h1" className="text-red-400 text-sm" />
                    <label
                      htmlFor="description_p_1"
                      className="block text-gray-700 text-sm font-bold mb-2 mt-4"
                    >
                      description p 1
                    </label>
                    <Field
                      name="description_p_1"
                      placeholder="description_p_1"
                      className="rounded-[20px] border appearance-none border-gray-300 w-full py-3 px-4 text-gray-700 outline-none focus:outline-none focus:border-transparent focus:shadow-md focus:ring-transparent"
                    ></Field>
                    <ErrorMessage
                      component="p"
                      name="description_p_1"
                      className="text-red-400 text-sm"
                    />
                    <label
                      htmlFor="description_p_2"
                      className="block text-gray-700 text-sm font-bold mb-2 mt-4"
                    >
                      description p 2
                    </label>
                    <Field
                      name="description_p_2"
                      placeholder="description_p_2"
                      className="rounded-[20px] border appearance-none border-gray-300 w-full py-3 px-4 text-gray-700 outline-none focus:outline-none focus:border-transparent focus:shadow-md focus:ring-transparent"
                    ></Field>
                    <ErrorMessage
                      component="p"
                      name="description_p_2"
                      className="text-red-400 text-sm"
                    />
                    <label
                      htmlFor="description_p_3"
                      className="block text-gray-700 text-sm font-bold mb-2 mt-4"
                    >
                      description p 3
                    </label>
                    <Field
                      name="description_p_3"
                      placeholder="description_p_3"
                      className="rounded-[20px] border appearance-none border-gray-300 w-full py-3 px-4 text-gray-700 outline-none focus:outline-none focus:border-transparent focus:shadow-md focus:ring-transparent"
                    ></Field>
                    <ErrorMessage
                      component="p"
                      name="description_p_3"
                      className="text-red-400 text-sm"
                    />
                    <label
                      htmlFor="url_web"
                      className="block text-gray-700 text-sm font-bold mb-2 mt-4"
                    >
                      Url web
                    </label>
                    <Field
                      name="url_web"
                      placeholder="url_web"
                      className="rounded-[20px] border appearance-none border-gray-300 w-full py-3 px-4 text-gray-700 outline-none focus:outline-none focus:border-transparent focus:shadow-md focus:ring-transparent"
                    ></Field>
                    <ErrorMessage component="p" name="url_web" className="text-red-400 text-sm" />
                    <label
                      htmlFor="description"
                      className="block text-gray-700 text-sm font-bold mb-2 mt-4"
                    >
                      Description
                    </label>
                    <Field
                      component="textarea"
                      name="description"
                      placeholder="description"
                      className="rounded-[20px] border appearance-none border-gray-300 w-full py-3 px-4 text-gray-700 outline-none focus:outline-none focus:border-transparent focus:shadow-md focus:ring-transparent"
                      rows={3}
                    ></Field>
                    <ErrorMessage
                      component="p"
                      name="description"
                      className="text-red-400 text-sm"
                    />
                    <label
                      htmlFor="description"
                      className="block text-gray-700 text-sm font-bold mb-2 mt-4"
                    >
                      Images
                    </label>
                    <input
                      multiple
                      type="file"
                      name="image"
                      className="rounded-[20px] border appearance-none border-gray-300 w-full py-3 px-4 text-gray-700 outline-none focus:outline-none focus:border-transparent focus:shadow-md focus:ring-transparent"
                      onChange={(e) => {
                        previewImage(e);
                        setFieldValue('image', e.target.files[0]);
                      }}
                    />
                    <ErrorMessage component="p" name="image" className="text-red-400 text-sm" />
                    {preview && (
                      <div className="flex flex-col justify-center mt-4">
                        <h2 className="block text-gray-700 text-sm font-bold my-4">
                          Vista previa del archivo
                        </h2>
                        {/* Mostrar la vista previa de cada archivo */}
                        <div className="lg:grid grid-cols-3 flex-col justify-center mt-4">
                          {preview.map((previewUrl, index) => (
                            <img
                              key={index}
                              src={previewUrl}
                              alt={`Preview ${index + 1}`}
                              style={{ maxWidth: '100%', maxHeight: '200px' }}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                    <Box className="pt-5 pb-4">
                      <Button
                        variant="contained"
                        color="inherit"
                        type="submit"
                        className="rounded text-white focus:outline-none disabled:bg-indigo-400"
                      >
                        {isSubmitting ? (
                          <AiOutlineLoading3Quarters className="animate-spin h-5 w-5" />
                        ) : (
                          'Save'
                        )}
                      </Button>
                    </Box>
                  </Form>
                )}
              </Formik>
            </Box>
          </Card>
        </Grid>
      </Grid>
      <ProductCartWidget />
    </Container>
  );
}
