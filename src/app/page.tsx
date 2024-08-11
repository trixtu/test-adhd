
import { Pricing } from "@/components/Pricing";
import prisma from "@/db/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Hero } from "./(teste)/adhd/_components/Hero";

export default async function Home() {

	return (
		<main>
			<Hero />
			{/* <Pricing /> */}
		</main>
	);
}
