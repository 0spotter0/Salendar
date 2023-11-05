import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-white text-black">
      <div className="w-screen h-screen flex flex-col items-center text-black bg-white pt-24 gap-4">
            <p className="w-[70ch]">Salendar makes setting up your class calendars a breeze. Simply upload
                your syllabus, and we'll send you a link to a Google Calendar that you can add to your existing Google Calendar!
            </p>
            <p className="font-bold">Submitted to <a className="text-blue-500" href="https://dandyhacks-2023.devpost.com/">DandyHacks 2023</a></p>
            <Link className="px-8 py-2 bg-blue-500 text-white rounded-lg font-bold mt-20" href='/upload'>Try it!</Link>
        </div>
    </main>
  )
}
