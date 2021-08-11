import React from 'react'
import { Button, ButtonProps, withStyles } from '@material-ui/core'

export const MainButton = withStyles((theme) => ({
  root: {
    marginTop: theme.spacing(4),
    width: '100%',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    borderRadius: 30,
    textTransform: 'none',
  },
}))((props: ButtonProps) => <Button variant={'contained'} {...props} />)

export const SecondaryButton = withStyles((theme) => ({
  root: {
    marginTop: theme.spacing(4),
    width: '100%',
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.common.white,
    borderRadius: 30,
    textTransform: 'none',
  },
}))((props: ButtonProps) => <Button variant={'contained'} {...props} />)

export const TextButton = withStyles((theme) => ({
  root: {
    textTransform: 'none',
  },
}))((props: ButtonProps) => <Button variant={'text'} {...props} />)
