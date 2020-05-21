import "./src/styles/global.scss"
import randomColor from "./src/components/randomColor"

if (typeof window !== 'undefined') {
  randomColor();
}

export const onServiceWorkerUpdateReady = () => {
  const answer = window.confirm(
    `This application has been updated. ` +
      `Reload to display the latest version?`
  )

  if (answer === true) {
    window.location.reload()
  }
}
