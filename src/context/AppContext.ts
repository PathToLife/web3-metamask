import { createContext } from 'react'
import { themes } from '../styles/theme'

export interface IContact {
  name: string
  ethAddress: string
}

const AppContext = createContext({
  theme: themes.light,
  setTheme: (type: string) => {},
  contactsModule: {
    contactsList: [] as IContact[],
    addContact: (contact: IContact) => {},
    deleteContact: (contact: IContact) => {},
    editContact: (index: number, newContact: IContact) => {},
  },
})

export default AppContext
