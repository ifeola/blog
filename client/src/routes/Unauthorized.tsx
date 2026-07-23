const Unauthorized = () => (
	<div className="min-h-screen flex items-center justify-center">
		<div className="text-center">
			<h1 className="text-2xl font-bold text-slate-900 mb-2">Unauthorized</h1>
			<p className="text-slate-500 mb-4">
				You don't have permission to access this page.
			</p>
			<a href="/login" className="text-brand-500 hover:underline">
				Go to Login
			</a>
		</div>
	</div>
);

export default Unauthorized;
