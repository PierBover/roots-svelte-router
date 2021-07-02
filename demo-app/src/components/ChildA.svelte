<script>
	import {link} from 'pluma-svelte-router';
</script>

<h3>Child A</h3>

<p>Lorem ipsum dolor sit am Aliquam at erat quis tellus adipiscing tempus. Cras sed rutrum velit. Curabitur vel lacus eget erat tincidunt fringilla nec in ante. Pellentesque lacinia tellus nec neque tempus fermentum. Pellentesque ligula arcu, auctor at sagittis id, imperdiet eget tortor. Pellentesque imperdiet tempus risus non condimentum. Phasellus ut venenatis turpis. Fusce tincidunt nulla sit amet elit lacinia id consequat eros lacinia. Phasellus ut justo velit. Aenean dignissim, nunc v mi diam vehicula ligula, nec vehicula velit sem eu urna. Suspendisse potenti.</p>

<div class="mt-4 mb-4">
	<a class="btn btn-primary" role="button" href="/nested/child-b" use:link={{scrollToId:"tab-menu"}}>Go to child B <small>(and focus on tab menu)</small></a>
</div>

<p class="mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas porttitor diam cursus ligula tristique bibendum. Aliquam at erat quis tellus adipiscing tempus. Cras sed rutrum velit. Curabitur vel lacus eget erat tincidunt fringilla nec in ante. Pellentesque lacinia tellus nec neque tempus fermentum. Pellentesque ligula arcu, auctor at sagittis id, imperdiet eget tortor. Pellentesque imperdiet tempus risus non condimentum. Phasellus ut venenatis turpis. Fusce tincidunt nulla sit amet elit lacinia id consequat eros lacinia. Phasellus ut justo velit. Aenean dignissim, nunc vitae molestie blandit, mi diam vehicula ligula, nec vehicula velit sem eu urna. Suspendisse potenti.</p>

<slot></slot>