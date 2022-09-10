<script>
import { ethers } from 'ethers'

export default {
  data () {
    return {
      activeAccount: window.ethereum.selectedAddress
    }
  },
  async mounted() {
    window.ethereum.on('accountsChanged', (accounts) => {
      if (accounts.length > 0) {
        this.activeAccount = accounts[0]
        return
      } else {
        this.activeAccount = null
      }
    })
  },
  methods: {
    async requestAccount() {
      const request = await window.ethereum.request({
        method: 'eth_requestAccounts',
      })
      if (request) {
        this.activeAccount = request[0]
      }
    },
    async getSublicenseAvailableSupply() {
      if (typeof window.ethereum !== undefined) {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const shellToken = new ethers.Contract(
          this.$shellTokenAddress,
          this.$ShellToken.abi,
          provider
        )
        try {
          const availableSupply = await shellToken.balanceOf(
            this.activeAccount
          )
          console.log(availableSupply.toString())
        } catch (err) {
          console.log('Error: ', err)
        }
      }
    },
    async mintMoreShells() {
      if (typeof window.ethereum !== undefined) {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const shellToken = new ethers.Contract(
          this.$shellTokenAddress,
          this.$ShellToken.abi,
          provider.getSigner()
        )
        try {
          const tx = await shellToken.mintMoreShells(10)
          console.log('minting 10 more shells')
          tx.wait()
        } catch (err) {
          console.log('Error: ', err)
        }
      }
    } 
  }
}
</script>

<template>
  <div class="w-screen h-screen bg-slate-800 text-slate-200 flex flex-col items-center pt-24">
    <div class="text-4xl font-bold py-4" @click="getSublicenseAvailableSupply()">ShellCoin</div>
    <div
      class="w-40 py-1 bg-gray-200 rounded ring-4 tracking-wider font-bold text-gray-700 pl-2 flex items-center justify-center cursor-pointer"
      :class="{
        'ring-green-500 pr-1': activeAccount,
        'ring-orange-600 pr-2': !activeAccount,
      }"
      @click="requestAccount"
    >
      <div class="truncate text-center text-gray-800 tracking-wider">
        {{ !activeAccount ? 'Connect Wallet' : activeAccount }}
      </div>
    </div>
    <div class="bg-slate-200 text-slate-800 p-2 my-2 cursor-pointer" @click="mintMoreShells()">Mint 10 Shells</div>

  </div>
</template>

