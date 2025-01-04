import { Grid, Typography, Divider } from '@mui/material';

const FormSection = ({ title, children }) => (
  <>
    <Grid item xs={12}>
      <Typography variant='body2' className='font-medium'>
        {title}
      </Typography>
    </Grid>
    {children}
    <Grid item xs={12}>
      <Divider />
    </Grid>
  </>
);

export default FormSection;
