import { createContext, useState } from 'react'
import { themes } from '../styles/theme'

export interface IContact {
  name: string
  ethAddress: string
}

export const useContacts = () => {
  const [contactsList, setContactsList] = useState<IContact[]>([])

  const addContact = (contact: IContact) => {
    setContactsList((prev) => {
      const copy = [...prev]
      copy.push(contact)
      return copy
    })
  }

  const deleteContact = (contact: IContact) => {
    setContactsList((prev) => {
      const i = prev.findIndex(
        (c) => c.name === contact.name && c.ethAddress === contact.ethAddress
      )
      if (i === -1) return prev

      const copy = [...prev]
      copy.splice(i, 1)

      return copy
    })
  }

  const editContact = (i: number, contact: IContact) => {
    setContactsList((prev) => {
      const copy = [...prev]
      copy[i] = contact

      return copy
    })
  }

  return {
    contactsList,
    addContact,
    deleteContact,
    editContact,
  }
}

export const AppContext = createContext({
  theme: themes.light,
  setTheme: (type: string) => {},
  contactsModule: {
    contactsList: [] as IContact[],
    addContact: (contact: IContact) => {},
    deleteContact: (contact: IContact) => {},
    editContact: (index: number, newContact: IContact) => {},
  },
})
