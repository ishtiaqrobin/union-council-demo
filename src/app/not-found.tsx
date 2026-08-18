import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div>
      <h1>Not Found</h1>
      <button>
        <Link href="/">Back to Home</Link>
      </button>
    </div>
  )
}