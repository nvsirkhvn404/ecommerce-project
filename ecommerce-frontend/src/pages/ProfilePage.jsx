import useUser from "@/hooks/useUser";

export default function ProfilePage() {
	const { data } = useUser();

	return (
		<div className="p-10">
			<h1 className="text-3xl font-bold mb-5">My Profile</h1>

			<div className="space-y-2">
				<p>
					<strong>Name:</strong> {data?.name}
				</p>

				<p>
					<strong>Email:</strong> {data?.email}
				</p>
			</div>
		</div>
	);
}
