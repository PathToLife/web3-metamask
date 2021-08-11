import React, { useState, useEffect } from 'react'
import { CircularProgress, makeStyles, Typography } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: theme.spacing(2),
  },
  message: {
    marginTop: theme.spacing(2),
  },
  threeDots: {
    width: 20,
    display: 'inline',
  },
  messageContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
}))

interface LoadingPanelProps {
  isLoading: boolean
  message: string
}

const LoadingPanel: React.FC<LoadingPanelProps> = ({
  children,
  isLoading,
  message,
}) => {
  const classes = useStyles()

  const [threeDots, setThreeDots] = useState('')

  // three dots animation
  useEffect(() => {
    if (!isLoading) {
      setThreeDots('')
      return
    }

    let dotLength = 0
    const cycle = () => {
      if (dotLength === 3) {
        setThreeDots('')
        dotLength = 0
        return
      }
      dotLength += 1
      setThreeDots('...'.substr(0, dotLength))
    }
    const interval = setInterval(cycle, 500)
    return () => {
      clearInterval(interval)
      setThreeDots('')
    }
  }, [isLoading])

  if (!isLoading) {
    return <>{children}</>
  }

  return (
    <div className={classes.container}>
      <CircularProgress />
      <div className={classes.messageContainer}>
        <div className={classes.threeDots} />
        <Typography variant={'body1'} className={classes.message}>
          {message}
        </Typography>
        <Typography variant={'body1'} className={classes.threeDots}>
          {threeDots}
        </Typography>
      </div>
    </div>
  )
}

export default LoadingPanel
