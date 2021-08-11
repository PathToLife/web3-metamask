import { Avatar, withStyles } from '@material-ui/core'
import { colorPalette } from '../styles/theme'

export const StyledAvatar = withStyles((theme) => ({
  root: {
    backgroundColor: colorPalette.blueGrey.main,
    color: theme.palette.common.white,
  },
}))(Avatar)

export default StyledAvatar
