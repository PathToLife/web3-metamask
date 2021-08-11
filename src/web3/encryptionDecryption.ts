import { useWeb3React } from '@web3-react/core'
import Web3 from 'web3'
import { useState } from 'react'
import { encrypt as ethEncrypt } from 'eth-sig-util'

interface Ethereum {
  request: (options: { method: string; params: any[] }) => any

  [key: string]: any
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

  const getEthereumMetaMask = () => {
    if (!library) throw Error('library undefined')
    return library.givenProvider as Ethereum
  }

  const requestMetaMaskPublicKey = () => {
    const ethereum = getEthereumMetaMask()
    return ethereum
      .request({
        method: 'eth_getEncryptionPublicKey',
        params: [account],
      })
      .then((key: string) => {
        setEncryptionPublicKey(key)
        return key
      })
  }
  const encrypt = (text: string) => {
    if (!encryptionPublicKey) throw Error('tried to encrypt without public key')
    return Buffer.from(
      JSON.stringify(
        ethEncrypt(
          encryptionPublicKey,
          { data: text },
          'x25519-xsalsa20-poly1305'
        )
      )
    ).toString('hex')
  }

  const decrypt = (text: string) => {
    const ethereum = getEthereumMetaMask()
    return ethereum
      .request({
        method: 'eth_decrypt',
        params: [text, account],
      })
      .then((res: string) => res)
  }

  return {
    encrypt,
    decrypt,
    encryptionPublicKey,
    requestMetaMaskPublicKey,
  }
}
