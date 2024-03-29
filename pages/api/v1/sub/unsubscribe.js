import { db__admin } from "../../../../lib/firebaseAdmin.config";
import apiErrorHandler from "../../../../utils/apiErrorHandler";
import isAuth from "../_isAuth";
import hasActivePlan from "./../_hasActivePlan";

const handler = async (req, res) => {
	if (req.method !== "PATCH")
		return apiErrorHandler(res, 405, "Method not allowed");

	try {
		const { subscription_ID } = req.subscriptionInfos;
		const { uid } = req.currentUser;

		// update current subscription and subscriptions historique
		const currentSubscriptionRef = db__admin
			.collection("users")
			.doc(uid)
			.collection("current_subscription")
			.doc(subscription_ID);

		const historiqueSubRef = db__admin
			.collection("subscriptions")
			.doc(subscription_ID);

		const data = {
			"status.text": "canceled",
			"status.code": 2,
		};

		await currentSubscriptionRef.update(data);

		await historiqueSubRef.update(data);

		return res.status(200).json({
			success: true,
			message: "Unsubscribed",
		});
	} catch (error) {
		return apiErrorHandler(res, 500, error);
	}
};

export default isAuth(hasActivePlan(handler));
