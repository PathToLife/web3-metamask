import { withStyles, TextField, TextFieldProps } from '@material-ui/core'
import { colorPalette } from '../styles/theme'

export const StyledTextField = withStyles({
  root: {
    '& .MuiOutlinedInput-root': {
      backgroundColor: colorPalette.lightGrey.main,
      borderRadius: 30,
      '& fieldset': {
        borderRadius: 30,
        borderStyle: 'hidden',
      },
    },
    width: '100%',
  },
})((props: TextFieldProps) => <TextField variant={'outlined'} {...props} />)
