import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

const useCreatePersonelStore = create(
  devtools((set) => ({
    topic: "",
    amount: "",
    account: "",
    setTopic: (topic) => set({ topic }),
    setAmount: (amount) => set({ amount }),
    setAccount: (account) => set({ account }),
    infoReset: () => set({ subject: null, amount: null, account: null }),
  }))
);

export default useCreatePersonelStore;