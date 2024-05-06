import { NextResponse, NextRequest } from "next/server";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export async function POST(req: NextRequest) {
	const body = await req.json();
	try {
		const res = await stripe.paymentIntents.create({
			customer: "cus_NOumxVF9M1Wi1b",
			amount: body.amount,
			currency: body.currency,
			automatic_payment_methods: { enabled: true },
			//payment_method_types: ["card", "payto", "link", "alipay", "wechat_pay"],
			metadata: body.metadata,
		});
		return NextResponse.json(res);
	} catch (error: any) {
		console.log(error.message);
		throw error;
	}
}
