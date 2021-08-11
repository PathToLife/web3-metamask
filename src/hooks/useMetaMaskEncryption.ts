import { useWeb3React } from '@web3-react/core'
import Web3 from 'web3'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { encrypt as ethEncrypt } from 'eth-sig-util'
import { toast } from 'react-toastify'

interface Ethereum {
  request: (options: { method: string; params: any[] }) => any

  [key: string]: any
}

const _encrypt = (text: string, publicKey: string) => {
  return Buffer.from(
    JSON.stringify(
      ethEncrypt(publicKey, { data: text }, 'x25519-xsalsa20-poly1305')
    )
  ).toString('hex')
}

/**
 * Metamask API for public key encryption / decryption
 * https://docs.metamask.io/guide/rpc-api.html#other-rpc-methods
 */
export const useMetaMaskEncryption = () => {
  const { account, library } = useWeb3React<Web3>()

  const [encryptionPublicKey, setEncryptionPublicKey] = useState<null | string>(
    null
  )

  useEffect(() => {
    setEncryptionPublicKey('')
  }, [account])

  const ethereum = useMemo(() => {
    if (!library) return
    return library.givenProvider as Ethereum
  }, [library])

  const requestMetaMaskPublicKey = useCallback(async (): Promise<string> => {
    if (encryptionPublicKey) return encryptionPublicKey
    const sessionStoragePk = sessionStorage.getItem(`pk-${account}`)
    if (sessionStoragePk) return sessionStoragePk
    if (!ethereum) throw Error('ethereum library undefined')
    toast.success('please approve request to encrypt contacts', {
      toastId: 'encrypt-request',
    })
    return ethereum
      .request({
        method: 'eth_getEncryptionPublicKey',
        params: [account],
      })
      .then((key: string) => {
        setEncryptionPublicKey(key)
        sessionStorage.setItem(`pk-${account}`, key)
        toast.dismiss('encrypt-request')
        return key
      })
  }, [encryptionPublicKey, ethereum, account])

  const encrypt = useCallback(
    async (text: string) => {
      if (!encryptionPublicKey) {
        return requestMetaMaskPublicKey().then((publicKey) => {
          return _encrypt(text, publicKey)
        })
      }
      return _encrypt(text, encryptionPublicKey)
    },
    [requestMetaMaskPublicKey, encryptionPublicKey]
  )

  const decrypt = useCallback(
    (text: string): Promise<string> => {
      if (!ethereum) throw Error('ethereum library undefined')
      toast.success('please approve request to decrypt contacts', {
        toastId: 'decrypt-request',
        autoClose: false,
      })
      return ethereum
        .request({
          method: 'eth_decrypt',
          params: [text, account],
        })
        .then((res: string) => {
          toast.dismiss('decrypt-request')
          return res
        })
    },
    [account, ethereum]
  )

  return {
    encrypt,
    decrypt,
    encryptionPublicKey,
    requestMetaMaskPublicKey,
  }
}
