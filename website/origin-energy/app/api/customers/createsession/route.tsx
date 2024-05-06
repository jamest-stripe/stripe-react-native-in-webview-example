import { NextRequest, NextResponse } from "next/server";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export async function POST(req: NextRequest) {
	const body = await req.json();
	const customer = body.customer;
	if (customer) {
		try {
			// const response = await fetch(
			// 	"https://api.stripe.com/v1/customer_sessions",
			// 	{
			// 		method: "POST",
			// 		body: new URLSearchParams({ customer }),
			// 		headers: {
			// 			"Content-Type": "application/x-www-form-urlencoded",
			// 			authorization: "Bearer " + process.env.STRIPE_SECRET_KEY,
			// 		},
			// 	}
			// );
			// const session = await response.json();
			const session = await stripe.customerSessions.create({
				customer,
			});
			return NextResponse.json(session);
		} catch (error: any) {
			console.log(error.message);
			return NextResponse.json(error);
		}
	} else {
		return NextResponse.json(
			{ error: "No customer ID provided" },
			{ status: 500 }
		);
	}
}
