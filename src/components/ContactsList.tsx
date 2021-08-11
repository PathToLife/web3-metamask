import React from 'react'
import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  makeStyles,
  Typography,
} from '@material-ui/core'
import { colorPalette } from '../styles/theme'
import AddIcon from '@material-ui/icons/Add'
import { useHistory } from 'react-router-dom'
import { routePaths } from '../pages/Router'

const useStyles = makeStyles((theme) => ({
  list: {
    width: '100%',
  },
  listItem: {
    paddingLeft: 0,
    paddingRight: 0,
  },
  avatar: {
    backgroundColor: colorPalette.blueGrey.main,
    color: theme.palette.common.white,
    fontSize: '1em',
    width: 40,
    height: 40,
  },
  iconButton: {
    width: 40,
    height: 40,
    padding: 0,
    backgroundColor: 'transparent',
    color: colorPalette.darkGrey.main,
  },
}))

const ListItemContact: React.FC = () => {
  const classes = useStyles()
  return (
    <ListItem button className={classes.listItem}>
      <ListItemAvatar>
        <Avatar className={classes.avatar}>TC</Avatar>
      </ListItemAvatar>
      <ListItemText>
        <Typography variant={'subtitle1'}>Test Contact</Typography>
      </ListItemText>
    </ListItem>
  )
}

const ListItemAddContact: React.FC = () => {
  const classes = useStyles()
  const history = useHistory()

  const handleAdd = () => {
    history.push(routePaths.contacts.new)
  }
  return (
    <ListItem button className={classes.listItem} onClick={handleAdd}>
      <ListItemAvatar>
        <Avatar className={classes.iconButton}>
          <AddIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText>
        <Typography variant={'subtitle1'}>New Contact</Typography>
      </ListItemText>
    </ListItem>
  )
}

const ContactsList: React.FC = () => {
  const classes = useStyles()
  return (
    <List className={classes.list}>
      <ListItemAddContact />
      <ListItemContact />
      <ListItemContact />
      <ListItemContact />
      <ListItemContact />
    </List>
  )
}

export default ContactsList
