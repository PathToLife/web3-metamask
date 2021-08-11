import React from 'react'
import { IconButton, makeStyles, Typography } from '@material-ui/core'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import clsx from 'clsx'

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  backButton: {},
  title: {
    textAlign: 'center',
  },
  rightSizeContainer: {
    minWidth: 48,
  },
}))

interface PageHeaderProps {
  onBack: () => void
  title: string
  rightSize?: JSX.Element
  className?: string
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  onBack,
  title,
  rightSize,
  className,
}) => {
  const classes = useStyles()
  return (
    <div className={clsx(classes.container, className)}>
      <IconButton
        size={'medium'}
        onClick={onBack}
        className={classes.backButton}
      >
        <ArrowBackIosIcon fontSize="inherit" />
      </IconButton>
      <Typography variant={'subtitle1'} className={classes.title}>
        {title}
      </Typography>
      <div className={classes.rightSizeContainer}>{rightSize}</div>
    </div>
  )
}
