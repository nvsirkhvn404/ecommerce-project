export default function ProfilePage() {
	const auth = JSON.parse(localStorage.getItem("user"));

	return (
		<div className="p-10">
			<h1 className="text-3xl font-bold mb-5">My Profile</h1>

			<div className="space-y-2">
				<p>
					<strong>Name:</strong> {auth.user.name}
				</p>

				<p>
					<strong>Email:</strong> {auth.user.email}
				</p>
			</div>
		</div>
	);
}
