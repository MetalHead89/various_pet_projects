import { SIDEBAR_STATE } from '@/config/constants'

export type TSidebarState = typeof SIDEBAR_STATE[keyof typeof SIDEBAR_STATE]

export const useSidebarStore = defineStore('sidebar', () => {
  const screen = useScreen()
  const state = ref<TSidebarState>(SIDEBAR_STATE.closed)

  const isMinimized = computed(() => {
    return state.value === SIDEBAR_STATE.minimized
  })

  const isOpened = computed(() => {
    return state.value === SIDEBAR_STATE.opened
  })

  const setState = (value: TSidebarState) => {
    state.value = value
  }

  const toggleState = () => {
    const closedState = screen.isMobileScreen.value ? SIDEBAR_STATE.closed : SIDEBAR_STATE.minimized

    setState(
      state.value === SIDEBAR_STATE.opened ? closedState : SIDEBAR_STATE.opened
    )
  }

  return { state, isMinimized, isOpened, setState, toggleState }
})
