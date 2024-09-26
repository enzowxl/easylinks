import { NavLandingPage } from './_components/nav-landing-page'
import { BackgroundBeams } from '@/components/ui/background-beams'
import { ContainerScroll } from '@/components/ui/container-scroll-animation'

const LandingPage = () => {
  return (
    <main className="flex items-center justify-center flex-col">
      <NavLandingPage />

      <section className="h-screen w-full bg-gradient-to-b from-dark to-neutrals-12 rounded-md !overflow-visible relative flex flex-col items-center  antialiased">
        <div className="z-[1] flex flex-col mt-[-100px] md:mt-[-50px]">
          <ContainerScroll
            titleComponent={
              <h1 className="pb-2 text-5xl md:text-8xl bg-clip-text text-transparent bg-gradient-to-b from-white to-purplePrimary font-bold">
                Shorten your links with easylinks
              </h1>
            }
          >
            Waiting...
          </ContainerScroll>
        </div>
        <BackgroundBeams />
      </section>
    </main>
  )
}

export default LandingPage
