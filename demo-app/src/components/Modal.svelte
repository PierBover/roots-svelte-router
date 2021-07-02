<script>
	import {navigate} from 'pluma-svelte-router';

	function closeModal () {
		navigate('/about');
	}
</script>
<div class="modal show" id="exampleModalLive" tabindex="-1" aria-labelledby="exampleModalLiveLabel" style="" aria-modal="true" role="dialog">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title" id="exampleModalLiveLabel">A Modal</h5>
				<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" on:click={closeModal}></button>
			</div>
			<div class="modal-body">
				<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas porttitor diam cursus ligula tristique bibendum. Aliquam at erat quis tellus adipiscing tempus. Cras sed rutrum velit. Curabitur vel lacus eget erat tincidunt fringilla nec in ante. Pellentesque lacinia tellus nec neque tempus fermentum. Pellentesque ligula arcu, auctor at sagittis id, imperdiet eget tortor. Pellentesque imperdiet tempus risus non condimentum. Phasellus ut venenatis turpis. Fusce tincidunt nulla sit amet elit lacinia id consequat eros lacinia. Phasellus ut justo velit. Aenean dignissim, nunc vitae molestie blandit, mi diam vehicula ligula, nec vehicula velit sem eu urna. Suspendisse potenti.</p>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-primary" on:click={closeModal}>Close</button>
			</div>
		</div>
	</div>
</div>

<style>
	.modal {
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: rgba(0,0,0, .75);
	}
</style>