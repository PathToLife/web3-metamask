import React from 'react'
import { Button, Container, makeStyles, Typography } from '@material-ui/core'
import { useHistory } from 'react-router'

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(10),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  button: {
    marginTop: theme.spacing(2),
    width: 150,
  },
}))

export const WelcomePage: React.FC = () => {
  const classes = useStyles()

  const history = useHistory()

  const handleStart = () => {
    history.push('/app')
  }

  return (
    <Container maxWidth={'sm'} className={classes.container}>
      <Typography align="center" variant={'h2'}>
        Metamask
      </Typography>
      <Typography align="center" variant={'h4'}>
        Test App
      </Typography>
      <Button
        variant={'contained'}
        className={classes.button}
        onClick={handleStart}
      >
        Start
      </Button>
    </Container>
  )
}
