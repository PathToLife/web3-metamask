import React, { useContext, useMemo } from 'react'
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
import { AppContext, IContact } from '../context/AppContext'

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

interface ListItemContactProps {
  index: number
  contact: IContact
}

const ListItemContact: React.FC<ListItemContactProps> = ({
  index,
  contact,
}) => {
  const classes = useStyles()

  const initials = useMemo(() => {
    const words = contact.name.split(' ')
    const cleanedWords = words.filter((w) => w.trim().length)

    if (cleanedWords.length === 0) {
      return '?'
    }

    if (cleanedWords.length === 1) {
      return cleanedWords[0].slice(0, 2).toUpperCase()
    }

    const [firstName, lastName] = cleanedWords

    return (
      firstName.slice(0, 1).toUpperCase() + lastName.slice(0, 1).toUpperCase()
    )
  }, [contact.name])

  return (
    <ListItem button className={classes.listItem}>
      <ListItemAvatar>
        <Avatar className={classes.avatar}>{initials}</Avatar>
      </ListItemAvatar>
      <ListItemText>
        <Typography variant={'subtitle1'}>{contact.name}</Typography>
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
  const { contactsModule } = useContext(AppContext)
  return (
    <List className={classes.list}>
      <ListItemAddContact />
      {contactsModule.contactsList.map((contact, i) => {
        return (
          <ListItemContact key={`contact-${i}`} index={i} contact={contact} />
        )
      })}
    </List>
  )
}

export default ContactsList
