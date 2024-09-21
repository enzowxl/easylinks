interface ToolTipType {
  title: string
}

const ToolTip = ({ title }: ToolTipType) => {
  return (
    <div className="bg-gradient-to-r from-neutrals-12 to-neutrals-13 border border-neutrals-11 rounded-sm px-2.5">
      <p className="text-sm">{title}</p>
    </div>
  )
}

export { ToolTip }
