import { TextField, Grid, InputAdornment } from '@mui/material';

const FormInput = ({ label, name, value, onChange, placeholder, icon }) => (
  <Grid item xs={12} sm={6}>
    <TextField
      fullWidth
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <i className={`tabler-${icon}`} />
          </InputAdornment>
        )
      }}
    />
  </Grid>
);

export default FormInput;
