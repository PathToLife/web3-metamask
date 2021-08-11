import { useEffect, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import Web3 from 'web3'

export const useWeb3SendEth = (
  from: string | undefined | null,
  to: string | undefined | null,
  amount: number
) => {
  const { library: web3 } = useWeb3React<Web3>()

  const [gasPrice, setCacheGasPrice] = useState(-1)
  const [transactionFeeEst, setTransactionFeeEst] = useState(0)

  useEffect(() => {
    if (!web3) return
    let isLoaded = true
    web3.eth.getGasPrice().then((price) => {
      if (!isLoaded) return
      setCacheGasPrice(Number(price))
      console.log(price)
    })
    return () => {
      isLoaded = false
    }
  }, [web3])

  useEffect(() => {
    if (!web3 || !from || !to || gasPrice === -1) return

    let isLoaded = true
    console.log(from)
    web3.eth
      .estimateGas({
        from,
        to,
        gasPrice,
      })
      .then((gasLimit) => {
        if (!isLoaded) return
        setTransactionFeeEst(
          Number(web3.utils.fromWei((gasLimit * gasPrice).toString()))
        )
      })
    return () => {
      isLoaded = false
    }
  }, [from, to, web3, amount, gasPrice])

  const send = () => {
    console.log('send')
    if (!web3 || !from || !to || gasPrice === -1) return
    console.log('send2')
    web3.eth.sendTransaction({
      from,
      to,
      gasPrice,
      value: web3.utils.toWei(amount.toString()),
    })
  }

  return {
    send,
    transactionFeeEstimate: transactionFeeEst,
  }
}
