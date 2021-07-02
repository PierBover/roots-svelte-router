<script>
	import {navigate} from 'pluma-svelte-router';
	import {isAuthenticated, isWorking} from '../store.js';

	function authenticate () {
		$isAuthenticated = true;
		$isWorking = true;

		// Simulate authenticating
		setTimeout(() => {
			$isWorking = false
			navigate('/private');
		}, 1000);
	}
</script>

<div id="Login">
	<main class="form-signin">
		<form on:submit={authenticate}>
			<h1 class="h3 mb-3 fw-normal">Please sign in</h1>

			<div class="form-floating">
				<input type="email" class="form-control" id="floatingInput" placeholder="name@example.com">
				<label for="floatingInput">Email address</label>
			</div>
			<div class="form-floating">
				<input type="password" class="form-control" id="floatingPassword" placeholder="Password">
				<label for="floatingPassword">Password</label>
			</div>

			<div class="checkbox mb-3 mt-4">
				<label>
					<input type="checkbox" value="remember-me"> Remember me
				</label>
			</div>
			<button class="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
		</form>
	</main>
</div>


<style>
	#Login {
		display: flex;
		align-items: center;
		justify-content: center;
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		background-color: #f5f5f5;
	}

	.form-signin {
		width: 20rem;
	}

	.form-signin input[type="email"] {
		margin-bottom: -1px;
		border-bottom-right-radius: 0;
		border-bottom-left-radius: 0;
	}

	.form-signin input[type="password"] {
		margin-bottom: 10px;
		border-top-left-radius: 0;
		border-top-right-radius: 0;
	}

	.form-signin .form-floating:focus-within {
		z-index: 2;
	}
</style>