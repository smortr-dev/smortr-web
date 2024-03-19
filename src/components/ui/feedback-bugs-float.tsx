import Bugs from "./bugs"
import Feedback from "./feedback"

export default function FeedbackBugFloat() {
  return (
    <div className="fixed top-[60%] right-4 flex flex-col z-[180]">
      <div className="flex justify-center items-center p-0.5 hover:border-red-600 border rounded-full transition-colors">
        <Bugs />
      </div>
      <div className="flex justify-center items-center mt-2 p-0.5 hover:border-blue-700 border rounded-full transition-colors">
        <Feedback />
      </div>
    </div>
  )
}
