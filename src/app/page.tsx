import { Hero } from "@/components/Hero";
import { Pricing } from "@/components/Pricing";
import prisma from "@/db/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export default async function Home() {

	return (
		<main>
			<Hero />
			<Pricing />
		</main>
	);
}
