import React from 'react'
import { Button, ButtonProps, withStyles } from '@material-ui/core'

export const PrimaryButton = withStyles((theme) => ({
  root: {
    marginTop: theme.spacing(4),
    width: '100%',
    color: theme.palette.common.white,
    borderRadius: 30,
    textTransform: 'none',
  },
}))((props: ButtonProps) => (
  <Button variant={'contained'} color={'primary'} {...props} />
))

export const SecondaryButton = withStyles((theme) => ({
  root: {
    marginTop: theme.spacing(4),
    width: '100%',
    color: theme.palette.common.white,
    borderRadius: 30,
    textTransform: 'none',
  },
}))((props: ButtonProps) => (
  <Button variant={'contained'} color={'secondary'} {...props} />
))

export const TextButton = withStyles((theme) => ({
  root: {
    textTransform: 'none',
  },
}))((props: ButtonProps) => <Button variant={'text'} {...props} />)
