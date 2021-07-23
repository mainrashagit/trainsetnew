export default class ResponsiveHeader {
  navigation: HTMLElement
  burgerIcon: HTMLElement
  htmlBody: HTMLElement
  constructor(private navClassName: string, private burgerClassName: string, private navActiveClassName: string, private burgerActiveClassName: string) {
    this.navigation = document.querySelector("." + navClassName) as HTMLElement
    this.burgerIcon = document.querySelector("." + burgerClassName) as HTMLElement

    this.htmlBody = document.querySelector("body") as HTMLElement

    this.mount()
  }

  openState() {
    this.navigation.classList.add(this.navActiveClassName)
    this.burgerIcon.classList.add(this.burgerActiveClassName)
    this.htmlBody.classList.add("body-overlay")
  }

  closeState() {
    this.navigation.classList.remove(this.navActiveClassName)
    this.burgerIcon.classList.remove(this.burgerActiveClassName)
    this.htmlBody.classList.remove("body-overlay")
  }

  mount() {
    this.burgerIcon.addEventListener("click", this.brgClick)
    document.addEventListener("click", this.wndwClick)
  }

  unmount() {
    this.burgerIcon.removeEventListener("click", this.brgClick)
    document.removeEventListener("click", this.wndwClick)
  }

  brgClick = (event: MouseEvent) => {
    // @ts-ignore
    if (!event.currentTarget.classList.contains(this.burgerActiveClassName)) {
      this.openState()
    } else {
      this.closeState()
    }
  }

  wndwClick = (event: MouseEvent) => {
    // @ts-ignore
    if (event.target.classList.contains("body-overlay")) {
      this.closeState()
    }
  }
}
