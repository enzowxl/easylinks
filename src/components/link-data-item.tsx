const PercentageItem = () => {
  return (
    <div className="flex relative justify-between bg-dark rounded-lg w-full p-2.5">
      <h5 className="z-50">Opa</h5>
      <h5 className="z-50">2%</h5>
      <div
        style={{
          width: `2%`,
        }}
        className="absolute left-0 top-0 bottom-0 items-center bg-purplePrimary rounded-lg"
      />
    </div>
  )
}

const LinkDataItem = () => {
  return (
    <div className="gap-5 flex flex-col bg-neutrals-12 w-full rounded-lg p-5">
      <h2 className="font-bold text-lg">Link title</h2>
      <div className="flex flex-col gap-2.5">
        <PercentageItem />
      </div>
    </div>
  )
}

export { LinkDataItem }
