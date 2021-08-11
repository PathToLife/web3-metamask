import React from 'react'
import { Container, ContainerProps, Fade, withStyles } from '@material-ui/core'

const MuiContainer: React.FC<ContainerProps> = (props) => {
  const { children, ...other } = props
  return (
    <Fade in>
      <Container {...other}>{children}</Container>
    </Fade>
  )
}

const PageContainer = withStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}))(MuiContainer)
export default PageContainer
