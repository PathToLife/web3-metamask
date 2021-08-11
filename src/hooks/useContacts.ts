import { useParams } from 'react-router'
import { useContext, useEffect, useMemo, useState } from 'react'
import AppContext, { IContact } from '../context/AppContext'
import { useWeb3React } from '@web3-react/core'
import { useMetaMaskEncryption } from './useMetaMaskEncryption'

export const useRouterContactLoader = () => {
  const { id } = useParams<any>()
  const { contactsModule } = useContext(AppContext)

  const [contact, index] = useMemo(() => {
    const index = Number(id)
    if (isNaN(index)) {
      return [undefined, undefined]
    }
    return [contactsModule.contactsList[index], index]
  }, [contactsModule.contactsList, id])

  return {
    contact,
    index,
  }
}

export const useContacts = () => {
  const [contactsList, setContactsList] = useState<IContact[]>([])

  const { account } = useWeb3React()
  const { decrypt, encrypt } = useMetaMaskEncryption()

  useEffect(() => {
    if (!account) return
    setContactsList([])
    const encryptedStr = localStorage.getItem(account)
    if (!encryptedStr) return

    let isLoaded = true

    decrypt(encryptedStr).then((jsonStr: string) => {
      if (!isLoaded) return
      setContactsList(JSON.parse(jsonStr))
    })

    return () => {
      isLoaded = false
    }
  }, [account, decrypt])

  const saveContacts = (list: IContact[]) => {
    if (!account) return
    if (list.length === 0) {
      localStorage.removeItem(account)
      return
    }
    encrypt(JSON.stringify(list)).then((encryptedTxt) => {
      localStorage.setItem(account, encryptedTxt)
    })
  }

  const addContact = (contact: IContact) => {
    setContactsList((prev) => {
      const copy = [...prev]
      copy.push(contact)
      saveContacts(copy)
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
      saveContacts(copy)
      return copy
    })
  }

  const editContact = (i: number, contact: IContact) => {
    if (i < 0 || i >= contactsList.length)
      throw Error('contact index out of range')
    setContactsList((prev) => {
      const copy = [...prev]
      copy[i] = contact
      saveContacts(copy)
      return copy
    })
  }

  return {
    contactsList,
    saveContacts,
    addContact,
    deleteContact,
    editContact,
  }
}
