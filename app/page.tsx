import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'], weight: '400' })

export default function Home() {
    return (
        <main className={`flex min-h-screen flex-col items-center justify-center p-6 ${inter.className}`}>
            <section className="text-center">
                <h1 className="text-6xl font-bold mb-4">Welcome to Our Store!</h1>
                <p className="text-xl mb-8">
                    Discover the latest trends and exclusive deals. Shop now and experience the best in e-commerce.
                </p>
                <button className="bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-700 transition-colors duration-300">
                    Shop Now
                </button>
            </section>
        </main>
    )
}
