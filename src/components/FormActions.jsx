import { Button, CardActions } from '@mui/material';

const FormActions = ({ onReset }) => (
  <CardActions>
    <Button type="submit" variant="contained" className='mie-2'>
      Kirim

    </Button>
    <Button
      type="reset"
      variant="tonal"
      color="secondary"
      onClick={onReset}
    >
      Atur Ulang
    </Button>
  </CardActions>
);

export default FormActions;

