import { Button } from '@/components/button'

const Plan = () => {
  return (
    <div className="flex flex-col items-center gap-3.5 bg-neutrals-11 rounded-lg px-3 py-5 text-center">
      <h4 className="text-lg font-medium">Optimize Your Experience</h4>
      <p className="text-neutrals-6">
        Improve your experience by improving your plan
      </p>
      <Button title="Upgrade" />
    </div>
  )
}

export { Plan }
