export function WelcomeHeader() {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-1">
        <h1 className="text-3xl font-bold">Hi, Professor!</h1>
        <span className="text-2xl">👋</span>
      </div>
      <div className="flex items-baseline gap-2">
        <p className="text-2xl font-semibold">What do you want to</p>
        <p className="text-2xl font-semibold text-yellow-500">create</p>
        <p className="text-2xl font-semibold">today?</p>
      </div>
      <p className="text-gray-500 mt-2">
        Invest in your students and take the first step towards enhancing their learning experience
      </p>
    </div>
  )
}

